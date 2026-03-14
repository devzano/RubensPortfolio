export type RecipeShareRecord = {
  shareID?: string;
  slug: string;
  title: string;
  summary: string;
  notes?: string;
  image?: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  cuisine: string;
  ingredients: string[];
  steps: string[];
  badges: string[];
  sourceURL?: string;
};

const FIREBASE_PROJECT_ID = "reciperealm-800e8";
const FIREBASE_API_KEY = "AIzaSyBDU7x6DDX-k6ogBsw-Ru2qNlOfw1b-zoU";

export const recipeShares: Record<string, RecipeShareRecord> = {
  "creamy-tuscan-chicken-a1b2c3": {
    slug: "creamy-tuscan-chicken-a1b2c3",
    title: "Creamy Tuscan Chicken",
    summary:
      "A rich skillet dinner with garlic, parmesan, spinach, and sun-dried tomatoes built for quick weeknights and easy sharing.",
    notes:
      "A rich skillet dinner with garlic, parmesan, spinach, and sun-dried tomatoes built for quick weeknights and easy sharing.",
    image:
      "https://images.unsplash.com/photo-1604908176997-4314edc4be0f?auto=format&fit=crop&w=1400&q=80",
    prepTime: "15 min",
    cookTime: "30 min",
    servings: "4 servings",
    cuisine: "Italian-Inspired",
    ingredients: [
      "4 boneless chicken thighs",
      "1 tsp kosher salt",
      "1/2 tsp black pepper",
      "2 tbsp olive oil",
      "4 cloves garlic, minced",
      "1/2 cup chicken broth",
      "3/4 cup heavy cream",
      "1/2 cup grated parmesan",
      "1 cup spinach",
      "1/3 cup chopped sun-dried tomatoes",
    ],
    steps: [
      "Season the chicken with salt and pepper.",
      "Sear in olive oil until deeply golden on both sides, then set aside.",
      "Cook the garlic briefly, then add broth and scrape up the browned bits.",
      "Stir in cream and parmesan until the sauce is smooth.",
      "Add spinach and sun-dried tomatoes, then return the chicken to the pan.",
      "Simmer until the chicken is cooked through and the sauce thickens.",
    ],
    badges: ["High Protein", "Dinner", "Skillet"],
  },
};

function firestoreString(field?: { stringValue?: string }): string {
  return field?.stringValue ?? "";
}

function firestoreArray(field?: { arrayValue?: { values?: Array<{ stringValue?: string }> } }): string[] {
  return field?.arrayValue?.values?.map((value) => value.stringValue ?? "").filter(Boolean) ?? [];
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter((part) => !/^[a-z0-9]{6,}$/.test(part))
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function extractShareID(slug: string): string | null {
  const parts = slug.split("--");
  const shareID = parts.at(-1)?.trim();
  return shareID ? shareID : null;
}

export function getRecipeShare(slug: string): RecipeShareRecord | null {
  return recipeShares[slug] ?? null;
}

export async function fetchRecipeShare(slug: string): Promise<RecipeShareRecord | null> {
  const shareID = extractShareID(slug);
  if (!shareID) {
    return getRecipeShare(slug);
  }

  const endpoint = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/recipeShares/${shareID}?key=${FIREBASE_API_KEY}`;
  const response = await fetch(endpoint, {
    next: { revalidate: 0 },
    cache: "no-store",
  });

  if (!response.ok) {
    return getRecipeShare(slug);
  }

  const json = (await response.json()) as {
    fields?: {
      slug?: { stringValue?: string };
      title?: { stringValue?: string };
      summary?: { stringValue?: string };
      notes?: { stringValue?: string };
      imageURL?: { stringValue?: string };
      prepTime?: { stringValue?: string };
      cookTime?: { stringValue?: string };
      servings?: { stringValue?: string };
      cuisine?: { stringValue?: string };
      sourceURL?: { stringValue?: string };
      ingredients?: { arrayValue?: { values?: Array<{ stringValue?: string }> } };
      steps?: { arrayValue?: { values?: Array<{ stringValue?: string }> } };
      badges?: { arrayValue?: { values?: Array<{ stringValue?: string }> } };
    };
  };

  const fields = json.fields;
  if (!fields) {
    return getRecipeShare(slug);
  }

  const title = firestoreString(fields.title) || titleFromSlug(slug) || "Shared Recipe";
  const notes = firestoreString(fields.notes);
  const summary =
    firestoreString(fields.summary) ||
    (notes ? notes.slice(0, 220) : "Shared from RecipeRealm. Open in the app to review, edit, and save this recipe.");

  return {
    shareID,
    slug: firestoreString(fields.slug) || slug,
    title,
    summary,
    notes: notes || undefined,
    image: firestoreString(fields.imageURL) || undefined,
    prepTime: firestoreString(fields.prepTime),
    cookTime: firestoreString(fields.cookTime),
    servings: firestoreString(fields.servings),
    cuisine: firestoreString(fields.cuisine),
    ingredients: firestoreArray(fields.ingredients),
    steps: firestoreArray(fields.steps),
    badges: firestoreArray(fields.badges),
    sourceURL: firestoreString(fields.sourceURL) || undefined,
  };
}

export function buildRecipeShareURL(recipe: RecipeShareRecord): string {
  return `https://rubenmanzano.com/reciperealm/${recipe.slug}`;
}

export function buildRecipeDeepLink(recipe: RecipeShareRecord): string {
  if (recipe.shareID) {
    return `RecipeRealm://app/recipe?shareId=${encodeURIComponent(recipe.shareID)}`;
  }

  return `https://rubenmanzano.com/reciperealm/${recipe.slug}`;
}
