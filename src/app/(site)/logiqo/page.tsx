// src/app/(site)/logiqo/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import LogiqoHomeView_iOS from "@/components/Projects/Logiqo/Screenshots/HomeView_iOS.png";
import LogiqoDailyView_iOS from "@/components/Projects/Logiqo/Screenshots/DailyView_iOS.png";
import LogiqoProfileView_iOS from "@/components/Projects/Logiqo/Screenshots/ProfileView_iOS.png";
import LogiqoProfileCustomColorView_iOS from "@/components/Projects/Logiqo/Screenshots/ProfileCustomColorView_iOS.png";
import LogiqoHomeView_Android from "@/components/Projects/Logiqo/Screenshots/HomeView_Android.jpg";
import LogiqoDailyView_Android from "@/components/Projects/Logiqo/Screenshots/DailyView_Android.jpg";
import LogiqoProfileView_Android from "@/components/Projects/Logiqo/Screenshots/ProfileView_Android.jpg";
import LogiqoProfileCustomColorView_Android from "@/components/Projects/Logiqo/Screenshots/ProfileCustomColorView_Android.jpg";

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [
    LogiqoHomeView_iOS,
    LogiqoDailyView_iOS,
    LogiqoProfileView_iOS,
    LogiqoProfileCustomColorView_iOS,
    LogiqoHomeView_Android,
    LogiqoDailyView_Android,
    LogiqoProfileView_Android,
    LogiqoProfileCustomColorView_Android,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Logiqo"
      title="Logiqo"
      titleLink="https://apps.apple.com/us/app/logiqo/id6752290923"
      icon={AppImages.logiqo}
      iconAlt="Logiqo app icon"
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
          href: "https://apps.apple.com/us/app/logiqo/id6752290923",
          variant: "primary",
        },
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.devzano.Logiqo",
          variant: "secondary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <p className="leading-relaxed">
          <strong>
            Sharpen your mind with puzzles and classic board games —{" "}
            <span className="text-[color:var(--accent)]">Logiqo</span>
          </strong>{" "}
          brings together Sudoku, Word Search, Chess, Checkers, Minesweeper and
          more in a sleek, modern app.
        </p>
      }
      featureTitle="Highlights"
      features={[
        <>
          <strong className="text-slate-100">Daily puzzles &amp; streaks:</strong> Fresh
          challenges to keep you coming back.
        </>,
        <>
          <strong className="text-slate-100">Save &amp; continue:</strong> Pick up right
          where you left off.
        </>,
        <>
          <strong className="text-slate-100">Custom colors:</strong> Personalize the look
          and feel.
        </>,
        <>
          <strong className="text-slate-100">Helpful hints:</strong> Nudge past tricky
          moments.
        </>,
        <>
          <strong className="text-slate-100">Distraction-free design:</strong> A smooth UI
          focused on play.
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
        { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
        { src: AppImages.expo, alt: "Expo", href: "https://docs.expo.dev/" },
        { src: AppImages.firebase, alt: "Firebase", href: "https://firebase.google.com/" },
        { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/logiqo/terms") },
        { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/logiqo/privacy") },
      ]}
    />
  );
}