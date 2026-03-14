import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecipeShareLanding from "@/components/Projects/RecipeRealm/RecipeShareLanding";
import {
  buildRecipeShareURL,
  fetchRecipeShare,
} from "@/components/Projects/RecipeRealm/shareData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await fetchRecipeShare(slug);

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

export default async function RecipeSharePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await fetchRecipeShare(slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeShareLanding recipe={recipe} />;
}
