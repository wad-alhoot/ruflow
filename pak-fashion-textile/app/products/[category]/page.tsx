import type { Metadata } from "next";
import CategoryClient from "./CategoryClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const title = category
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${title} — Pak Fashion Textile`,
    description: `Browse our ${title.toLowerCase()} collection.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <CategoryClient categorySlug={category} />;
}
