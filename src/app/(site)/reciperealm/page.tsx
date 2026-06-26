// app/(site)/reciperealm/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import WelcomeView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_WelcomeView.png";
import HomeView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_HomeView.png";
import OpenBookView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_OpenBookView.png";
import OpenBookDetailView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_OpenBookDetailView.png";
import DetailsView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_DetailsView.png";
import Details2View from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_Details2View.png";
import EditDetailsView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_EditDetailsView.png";
import EditDetails2View from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_EditDetails2View.png";
import NewRecipeView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_NewRecipeView.png";
import NewRecipeImportView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_NewRecipeImportView.png";
import NewRecipeImageView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_NewRecipeImageView.png";
import NewRecipeBookImageView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_NewRecipeBookImageView.png";
import NewBookView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_NewBookView.png";
import RecipeBookContextView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_RecipeBookContextView.png";
import RecipeBookContextOptionsView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_RecipeBookContextOptionsView.png";
import RecipeContextOptionsView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_RecipeContextOptionsView.png";
import RandomBannerView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_RandomBannerView.png";
import OptionsView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_OptionsView.png";
import ChangeTintView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_ChangeTintView.png";
import ChangeThemeView from "@/components/Projects/RecipeRealm/Screenshots/RecipeRealm_ChangeThemeView.png";

const versionHistory = [
  {
    version: "26.1",
    title: "26.1 Update",
    items: ["Share grocery lists.", "Bug fixes."],
  },
  {
    version: "26.0",
    title: "26.0 Update",
    items: [
      "Major upgrade across the entire app with a refreshed UI and smoother interactions.",
      "Share recipe books and individual recipes with other people.",
      "Siri Shortcuts for faster hands-free actions.",
      "Rebuilt web importer for more reliable recipe imports.",
      "Meal planner, calorie tracker, kitchen tools, and grocery lists.",
      "Widgets for random recipes, meal planner, and grocery list.",
      "Pin favorite recipe books to the top for quicker access.",
    ],
  },
  {
    version: "1.0.7",
    title: "1.0.7 Update",
    items: [
      "Redesigned for iOS 26 with a modern, sleek interface.",
      "New comments for RecipeRealm Community posts.",
      "Improved recipe books and organization.",
      "Pin ingredients, steps, and notes for better recipe structure.",
      "Bug fixes and performance improvements.",
    ],
  },
  {
    version: "1.0.6",
    title: "1.0.6 Update",
    items: [
      "Onboarding and revamped UI.",
      "Post recipes to the community from the recipe detail view.",
      "Reorder ingredients and steps.",
      "Improved Google image picker.",
      "Import recipes from websites.",
      "Improved community section and editable community posts.",
    ],
  },
  {
    version: "1.0.5",
    title: "1.0.5 Update",
    items: [
      "Save Recipe Assistant chats for future reference.",
      "Upload up to 4 images when posting in the community.",
      "Improved ingredient and step entry.",
      "Smart in-app search.",
      "AI-powered recipe text formatting.",
      "Scan handwritten recipes.",
    ],
  },
  {
    version: "1.0.4",
    title: "1.0.4 Update",
    items: [
      "Bug fixes and performance improvements.",
      "App icon customization.",
      "Cross-device recipe syncing with Apple ID.",
    ],
  },
  {
    version: "1.0.3",
    title: "1.0.3 Update",
    items: [
      "Bug fixes and performance improvements.",
      "App icon customization.",
    ],
  },
  {
    version: "1.0.2",
    title: "1.0.2 Update",
    items: [
      "Apple and Google sign-up support.",
      "Added servings as a recipe attribute.",
      "Added feedback UI in the developer page.",
    ],
  },
  {
    version: "1.0.1",
    title: "1.0.1 Update",
    items: [
      "Introduced RecipeRealm Community.",
      "Added Recipe Assistant for community members.",
      "Added new styles and accessibility-focused customization.",
      "Enhanced image search.",
      "Recipe sharing and importing.",
      "Step-by-step tracking.",
      "More nutrition badges.",
      "Random recipe banner.",
      "Performance improvements and iPad optimizations.",
    ],
  },
];

function WhatsNewSection() {
  const [selectedVersion, setSelectedVersion] = useState(versionHistory[0].version);

  const selected = useMemo(
    () => versionHistory.find((item) => item.version === selectedVersion) ?? versionHistory[0],
    [selectedVersion]
  );

  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/4 p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">What’s New</h3>
          <p className="text-sm text-slate-400">View RecipeRealm version history.</p>
        </div>

        <select
          value={selectedVersion}
          onChange={(event) => setSelectedVersion(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm font-semibold text-white outline-none transition hover:border-white/20 focus:border-(--accent)"
        >
          {versionHistory.map((item) => (
            <option key={item.version} value={item.version}>
              Version {item.version}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <h4 className="mb-3 text-lg font-bold text-white">{selected.title}</h4>

        <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
          {selected.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [
    WelcomeView,
    HomeView,
    OpenBookView,
    OpenBookDetailView,
    DetailsView,
    Details2View,
    EditDetailsView,
    EditDetails2View,
    NewRecipeView,
    NewRecipeImportView,
    NewRecipeImageView,
    NewRecipeBookImageView,
    NewBookView,
    RecipeBookContextView,
    RecipeBookContextOptionsView,
    RecipeContextOptionsView,
    RandomBannerView,
    OptionsView,
    ChangeTintView,
    ChangeThemeView,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="RecipeRealm"
      title="RecipeRealm"
      titleLink="https://apps.apple.com/us/app/reciperealm/id6458877177"
      icon={AppImages.recipeRealm}
      iconAlt="RecipeRealm app icon"
      screenshots={screenshots}
      screenshotProps={{
        variant: "app",
        aspect: "9/19",
        cols: { mobile: 2, desktop: 4 },
        deferUntilMounted: true,
        sizes: "(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 240px",
      }}
      actions={({ openFeedback }) => [
        {
          label: "Apple Store",
          href: "https://apps.apple.com/us/app/reciperealm/id6458877177",
          variant: "primary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <div className="space-y-4 leading-relaxed">
          <p>
            <strong>
              Discover a world of flavors with{" "}
              <span className="text-var(--accent)">RecipeRealm</span>
            </strong>{" "}
            — create, save, and share culinary creations with ease. Organize beautifully,
            explore new dishes, and customize your cooking.
          </p>

          <WhatsNewSection />
        </div>
      }
      featureTitle="Features"
      features={[
        <>
          <strong className="text-slate-100">Store &amp; Browse:</strong> Full recipe cards with times, images, ingredients, and
          steps.
        </>,
        <>
          <strong className="text-slate-100">In-App Browser &amp; Ingredient Capture:</strong> Scan ingredients from web pages.
        </>,
        <>
          <strong className="text-slate-100">Images Made Easy:</strong> Library, camera, or Google image search.
        </>,
        <>
          <strong className="text-slate-100">Edit Anytime:</strong> Update sections and crop photos effortlessly.
        </>,
        <>
          <strong className="text-slate-100">Step-by-Step Tracking:</strong> Check off ingredients/steps; reset for re-use.
        </>,
        <>
          <strong className="text-slate-100">Quick Search &amp; Filters:</strong> Search bar + filters (time, cuisine).
        </>,
        <>
          <strong className="text-slate-100">Dietary Preferences:</strong> Tag for gluten-free, sugar-free, etc.
        </>,
        <>
          <strong className="text-slate-100">Share the Flavor:</strong> Share/import directly into the app.
        </>,
        <>
          <strong className="text-slate-100">Easy Additions:</strong> Paste full recipe content (incl. images).
        </>,
        <>
          <strong className="text-slate-100">Community &amp; AI Assistant:</strong> Chefs Assistant (OpenAI), 12 msgs/day for
          members.
        </>,
        <>
          <strong className="text-slate-100">Random Recipe Banner:</strong> Fresh inspiration each launch.
        </>,
        <>
          <strong className="text-slate-100">My Recipe Starter:</strong> One recipe included to begin.
        </>,
        <>
          <strong className="text-slate-100">Recipe Books:</strong> Organize into books; drag, drop, and sort.
        </>,
        <>
          <strong className="text-slate-100">Color UI:</strong> Choose your tint color.
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
        { src: AppImages.coredata, alt: "Core Data", href: "https://developer.apple.com/documentation/coredata/" },
        { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
        { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/reciperealm/terms") },
        { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/reciperealm/privacy") },
      ]}
    />
  );
}