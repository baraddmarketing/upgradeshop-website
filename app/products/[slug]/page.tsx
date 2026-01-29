import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductsFromDB } from "@/lib/db-products";
import { mergeWithStaticProducts } from "@/lib/fetch-products";
import { allProducts, modules, websiteAddons, websiteService, landingPageProduct } from "@/lib/products";
import { getAllProductSlugs, getProductContent } from "@/lib/product-content";
import ProductPageClient from "./product-page-client";

export const revalidate = 60;

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getProductContent(slug);
  const product = allProducts.find((p) => p.slug === slug);

  if (!content) {
    return { title: "Product Not Found | The Upgrade Shop" };
  }

  const name = slug === "website" ? websiteService.name : (product?.name || slug);
  const description = slug === "website" ? websiteService.description : (product?.description || content.overviewParagraphs[0]);

  return {
    title: `${name} | The Upgrade Shop`,
    description,
    openGraph: {
      title: `${name} | The Upgrade Shop`,
      description,
      url: `https://upgradeshop.ai/products/${slug}`,
      siteName: "The Upgrade Shop",
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getProductContent(slug);

  if (!content) {
    notFound();
  }

  // Fetch DB prices and merge
  const dbProducts = await fetchProductsFromDB();

  const mergedModules = mergeWithStaticProducts(
    dbProducts.filter((p) => p.category === "module"),
    modules
  );
  const mergedAddons = mergeWithStaticProducts(
    dbProducts.filter((p) => p.category === "addon"),
    websiteAddons
  );
  const allMerged = [...mergedModules, ...mergedAddons];

  // Find this product (merged with DB prices)
  const product = allMerged.find((p) => p.slug === slug) ||
    allProducts.find((p) => p.slug === slug);

  if (!product && slug !== "website") {
    notFound();
  }

  // Get related products
  const relatedProducts = content.relatedSlugs
    .map((rs) => {
      if (rs === "website") return null; // Website is a service, not a product card
      return allMerged.find((p) => p.slug === rs) || allProducts.find((p) => p.slug === rs);
    })
    .filter(Boolean) as typeof allProducts;

  return (
    <ProductPageClient
      product={product || null}
      content={content}
      relatedProducts={relatedProducts}
      isWebsiteService={slug === "website"}
      serviceName={slug === "website" ? websiteService.name : undefined}
      websiteTiers={slug === "website" ? websiteService.tiers : undefined}
      websiteFeatures={slug === "website" ? websiteService.features : undefined}
    />
  );
}
