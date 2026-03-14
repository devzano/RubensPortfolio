export type RecipeShareRecord = {
  slug: string;
  title: string;
  summary: string;
  notes?: string;
  image?: string;
  imageData?: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  cuisine: string;
  ingredients: string[];
  steps: string[];
  badges: string[];
  sourceURL?: string;
};

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

export function getRecipeShare(slug: string): RecipeShareRecord | null {
  return recipeShares[slug] ?? null;
}

type ShareSearchParams = Record<string, string | string[] | undefined>;

const badgeMap = [
  { key: "gf", label: "Gluten Free" },
  { key: "sf", label: "Sugar Free" },
  { key: "df", label: "Dairy Free" },
  { key: "gm", label: "GMO Free" },
  { key: "og", label: "Organic" },
  { key: "vg", label: "Vegetarian" },
  { key: "pf", label: "Peanut Free" },
  { key: "nf", label: "Nut Free" },
  { key: "ef", label: "Egg Free" },
  { key: "tf", label: "No Trans Fat" },
  { key: "cf", label: "Corn Free" },
  { key: "sy", label: "Soy Free" },
];

function readSearchParam(params: ShareSearchParams, key: string): string {
  const value = params[key];
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter((part) => !/^[a-z0-9]{6,}$/.test(part))
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function resolveRecipeShare(
  slug: string,
  searchParams: ShareSearchParams
): RecipeShareRecord | null {
  const title = readSearchParam(searchParams, "t");
  const prepTime = readSearchParam(searchParams, "pt");
  const cookTime = readSearchParam(searchParams, "ct");
  const servings = readSearchParam(searchParams, "sv");
  const cuisine = readSearchParam(searchParams, "cu");
  const ingredients = splitLines(readSearchParam(searchParams, "ing"));
  const steps = splitLines(readSearchParam(searchParams, "st"));
  const notes = readSearchParam(searchParams, "nt");
  const sourceURL = readSearchParam(searchParams, "src");
  const image = readSearchParam(searchParams, "img");
  const imageData = readSearchParam(searchParams, "imgd");

  if (
    !title &&
    !prepTime &&
    !cookTime &&
    !servings &&
    !cuisine &&
    !notes &&
    !sourceURL &&
    !image &&
    !imageData &&
    ingredients.length === 0 &&
    steps.length === 0
  ) {
    return getRecipeShare(slug);
  }

  const badges = badgeMap
    .filter((item) => readSearchParam(searchParams, item.key) === "1")
    .map((item) => item.label);

  const summary = notes
    ? notes.slice(0, 220)
    : "Shared from RecipeRealm. Open in the app to review, edit, and save this recipe.";

  return {
    slug,
    title: title || titleFromSlug(slug) || "Shared Recipe",
    summary,
    notes: notes || undefined,
    prepTime,
    cookTime,
    servings,
    cuisine,
    ingredients,
    steps,
    badges,
    sourceURL: sourceURL || undefined,
    image: imageData ? `data:image/jpeg;base64,${imageData}` : image || undefined,
    imageData: imageData || undefined,
  };
}

function appendParam(params: URLSearchParams, key: string, value?: string) {
  if (!value) return;
  const trimmed = value.trim();
  if (trimmed) params.set(key, trimmed);
}

export function buildRecipeShareSearchParams(recipe: RecipeShareRecord): URLSearchParams {
  const params = new URLSearchParams();

  appendParam(params, "t", recipe.title);
  appendParam(params, "pt", recipe.prepTime);
  appendParam(params, "ct", recipe.cookTime);
  appendParam(params, "sv", recipe.servings);
  appendParam(params, "cu", recipe.cuisine);
  appendParam(params, "ing", recipe.ingredients.join("\n"));
  appendParam(params, "st", recipe.steps.join("\n"));
  appendParam(params, "nt", recipe.notes ?? recipe.summary);
  appendParam(params, "src", recipe.sourceURL);
  if (recipe.imageData) {
    appendParam(params, "imgd", recipe.imageData);
  } else {
    appendParam(params, "img", recipe.image);
  }

  badgeMap.forEach((badge) => {
    if (recipe.badges.includes(badge.label)) {
      params.set(badge.key, "1");
    }
  });

  return params;
}

export function buildRecipeShareURL(recipe: RecipeShareRecord): string {
  const query = buildRecipeShareSearchParams(recipe).toString();

  return query
    ? `https://www.rubenmanzano.com/reciperealm/${recipe.slug}?${query}`
    : `https://www.rubenmanzano.com/reciperealm/${recipe.slug}`;
}

export function buildRecipeDeepLink(recipe: RecipeShareRecord): string {
  return `RecipeRealm://app/recipe?${buildRecipeShareSearchParams(recipe).toString()}`;
}
