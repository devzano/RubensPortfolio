import Link from "next/link";
import {
  buildRecipeDeepLink,
  buildRecipeShareURL,
  type RecipeShareRecord,
} from "@/components/Projects/RecipeRealm/shareData";

type RecipeShareLandingProps = {
  recipe: RecipeShareRecord;
};

export default function RecipeShareLanding({ recipe }: RecipeShareLandingProps) {
  const deepLink = buildRecipeDeepLink(recipe);
  const appStoreURL = "https://apps.apple.com/us/app/reciperealm/id6458877177";
  const shareURL = buildRecipeShareURL(recipe);

  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(234,88,12,0.22),_transparent_28%),linear-gradient(180deg,_#0b1020_0%,_#151a29_42%,_#1c2435_100%)] text-slate-50">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <header className="flex flex-col gap-5 rounded-[32px] border border-white/10 bg-white/8 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-400/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-100">
                RecipeRealm Share
              </div>
              <div className="space-y-2">
                <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {recipe.title}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  {recipe.summary}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={deepLink}
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 px-5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(249,115,22,0.35)] transition hover:brightness-110"
              >
                Open In RecipeRealm
              </Link>
              <Link
                href={appStoreURL}
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/15 bg-white/6 px-5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                Get The App
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Prep", value: recipe.prepTime },
              { label: "Cook", value: recipe.cookTime },
              { label: "Serves", value: recipe.servings },
              { label: "Cuisine", value: recipe.cuisine },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-slate-950/25 px-4 py-4"
              >
                <div className="text-xs uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
                <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="overflow-hidden rounded-[32px] border border-white/10 bg-white/6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            {recipe.image ? (
              <div
                className="h-72 w-full bg-cover bg-center sm:h-[28rem]"
                style={{ backgroundImage: `url(${recipe.image})` }}
              />
            ) : (
              <div className="relative h-72 w-full overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.28),_transparent_30%),linear-gradient(135deg,_rgba(15,23,42,1)_0%,_rgba(30,41,59,1)_55%,_rgba(71,85,105,0.85)_100%)] sm:h-[28rem]">
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-100">
                    Recipe Preview
                  </div>
                  <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {recipe.title}
                  </h2>
                </div>
              </div>
            )}
            <div className="space-y-6 p-5 sm:p-7">
              <div className="flex flex-wrap gap-2">
                {recipe.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-orange-300/25 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-100"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {recipe.sourceURL ? (
                <div className="rounded-[20px] border border-white/8 bg-slate-950/20 px-4 py-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Source</div>
                  <Link
                    href={recipe.sourceURL}
                    className="mt-2 block break-all text-sm leading-6 text-orange-200 transition hover:text-orange-100"
                  >
                    {recipe.sourceURL}
                  </Link>
                </div>
              ) : null}

              <div className="grid gap-6 md:grid-cols-2">
                <section className="rounded-[24px] border border-white/8 bg-slate-950/20 p-5">
                  <h2 className="text-lg font-semibold text-white">Ingredients</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-orange-300" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-[24px] border border-white/8 bg-slate-950/20 p-5">
                  <h2 className="text-lg font-semibold text-white">Steps</h2>
                  <ol className="mt-4 space-y-4 text-sm leading-6 text-slate-200">
                    {recipe.steps.map((step, index) => (
                      <li key={step} className="flex gap-4">
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-orange-100">
                          {index + 1}
                        </span>
                        <span className="pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <section className="rounded-[30px] border border-white/10 bg-white/6 p-6 shadow-[0_16px_55px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-white">Open This In The App</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                RecipeRealm can turn this share into a native import preview so someone can review,
                edit, and save it directly into their own recipe collection.
              </p>

              <div className="mt-5 space-y-3">
                <Link
                  href={deepLink}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-400 to-rose-500 px-5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Open Share Link In App
                </Link>
                <Link
                  href={appStoreURL}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/6 px-5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                >
                  Install RecipeRealm
                </Link>
              </div>
            </section>

            <section className="rounded-[30px] border border-white/10 bg-slate-950/25 p-6">
              <h2 className="text-xl font-semibold text-white">Share Route</h2>
              <p className="mt-3 break-all text-sm leading-7 text-slate-300">
                {shareURL}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                This route is ready for universal links on iOS via the existing
                <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-slate-200">
                  /.well-known/apple-app-site-association
                </code>
                file.
              </p>
            </section>
          </aside>
        </section>
      </section>
    </main>
  );
}
