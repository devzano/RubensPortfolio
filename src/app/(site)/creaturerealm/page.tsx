// app/(site)/creaturerealm/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import HomeView_iOS from "@/components/Projects/CreatureRealm/Screenshots/ios/HomeView_iOS.png";
import HomeView_Android from "@/components/Projects/CreatureRealm/Screenshots/android/HomeView_Android.jpg";
import CollectionView_iOS from "@/components/Projects/CreatureRealm/Screenshots/ios/CollectionView_iOS.png";
import CollectionView_Android from "@/components/Projects/CreatureRealm/Screenshots/android/CollectionView_Android.jpg";
import GameDexView_iOS from "@/components/Projects/CreatureRealm/Screenshots/ios/GameDexView_iOS.png";
import GameDexView_Android from "@/components/Projects/CreatureRealm/Screenshots/android/GameDexView_Android.jpg";
import GameListDexView_iOS from "@/components/Projects/CreatureRealm/Screenshots/ios/GameListDexView_iOS.png";
import GameListDexView_Android from "@/components/Projects/CreatureRealm/Screenshots/android/GameListDexView_Android.jpg";
import NationalListDexView_iOS from "@/components/Projects/CreatureRealm/Screenshots/ios/NationalListDexView_iOS.png";
import NationalListDexView_Android from "@/components/Projects/CreatureRealm/Screenshots/android/NationalListDexView_Android.jpg";
import PokemonDetailView_iOS from "@/components/Projects/CreatureRealm/Screenshots/ios/PokemonDetailView_iOS.png";
import PokemonDetailView_Android from "@/components/Projects/CreatureRealm/Screenshots/android/PokemonDetailView_Android.jpg";

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [
    HomeView_iOS,
    CollectionView_iOS,
    GameDexView_iOS,
    GameListDexView_iOS,
    NationalListDexView_iOS,
    PokemonDetailView_iOS,
    HomeView_Android,
    CollectionView_Android,
    GameDexView_Android,
    GameListDexView_Android,
    NationalListDexView_Android,
    PokemonDetailView_Android,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="CreatureRealm"
      title="CreatureRealm"
      titleLink="https://testflight.apple.com/join/UPCSQDaM"
      icon={AppImages.creaturerealm}
      iconAlt="CreatureRealm app icon"
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
          label: "TestFlight",
          href: "https://testflight.apple.com/join/UPCSQDaM",
          variant: "accent",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <div className="leading-relaxed space-y-3">
          <p>
            <strong>
              <span className="text-[color:var(--accent)]">CreatureRealm</span>
            </strong>{" "}
            is your all-in-one companion for exploring creatures across your favorite
            games. Start with a beautifully crafted Pokédex experience—complete with
            detailed stats, evolutions, move data, weaknesses, and game-specific dex
            filters—and expand into future realms like Palworld, Animal Crossing, and
            more.
          </p>
          <p>
            Track your collections, view shiny and alternate forms, build teams, and
            discover everything you need in one smooth, modern app.
          </p>
        </div>
      }
      featureTitle="Features"
      features={[
        <>
          <strong className="text-slate-100">
            Complete Pokédex with game-specific filters:
          </strong>{" "}
          Browse regional and national dexes with filters that respect each game’s
          version groups and numbering.
        </>,
        <>
          <strong className="text-slate-100">Detailed creature pages:</strong>{" "}
          Stats, evolutions, move data, type matchups, encounter locations, and per-game
          context all in one place.
        </>,
        <>
          <strong className="text-slate-100">
            Per-game completion tracking (caught, shiny, alpha):
          </strong>{" "}
          Log what you’ve caught in each title, including shinies and special variants.
        </>,
        <>
          <strong className="text-slate-100">Designed for completionists:</strong>{" "}
          Progress bars for caught, shiny, and alpha completion per game make full dex
          runs more visual, satisfying, and easy to track—whether you play casually or
          aim for 100%.
        </>,
        <>
          <strong className="text-slate-100">More universes coming soon:</strong>{" "}
          CreatureRealm is built to support multiple creature franchises, not just one.
          New realms will expand the app beyond Pokémon into worlds like Palworld,
          Animal Crossing, and more.
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
        { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
        {
          src: AppImages.termsConditions,
          alt: "Terms",
          onClick: () => router.push("/creaturerealm/terms"),
        },
        {
          src: AppImages.privacyPolicy,
          alt: "Privacy",
          onClick: () => router.push("/creaturerealm/privacy"),
        },
      ]}
    />
  );
}
