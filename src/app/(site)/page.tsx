// src/app/(site)/page.tsx
import { StaticImageData } from "next/image";
import AppImages from "@/constants/images";
import GetInTouchCTA from "@/components/Home/GetInTouchCTA";
import ProjectsMenuCTA from "@/components/Home/ProjectsMenuCTA";
import HeroVisual from "@/components/Home/HeroVisual";

type Variant = {
  label: "mobile" | "web";
  href: "/watchlistr-mobile" | "/watchlistr-web";
};
type Card = {
  title: string;
  href: string;
  desc: string;
  icon?: StaticImageData | string;
  variants?: readonly Variant[];
};

export default function Home() {
  const cards: readonly Card[] = [
    {
      title: "Watchlistr",
      href: "/watchlistr-mobile",
      desc: "Movie & TV tracker with Firebase, Supabase, and custom theming.",
      icon: AppImages.watchlistr,
      variants: [
        { label: "mobile", href: "/watchlistr-mobile" },
        { label: "web", href: "/watchlistr-web" },
      ] as const,
    },
    {
      title: "CreatureRealm",
      href: "/creaturerealm",
      desc: "Multi-game creature compendium with interactive maps & collection tracking.",
      icon: AppImages.creaturerealm,
    },
    {
      title: "RecipeRealm",
      href: "/reciperealm",
      desc: "SwiftUI recipe manager with AI scanning and CloudKit sync.",
      icon: AppImages.recipeRealm,
    },
    {
      title: "EchoExpense",
      href: "/echoexpense",
      desc: "Simple bill tracking with TipStore and custom notifications.",
      icon: AppImages.echoExpense,
    },
    {
      title: "Starship Pixelscape",
      href: "/starship-pixelscape",
      desc: "Retro space shooter with Game Center and custom effects.",
      icon: AppImages.starshipPixelscape,
    },
    {
      title: "Steda",
      href: "/steda",
      desc: "Habit & focus toolkit with clean UX.",
      icon: AppImages.steda,
    },
    {
      title: "OtakuHive",
      href: "/otakuhive",
      desc: "Anime & manga collections with Supabase.",
      icon: AppImages.otakuHive,
    },
    {
      title: "Manzanos PopShop",
      href: "/manzanos-popshop",
      desc: "Funko Pop store with Supabase + Stripe.",
      icon: AppImages.manzanosPopShop,
    },
    {
      title: "AutoArchive",
      href: "/autoarchive",
      desc: "Vehicle maintenance tracker with SwiftData.",
      icon: AppImages.autoArchive,
    },
    {
      title: "Logiqo",
      href: "/logiqo",
      desc: "Logic pocket playground.",
      icon: AppImages.logiqo,
    },
    {
      title: "SunshineKeyWestChallenge",
      href: "/sunshinekeywestchallenge",
      desc: "DRI fundraising charity fishing event.",
      icon: AppImages.sunshineKeyWestChallenge,
    },
  ] as const;

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="relative z-10 flex flex-col pt-[var(--nav-h,56px)] min-h-[calc(100dvh-var(--nav-h,56px))]">
        <main className="flex-1 grid place-items-center">
          <section className="w-full px-6 sm:px-10">
            <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 items-center will-change-transform motion-reduce:translate-y-0">
              <div>
                <h1 className="text-4xl sm:text-6xl font-semibold leading-tight tracking-tight">
                  Software Engineer &amp; Web Developer
                </h1>

                <p className="mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-300">
                  Motivated and detail-driven engineer, building polished apps with
                  <span className="font-medium"> SwiftUI</span>,{" "}
                  <span className="font-medium">React Native + Expo</span> — backed by{" "}
                  <span className="font-medium">Supabase/Firebase</span>. Seeking an
                  entry-level role where I can contribute, learn fast, and ship thoughtful
                  experiences.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  <a
                    href="/downloads/Ruben_Manzano_Resume.pdf"
                    download="Ruben_Manzano_Resume.pdf"
                    rel="noopener"
                    className="group relative h-11 px-5 w-full sm:w-auto rounded-full border border-neutral-200 dark:border-neutral-800 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white font-medium flex items-center justify-center shadow-sm transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
                  >
                    Resume (PDF)
                    {/* soft UFO ring */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full ring-0 ring-sky-400/0 transition-all duration-300 group-hover:ring-8 group-hover:ring-sky-400/10 dark:group-hover:ring-sky-300/10"
                    />
                    {/* gradient underline */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -z-10 left-1/2 top-full mt-1 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-400/70 to-transparent transition-all duration-300 group-hover:w-2/3"
                    />
                  </a>

                  <GetInTouchCTA />
                  <ProjectsMenuCTA items={cards} />
                </div>
              </div>

              <HeroVisual items={cards} />
            </div>
          </section>
        </main>

        <footer className="px-6 sm:px-10 py-10">
          <div className="mx-auto max-w-6xl text-sm text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
            <p>© {new Date().getFullYear()} devzano</p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/devzano"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
