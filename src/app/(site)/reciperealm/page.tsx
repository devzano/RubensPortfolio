// app/(site)/reciperealm/page.tsx
"use client";

import React from "react";
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
        <p className="leading-relaxed">
          <strong>
            Discover a world of flavors with <span className="text-[color:var(--accent)]">RecipeRealm</span>
          </strong>{" "}
          — create, save, and share culinary creations with ease. Organize beautifully, explore new dishes, and customize
          your cooking.
        </p>
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