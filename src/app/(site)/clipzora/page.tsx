// app/(site)/clipzora/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import HomeView_iOS from "@/components/Projects/Clipzora/Screenshots/ios/iOSHomeView.png";

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [
    HomeView_iOS,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Clipzora"
      title="Clipzora"
      titleLink="https://testflight.apple.com/join/UPCSQDaM"
      icon={AppImages.clipzora}
      iconAlt="Clipzora app icon"
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
          label: "iOS",
          href: "#ios-app-store-url",
          variant: "secondary",
        },
        {
          label: "macOS",
          href: "#macos-app-store-url",
          variant: "secondary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <div className="leading-relaxed space-y-3">
          <p>
            <strong>
              <span className="text-[color:var(--accent)]">Stop losing what you copy.</span>
            </strong>
          </p>
          <p>
            Most clipboards are gone the moment you hit copy again. <strong> <span className="text-[color:var(--accent)]">Clipzora</span> </strong> turns your temporary snippets into a permanent, organized library that works as fast as you do. From vital code snippets and design hex codes to high-res images and important links, <strong> <span className="text-[color:var(--accent)]">Clipzora</span> </strong> keeps your history searchable and accessible across your iPhone and Mac.
          </p>
          <p>
            Start for free with a 50-item history, folders, palettes, Secure Vault slots,
            Share Extension support, and essential filters. Upgrade to <strong> <span className="text-[color:var(--accent)]">Clipzora Pro</span> </strong> for unlimited history, iCloud sync, keyboard access to folders and vault items, advanced recovery tools, color pickers, and full import/export control.
          </p>
        </div>
      }
      featureTitle="Features"
      features={[
        <>
          <strong className="text-slate-100">Privacy-first clipboard history:</strong>{" "}
          Your clips are stored locally on your device, keeping your clipboard history
          private and under your control.
        </>,
        <>
          <strong className="text-slate-100">Capture everything:</strong>{" "}
          Save text, links, images, files, and colors using native clipboard monitoring
          and the Share Extension from Safari and other apps.
        </>,
        <>
          <strong className="text-slate-100">Instant search and organization:</strong>{" "}
          Find old snippets fast with searchable history, folders, palettes, smart filters,
          and rich previews.
        </>,
        <>
          <strong className="text-slate-100">Secure Vault:</strong>{" "}
          Protect sensitive clipboard data in a biometric-locked vault designed for private
          notes, credentials, and important copied content.
        </>,
        <>
          <strong className="text-slate-100">Native iPhone and Mac workflow:</strong>{" "}
          Access your clips through the custom keyboard, App Shortcuts, macOS menu bar,
          iCloud sync, ColorPickers, Camera Color Picker, and Pro import/export tools.
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
        { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
        {
          src: AppImages.termsConditions,
          alt: "Terms",
          onClick: () => router.push("/clipzora/terms"),
        },
        {
          src: AppImages.privacyPolicy,
          alt: "Privacy",
          onClick: () => router.push("/clipzora/privacy"),
        },
      ]}
    />
  );
}
