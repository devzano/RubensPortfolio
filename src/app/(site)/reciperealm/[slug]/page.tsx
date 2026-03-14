import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecipeShareLanding from "@/components/Projects/RecipeRealm/RecipeShareLanding";
import {
  buildRecipeShareURL,
  resolveRecipeShare,
} from "@/components/Projects/RecipeRealm/shareData";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const recipe = resolveRecipeShare(slug, resolvedSearchParams);

  if (!recipe) {
    return {
      title: "Recipe Not Found",
      description: "This RecipeRealm share link could not be found.",
    };
  }

  const url = buildRecipeShareURL(recipe);
  const description =
    recipe.summary ||
    "Shared from RecipeRealm. Open in the app to review, edit, and save this recipe.";
  const metadataImage =
    recipe.image && !recipe.image.startsWith("data:") ? recipe.image : undefined;

  return {
    title: `${recipe.title} | RecipeRealm`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${recipe.title} | RecipeRealm`,
      description,
      url,
      siteName: "RecipeRealm",
      type: "article",
      images: metadataImage
        ? [{ url: metadataImage, width: 1400, height: 900, alt: recipe.title }]
        : undefined,
    },
    twitter: {
      card: metadataImage ? "summary_large_image" : "summary",
      title: `${recipe.title} | RecipeRealm`,
      description,
      images: metadataImage ? [metadataImage] : undefined,
    },
  };
}

export default async function RecipeSharePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const recipe = resolveRecipeShare(slug, resolvedSearchParams);

  if (!recipe) {
    notFound();
  }

  return <RecipeShareLanding recipe={recipe} />;
}
