# Google Drive Access Guide

Quick reference for downloading customer assets from Google Drive using OAuth tokens stored in the database.

---

## Prerequisites

1. **SSH Tunnel must be running** (see [ssh-tunnel-setup.md](ssh-tunnel-setup.md))
2. **Customer must have granted OAuth access** (checked via database)
3. Node.js project with dependencies installed (`googleapis` package)

---

## Import the Loader

```typescript
import { downloadAllCustomerAssets } from './lib/db/google-drive-loader.js'
// Or: import { downloadAllCustomerAssets } from './lib/db'
```

---

## Download All Customer Assets

```typescript
// First, load customer data to get asset list
import { loadExtendedClientData } from './lib/db/database-loader.js'
// Or: import { loadExtendedClientData } from './lib/db'

const result = await loadExtendedClientData(customerId)
const assets = result.data.customer_assets

// Check if customer has granted Google Drive access
if (!assets.hasOAuthAccess) {
  console.error('Customer has not granted Google Drive access')
  return
}

// Download all assets
const downloadResult = await downloadAllCustomerAssets(
  customerId,
  assets,
  projectRoot  // e.g., process.cwd()
)

if (downloadResult.success) {
  console.log(`Downloaded ${downloadResult.downloadedFiles.length} files`)
  console.log(`Assets saved to: ${downloadResult.assetsPath}`)
} else {
  console.error('Download errors:', downloadResult.errors)
}
```

---

## File Organization

Files are downloaded to:
```
public/
├── logos/
│   └── [logo files]
├── images/
│   └── [content images + business photos]
└── documents/
    └── [PDFs, Google Docs exported as PDF]
```

---

## What Data is Returned

```typescript
interface DownloadResult {
  success: boolean
  customerId: string
  totalFiles: number
  downloadedFiles: DownloadedFile[]
  errors: string[]
  assetsPath: string  // Path to assets folder
}

interface DownloadedFile {
  id: string          // Google Drive file ID
  name: string        // Original filename
  mimeType: string    // MIME type
  category: 'logos' | 'images' | 'documents' | 'other'
  localPath: string   // Full local path
  size: number        // File size in bytes
  driveUrl: string    // Google Drive web URL
}
```

---

## Getting Web Paths for Use in Components

```typescript
import { getAssetPaths } from './lib/db/google-drive-loader.js'

const paths = getAssetPaths(downloadResult, projectRoot)

// Use in Next.js components:
// paths.logos: ['/logos/logo.png']
// paths.images: ['/images/photo1.jpg', ...]
// paths.documents: ['/documents/menu.pdf']
```

---

## Download Summary by Category

```typescript
import { getDownloadSummary } from './lib/db/google-drive-loader.js'

const summary = getDownloadSummary(downloadResult)

console.log(`Logos: ${summary.logos.length} files`)
console.log(`Images: ${summary.images.length} files`)
console.log(`Documents: ${summary.documents.length} files`)
```

---

## Asset Types from Database

Customer assets come from two sources in the database:

### 1. Checklist Files (`checklist_files`)
Files uploaded by customer during onboarding:
- **logo** - Business logos
- **content_images** - General content images
- **business_photos** - Business photos (team, location, products)

### 2. Customer Documents (`customer_documents`)
Shared documents (Google Docs, PDFs):
- Google Docs (exported as PDF)
- PDFs
- Other documents shared via WhatsApp

---

## Example: Building Website with Downloaded Assets

```typescript
// 1. Load customer data
const dataResult = await loadExtendedClientData(customerId)
const data = dataResult.data

// 2. Download assets
if (data.customer_assets.hasOAuthAccess) {
  const downloadResult = await downloadAllCustomerAssets(
    customerId,
    data.customer_assets,
    projectRoot
  )

  // 3. Get web paths
  const assetPaths = getAssetPaths(downloadResult, projectRoot)

  // 4. Use in components
  const logo = assetPaths.logos[0]  // First logo
  const images = assetPaths.images  // All images

  console.log('Logo:', logo)
  console.log('Images:', images)
}
```

---

## OAuth Token Management

OAuth tokens are stored in the database (`customer_oauth_tokens` table):
- **access_token** - Short-lived token (expires after ~1 hour)
- **refresh_token** - Long-lived token (used to get new access tokens)
- **expires_at** - When the access token expires
- **scopes** - Permissions granted (must include `drive.readonly`)

The loader automatically:
1. Checks if access token is expired
2. Refreshes the token if needed
3. Updates the database with the new token

**You don't need to manage tokens manually.**

---

## Google Docs Export

Google Docs/Sheets/Slides are automatically exported:
- **Google Docs** → PDF
- **Google Sheets** → XLSX
- **Google Presentations** → PDF

The exported filename will have the correct extension added.

---

## File Categorization

Files are automatically categorized based on:
1. **Filename** - Files with "logo" in the name go to `logos/`
2. **MIME type** - Images go to `images/`, PDFs to `documents/`
3. **Source** - From `logo` checklist item → `logos/`

---

## Error Handling

```typescript
const downloadResult = await downloadAllCustomerAssets(customerId, assets, projectRoot)

if (!downloadResult.success) {
  console.error('Download failed:')

  downloadResult.errors.forEach(error => {
    console.error(`  - ${error}`)
  })

  // Partial success: Some files downloaded
  if (downloadResult.downloadedFiles.length > 0) {
    console.log(`Partial success: ${downloadResult.downloadedFiles.length} files downloaded`)
  }
}
```

---

## Troubleshooting

### "No OAuth tokens found for customer"
- Customer hasn't granted Google Drive access via Max
- Check database: `SELECT * FROM customer_oauth_tokens WHERE customer_id = 'uuid'`

### "Customer has not granted Google Drive access"
- OAuth tokens exist but don't include `drive` scope
- Customer needs to re-authorize with Drive permissions

### "Failed to download file: [filename]"
- File might have been deleted from Google Drive
- Permissions might have changed
- Check `downloadResult.errors` for specific error

### "Token expired" errors
- Usually handled automatically by token refresh
- If persists, refresh token might be invalid
- Customer needs to re-authorize

---

## Advanced: Download Single File by ID

If you need to download a specific file:

```typescript
import { downloadFileById } from './lib/db/google-drive-loader.js'

const file = await downloadFileById(
  customerId,
  'google-drive-file-id',
  'filename.jpg',
  '/path/to/destination/folder'
)

if (file) {
  console.log(`Downloaded: ${file.localPath}`)
} else {
  console.error('Download failed')
}
```

---

## Checking OAuth Status Before Download

```typescript
// From database result
const hasAccess = data.customer_assets.hasOAuthAccess

if (!hasAccess) {
  console.warn('Customer needs to grant Google Drive access')
  console.warn('They can do this through Max by sharing files')
  return
}

// Check OAuth scopes
const oauthResult = await pool.query(
  `SELECT scopes FROM customer_oauth_tokens WHERE customer_id = $1`,
  [customerId]
)

if (oauthResult.rows.length > 0) {
  const scopes = oauthResult.rows[0].scopes
  const hasDriveAccess = scopes.some(s => s.includes('drive'))
  console.log('Has Drive access:', hasDriveAccess)
}
```

---

## See Also

- [database-access.md](database-access.md) - Load customer data
- [ssh-tunnel-setup.md](ssh-tunnel-setup.md) - SSH tunnel configuration
- `lib/db/google-drive-loader.ts` - Full implementation reference
