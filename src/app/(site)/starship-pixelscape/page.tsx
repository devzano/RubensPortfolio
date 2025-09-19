// app/(site)/starship-pixelscape/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import MainMenuView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_MainMenuView.png";
import GameSettingsView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GameSettingsView.png";
import GameSettings2View from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GameSettings2View.png";
import GamePlayView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GamePlayView.png";
import GamePlay2View from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GamePlay2View.png";
import GamePlay3View from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GamePlay3View.png";
import GamePlayBossView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GamePlayBossView.png";
import GameOverView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GameOverView.png";

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [
    MainMenuView,
    GameSettingsView,
    GameSettings2View,
    GamePlayView,
    GamePlay2View,
    GamePlay3View,
    GamePlayBossView,
    GameOverView,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Starship Pixelscape"
      title="Starship Pixelscape"
      titleLink="https://apps.apple.com/us/app/starship-pixelscape/id6741517533"
      icon={AppImages.starshipPixelscape}
      iconAlt="Starship Pixelscape app icon"
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
          href: "https://apps.apple.com/us/app/starship-pixelscape/id6741517533",
          variant: "primary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <p className="leading-relaxed">
          <strong>
            Blast off into a retro-styled, action-packed adventure with{" "}
            <span className="text-[color:var(--accent)]">Starship Pixelscape</span>
          </strong>{" "}
          — dodge meteors, battle UFOs, and take down colossal bosses while
          chasing top leaderboard scores.
        </p>
      }
      featureTitle="Features"
      features={[
        <>
          <strong className="text-slate-100">Choose Your Spaceship:</strong> Pick
          from unique ships and play your way.
        </>,
        <>
          <strong className="text-slate-100">Shoot Meteors:</strong> Endless
          cosmic storm—survive and score higher.
        </>,
        <>
          <strong className="text-slate-100">Intuitive Controls:</strong> Drag or
          classic joystick.
        </>,
        <>
          <strong className="text-slate-100">Power-ups:</strong> Boost abilities
          to turn the tide.
        </>,
        <>
          <strong className="text-slate-100">Enemy UFOs &amp; Bosses:</strong>{" "}
          Fast dogfights and epic showdowns.
        </>,
        <>
          <strong className="text-slate-100">Leaderboard:</strong> Compete for
          the Top-10!
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
        { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
        { src: AppImages.privacyPolicy, alt: "Privacy Policy", onClick: () => router.push("/starship-pixelscape/privacy") },
        { src: AppImages.termsConditions, alt: "Terms and Conditions", onClick: () => router.push("/starship-pixelscape/terms") },
      ]}
    />
  );
}