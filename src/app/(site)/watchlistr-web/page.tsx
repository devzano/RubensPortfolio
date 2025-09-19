// app/(site)/watchlistr-web/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import LoginPage from "@/components/Projects/Watchlistr-Web/Screenshots/WatchlistrWeb_LoginPage.png";
import SignupPage from "@/components/Projects/Watchlistr-Web/Screenshots/WatchlistrWeb_SignupPage.png";
import HomePage from "@/components/Projects/Watchlistr-Web/Screenshots/WatchlistrWeb_HomePage.png";
import MoviesPage from "@/components/Projects/Watchlistr-Web/Screenshots/WatchlistrWeb_MoviesPage.png";
import TVShowsPage from "@/components/Projects/Watchlistr-Web/Screenshots/WatchlistrWeb_TVShowsPage.png";

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [LoginPage, SignupPage, HomePage, MoviesPage, TVShowsPage];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Watchlistr(Web)"
      title="Watchlistr"
      titleLink="https://watchlistr.app"
      icon={AppImages.watchlistr}
      iconAlt="Watchlistr app icon"
      screenshots={screenshots}
      screenshotProps={{
        variant: "web",
        webAspect: "16/9",
        webSizes: "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px",
        fit: "cover",
        intervalMs: 4000
      }}
      actions={({ openFeedback }) => [
        {
          label: "Landing Page",
          href: "https://www.watchlistr.app/",
          external: true,
          variant: "primary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <p className="leading-relaxed">
          <strong>
            Enhance your entertainment experience with{" "}
            <span className="text-[color:var(--accent)]">Watchlistr</span>
          </strong>{" "}
          — a platform designed to help you track, discover, and organize your
          favorite Movies and TV Shows across web and iOS. What began as a
          personal web project has evolved into a seamless, integrated experience
          between the{" "}
          <a
            href="https://www.rubenmanzano.com/watchlistr-web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--accent)] underline-offset-4 hover:underline"
          >
            web platform
          </a>{" "}
          and the{" "}
          <a
            href="https://www.rubenmanzano.com/watchlistr-mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--accent)] underline-offset-4 hover:underline"
          >
            mobile app
          </a>
          , keeping your watchlist connected anywhere.
        </p>
      }
      featureTitle="Features"
      features={[
        <>
          <strong className="text-slate-100">Unified Experience:</strong> Log in on either platform — your watchlists stay in sync
          between the web and mobile apps.
        </>,
        <>
          <strong className="text-slate-100">Personal Watchlists:</strong> Track what you&apos;re watching, finished, or planning.
        </>,
        <>
          <strong className="text-slate-100">Discover New Content:</strong> Explore upcoming, popular, and top-rated titles.
        </>,
        <>
          <strong className="text-slate-100">Streaming Availability:</strong> Quickly see where a title is available to watch.
        </>,
        <>
          <strong className="text-slate-100">Intuitive Browsing:</strong> Sort and filter across genres to find hidden gems.
        </>,
        <>
          <strong className="text-slate-100">Seamless Account Integration:</strong> Preferences and lists stay consistent everywhere.
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.react, alt: "React", href: "https://react.dev/" },
        { src: AppImages.vite, alt: "Vite", href: "https://vitejs.dev/" },
        { src: AppImages.firebase, alt: "Firebase", href: "https://firebase.google.com/" },
        { src: AppImages.javascript, alt: "JavaScript", href: "https://developer.mozilla.org/docs/Web/JavaScript" },
        { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/watchlistr-web/terms") },
        { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/watchlistr-web/privacy") },
      ]}
    />
  );
}