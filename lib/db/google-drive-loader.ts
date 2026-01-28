/**
 * Google Drive File Loader
 *
 * Downloads customer files from Google Drive to local project folder.
 * Uses OAuth tokens stored in database to authenticate.
 */

import { google, drive_v3 } from 'googleapis'
import pg from 'pg'
import * as fs from 'fs'
import * as path from 'path'
import { pipeline } from 'stream/promises'
import type { DriveFile, CustomerAssets, CustomerDocument } from './types'

const { Pool } = pg

// =============================================================================
// Configuration
// =============================================================================

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'upgradeshop',
  user: process.env.DB_USER || 'upgradeu_ops',
  password: process.env.DB_PASSWORD || '',
}

const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI || 'https://max.upgradeu.co.il/api/auth/google/callback',
}

// Google Docs export MIME types
const GOOGLE_DOC_EXPORTS: Record<string, { mimeType: string; extension: string }> = {
  'application/vnd.google-apps.document': { mimeType: 'application/pdf', extension: '.pdf' },
  'application/vnd.google-apps.spreadsheet': { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', extension: '.xlsx' },
  'application/vnd.google-apps.presentation': { mimeType: 'application/pdf', extension: '.pdf' },
}

// =============================================================================
// Types
// =============================================================================

export interface OAuthTokens {
  access_token: string
  refresh_token: string | null
  expires_at: Date | null
  scopes: string[]
}

export interface DownloadedFile {
  id: string
  name: string
  mimeType: string
  category: 'images' | 'logos' | 'documents' | 'other'
  localPath: string
  size: number
  driveUrl: string
}

export interface DownloadResult {
  success: boolean
  customerId: string
  totalFiles: number
  downloadedFiles: DownloadedFile[]
  errors: string[]
  assetsPath: string
}

// =============================================================================
// OAuth Token Management
// =============================================================================

export async function getCustomerOAuthTokens(customerId: string): Promise<OAuthTokens | null> {
  const pool = new Pool(DB_CONFIG)

  try {
    const result = await pool.query(
      `SELECT access_token, refresh_token, expires_at, scopes
       FROM customer_oauth_tokens
       WHERE customer_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [customerId]
    )

    if (result.rows.length === 0) {
      return null
    }

    const row = result.rows[0]
    return {
      access_token: row.access_token,
      refresh_token: row.refresh_token,
      expires_at: row.expires_at ? new Date(row.expires_at) : null,
      scopes: row.scopes || [],
    }
  } finally {
    await pool.end()
  }
}

async function updateTokensInDatabase(
  customerId: string,
  accessToken: string,
  expiresAt: Date
): Promise<void> {
  const pool = new Pool(DB_CONFIG)

  try {
    await pool.query(
      `UPDATE customer_oauth_tokens
       SET access_token = $1, expires_at = $2, updated_at = NOW(), last_used_at = NOW()
       WHERE customer_id = $3`,
      [accessToken, expiresAt.toISOString(), customerId]
    )
  } finally {
    await pool.end()
  }
}

async function createDriveClient(
  customerId: string,
  tokens: OAuthTokens
): Promise<drive_v3.Drive> {
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_OAUTH_CONFIG.clientId,
    GOOGLE_OAUTH_CONFIG.clientSecret,
    GOOGLE_OAUTH_CONFIG.redirectUri
  )

  oauth2Client.setCredentials({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  })

  // Refresh token if expired
  if (tokens.expires_at && new Date() >= tokens.expires_at && tokens.refresh_token) {
    console.log('Token expired, refreshing...')
    const { credentials } = await oauth2Client.refreshAccessToken()

    if (credentials.access_token && credentials.expiry_date) {
      const newExpiresAt = new Date(credentials.expiry_date)
      await updateTokensInDatabase(customerId, credentials.access_token, newExpiresAt)
      console.log('Token refreshed successfully')
    }
  }

  return google.drive({ version: 'v3', auth: oauth2Client })
}

// =============================================================================
// File Operations
// =============================================================================

function categorizeFile(mimeType: string, filename: string): 'images' | 'logos' | 'documents' | 'other' {
  const lowerName = filename.toLowerCase()

  if (lowerName.includes('logo')) {
    return 'logos'
  }

  const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml']
  if (imageTypes.includes(mimeType)) {
    return 'images'
  }

  const docTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (docTypes.includes(mimeType) || mimeType in GOOGLE_DOC_EXPORTS) {
    return 'documents'
  }

  return 'other'
}

function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

async function downloadFile(
  drive: drive_v3.Drive,
  file: drive_v3.Schema$File,
  destPath: string
): Promise<number> {
  const fileId = file.id!
  const mimeType = file.mimeType!

  // Handle Google Docs (need to export)
  if (mimeType in GOOGLE_DOC_EXPORTS) {
    const exportConfig = GOOGLE_DOC_EXPORTS[mimeType]
    const response = await drive.files.export(
      { fileId, mimeType: exportConfig.mimeType },
      { responseType: 'stream' }
    )

    const destStream = fs.createWriteStream(destPath)
    await pipeline(response.data as NodeJS.ReadableStream, destStream)

    const stats = fs.statSync(destPath)
    return stats.size
  }

  // Regular file download
  const response = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  )

  const destStream = fs.createWriteStream(destPath)
  await pipeline(response.data as NodeJS.ReadableStream, destStream)

  const stats = fs.statSync(destPath)
  return stats.size
}

// =============================================================================
// Main Download Functions
// =============================================================================

export async function downloadFileById(
  customerId: string,
  fileId: string,
  filename: string,
  destDir: string
): Promise<DownloadedFile | null> {
  try {
    const tokens = await getCustomerOAuthTokens(customerId)
    if (!tokens) {
      console.error(`No OAuth tokens for customer: ${customerId}`)
      return null
    }

    const drive = await createDriveClient(customerId, tokens)

    // Get file metadata
    const fileMeta = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size, webViewLink',
    })

    const mimeType = fileMeta.data.mimeType || 'application/octet-stream'
    const category = categorizeFile(mimeType, filename)

    // Handle Google Docs exports
    let destFilename = filename
    if (mimeType in GOOGLE_DOC_EXPORTS) {
      const ext = GOOGLE_DOC_EXPORTS[mimeType].extension
      if (!destFilename.endsWith(ext)) {
        destFilename = destFilename + ext
      }
    }

    // Sanitize filename
    destFilename = destFilename.replace(/[<>:"/\\|?*]/g, '_')
    const destPath = path.join(destDir, destFilename)

    ensureDir(destDir)

    console.log(`Downloading: ${filename} -> ${destFilename}`)
    const size = await downloadFile(drive, fileMeta.data, destPath)

    console.log(`  Downloaded (${Math.round(size / 1024)}KB)`)

    return {
      id: fileId,
      name: filename,
      mimeType,
      category,
      localPath: destPath,
      size,
      driveUrl: fileMeta.data.webViewLink || '',
    }
  } catch (error) {
    console.error(`Failed to download file ${fileId}: ${error}`)
    return null
  }
}

/**
 * Download all customer assets from CustomerAssets object
 */
export async function downloadAllCustomerAssets(
  customerId: string,
  assets: CustomerAssets,
  projectRoot: string = process.cwd()
): Promise<DownloadResult> {
  const result: DownloadResult = {
    success: false,
    customerId,
    totalFiles: 0,
    downloadedFiles: [],
    errors: [],
    assetsPath: '',
  }

  if (!assets.hasOAuthAccess) {
    result.errors.push('Customer has not granted Google Drive access')
    return result
  }

  // Create directory structure directly in public/
  const publicDir = path.join(projectRoot, 'public')
  result.assetsPath = publicDir

  const dirs = {
    logos: path.join(publicDir, 'logos'),
    images: path.join(publicDir, 'images'),
    documents: path.join(publicDir, 'documents'),
  }

  // Create all directories
  Object.values(dirs).forEach(dir => ensureDir(dir))

  // Count total files
  result.totalFiles = assets.logos.length +
    assets.images.length +
    assets.businessPhotos.length +
    assets.documents.length

  console.log(`\nDownloading ${result.totalFiles} customer assets...`)

  // Download logos
  if (assets.logos.length > 0) {
    console.log(`\nLogos (${assets.logos.length} files):`)
    for (const file of assets.logos) {
      const downloaded = await downloadFileById(customerId, file.id, file.title, dirs.logos)
      if (downloaded) {
        downloaded.category = 'logos'
        result.downloadedFiles.push(downloaded)
      } else {
        result.errors.push(`Failed to download logo: ${file.title}`)
      }
    }
  }

  // Download images
  if (assets.images.length > 0) {
    console.log(`\nImages (${assets.images.length} files):`)
    for (const file of assets.images) {
      const downloaded = await downloadFileById(customerId, file.id, file.title, dirs.images)
      if (downloaded) {
        downloaded.category = 'images'
        result.downloadedFiles.push(downloaded)
      } else {
        result.errors.push(`Failed to download image: ${file.title}`)
      }
    }
  }

  // Download business photos (to images folder)
  if (assets.businessPhotos.length > 0) {
    console.log(`\nBusiness Photos (${assets.businessPhotos.length} files):`)
    for (const file of assets.businessPhotos) {
      const downloaded = await downloadFileById(customerId, file.id, file.title, dirs.images)
      if (downloaded) {
        downloaded.category = 'images'
        result.downloadedFiles.push(downloaded)
      } else {
        result.errors.push(`Failed to download photo: ${file.title}`)
      }
    }
  }

  // Download documents
  if (assets.documents.length > 0) {
    console.log(`\nDocuments (${assets.documents.length} files):`)
    for (const doc of assets.documents) {
      if (!doc.google_file_id) {
        result.errors.push(`Document has no Google file ID: ${doc.title || doc.document_url}`)
        continue
      }

      const filename = doc.title || `document-${doc.id}`
      const downloaded = await downloadFileById(customerId, doc.google_file_id, filename, dirs.documents)
      if (downloaded) {
        downloaded.category = 'documents'
        result.downloadedFiles.push(downloaded)
      } else {
        result.errors.push(`Failed to download document: ${filename}`)
      }
    }
  }

  result.success = result.errors.length === 0
  console.log(`\nDownload complete: ${result.downloadedFiles.length}/${result.totalFiles} files`)

  if (result.errors.length > 0) {
    console.log(`${result.errors.length} errors:`)
    result.errors.forEach(e => console.log(`   - ${e}`))
  }

  return result
}

/**
 * Get all asset web paths for use in templates
 */
export function getAssetPaths(result: DownloadResult, projectRoot: string): {
  logos: string[]
  images: string[]
  documents: string[]
} {
  const getWebPath = (localPath: string): string => {
    const publicPath = path.join(projectRoot, 'public')
    if (localPath.startsWith(publicPath)) {
      return localPath.slice(publicPath.length).replace(/\\/g, '/')
    }
    return localPath.replace(/\\/g, '/')
  }

  return {
    logos: result.downloadedFiles.filter(f => f.category === 'logos').map(f => getWebPath(f.localPath)),
    images: result.downloadedFiles.filter(f => f.category === 'images').map(f => getWebPath(f.localPath)),
    documents: result.downloadedFiles.filter(f => f.category === 'documents').map(f => getWebPath(f.localPath)),
  }
}
