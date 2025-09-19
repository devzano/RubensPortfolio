// app/(site)/otakuhive/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import MangaDetailView from "@/components/Projects/OtakuHive/Screenshots/OtakuHive_MangaDetailView.png";
import FullScreenReader from "@/components/Projects/OtakuHive/Screenshots/OtakuHive_FullScreenReader.png";
import SavedView from "@/components/Projects/OtakuHive/Screenshots/OtakuHive_SavedView.png";
import SearchView from "@/components/Projects/OtakuHive/Screenshots/OtakuHive_SearchView.png";

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [
    MangaDetailView,
    FullScreenReader,
    SavedView,
    SearchView,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="OtakuHive"
      title="OtakuHive"
      titleLink="https://testflight.apple.com/join/sRsqfd9y"
      icon={AppImages.otakuHive}
      iconAlt="OtakuHive app icon"
      screenshots={screenshots}
      screenshotProps={{
        variant: "app",
        aspect: "9/19",
        cols: { mobile: 2, desktop: 4 },
        deferUntilMounted: true,
        sizes: "(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 240px",
      }}
      actions={({ openFeedback }) => [
        { label: "TestFlight", href: "https://testflight.apple.com/join/sRsqfd9y", variant: "accent" },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <p className="leading-relaxed">
          <strong>
            Discover a world of manga with <span className="text-[color:var(--accent)]">OtakuHive</span>
          </strong>{" "}
          — a sleek, powerful reader that connects directly to MangaDex for a massive,
          always-fresh catalog.
        </p>
      }
      featureTitle="Features"
      features={[
        <>
          <strong className="text-slate-100">Powered by MangaDex:</strong> Real-time
          access to a huge library.
        </>,
        <>
          <strong className="text-slate-100">Random &amp; Latest:</strong> Discover
          surprises or jump into the newest drops.
        </>,
        <>
          <strong className="text-slate-100">Smart Search:</strong> Quickly find any title
          by name.
        </>,
        <>
          <strong className="text-slate-100">Saved Manga:</strong> Bookmark favorites for
          instant access.
        </>,
        <>
          <strong className="text-slate-100">Reading Progress:</strong> Bookmarks remember
          your exact page and auto-scroll on reopen.
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
        { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
        { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/otakuhive/terms") },
        { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/otakuhive/privacy") },
      ]}
    />
  );
}