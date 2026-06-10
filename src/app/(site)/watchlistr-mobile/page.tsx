// app/(site)/watchlistr-mobile/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots (iOS)
import LoginViewiPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/login_iphone.png";
import SignupViewiPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/signup_iphone.png";
import ProfileTabViewiPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/profile_iphone.png";
import ProfileTabView2iPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/profile2_iphone.png";
import NotificationsView2iPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/notifications_iphone.png";
import MovieTabViewiPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/movie-tab_iphone.png";
import MovieTrendingViewiPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/movie-trending_iphone.png";
import MovieDetailsViewiPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/movie-details_iphone.png";
import TVShowTabViewiPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/tvshow-tab_iphone.png";
import TVShowDetailsViewiPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/tvshow-details_iphone.png";
import MovieWatchlistViewiPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/movie-watchlist_iphone.png";
import TVShowWatchlistViewiPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/tvshow-watchlist_iphone.png";
import AboutDeveloperViewiPhone from "@/components/Projects/Watchlistr-Mobile/Screenshots/about-developer_iphone.png";

// Screenshots (Android)
import LoginViewAndroid from "@/components/Projects/Watchlistr-Mobile/Screenshots/login_android.png";
import SignupViewAndroid from "@/components/Projects/Watchlistr-Mobile/Screenshots/signup_android.png";
import ProfileTabViewAndroid from "@/components/Projects/Watchlistr-Mobile/Screenshots/profile_android.png";
import MovieTabViewAndroid from "@/components/Projects/Watchlistr-Mobile/Screenshots/movie-tab_android.png";
import MovieDetailsViewAndroid from "@/components/Projects/Watchlistr-Mobile/Screenshots/movie-details_android.png";
import TVShowTabViewAndroid from "@/components/Projects/Watchlistr-Mobile/Screenshots/tvshow-tab_android.png";
import TVShowDetailsViewAndroid from "@/components/Projects/Watchlistr-Mobile/Screenshots/tvshow-details_android.png";
import SearchAndroid from "@/components/Projects/Watchlistr-Mobile/Screenshots/search_android.png";
import SearchGenreAndroid from "@/components/Projects/Watchlistr-Mobile/Screenshots/search-genre_android.png";
import MovieWatchlistViewAndroid from "@/components/Projects/Watchlistr-Mobile/Screenshots/movie-watchlist_android.png";
import TVShowWatchlistViewAndroid from "@/components/Projects/Watchlistr-Mobile/Screenshots/tvshow-watchlist_android.png";

const WATCHLISTR_IPA_PATH =
  "https://github.com/devzano/RubensPortfolio/releases/download/watchlistr-ios-ipa/Watchlistr.ipa";

const watchlistrModalAccentVars = {
  "--accent": "#2EA0FF",
  "--accent-light": "#8BCBFF",
  "--accent-soft": "rgba(46, 160, 255, 0.20)",
  "--accent-softer": "rgba(46, 160, 255, 0.50)",
  "--accent-verysoft": "rgba(46, 160, 255, 0.08)",
} as React.CSSProperties;

const sideloadSteps = [
  {
    title: "Download IPA",
    body: "Use the button below to save the Watchlistr IPA to your device or computer.",
  },
  {
    title: "Open a sideloading tool",
    body: "Use a tool you trust, such as AltStore, Sideloadly, or another iOS sideloading option that supports local IPA files.",
  },
  {
    title: "Install on your iPhone",
    body: "Select Watchlistr.ipa in that tool, connect your iPhone if prompted, and let the tool sign and install the app.",
  },
  {
    title: "Trust the profile if needed",
    body: "If iOS asks, open Settings > General > VPN & Device Management, then trust the developer profile used for the install.",
  },
];

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();
  const [isIpaModalOpen, setIsIpaModalOpen] = useState(false);

  const screenshots = [
    // iOS
    LoginViewiPhone,
    SignupViewiPhone,
    ProfileTabViewiPhone,
    ProfileTabView2iPhone,
    NotificationsView2iPhone,
    MovieTabViewiPhone,
    MovieTrendingViewiPhone,
    MovieDetailsViewiPhone,
    TVShowTabViewiPhone,
    TVShowDetailsViewiPhone,
    MovieWatchlistViewiPhone,
    TVShowWatchlistViewiPhone,
    AboutDeveloperViewiPhone,
    // Android
    LoginViewAndroid,
    SignupViewAndroid,
    ProfileTabViewAndroid,
    MovieTabViewAndroid,
    MovieDetailsViewAndroid,
    TVShowTabViewAndroid,
    TVShowDetailsViewAndroid,
    SearchAndroid,
    SearchGenreAndroid,
    MovieWatchlistViewAndroid,
    TVShowWatchlistViewAndroid,
  ];

  return (
    <>
      <ProjectPage
        showArrows={showArrows}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        appName="Watchlistr (Mobile)"
        title="Watchlistr"
        titleLink="https://watchlistr.app"
        icon={AppImages.watchlistr}
        iconAlt="Watchlistr app icon"
        subtle={<>for the full iOS experience of Watchlistr, tap iOS IPA.</>}
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
            label: "App Store",
            href: "https://apps.apple.com/us/app/watchlistr/id6459355223",
            variant: "primary",
          },
          {
            label: "Play Store",
            href: "https://play.google.com/store/apps/details?id=com.devzano.Watchlistr",
            variant: "secondary",
          },
          {
            label: "iOS IPA",
            onClick: () => setIsIpaModalOpen(true),
            variant: "accent",
          },
          { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
        ]}
        description={
          <p className="leading-relaxed">
            <strong>
              Discover and track your favorite movies and shows with{" "}
              <span className="text-[color:var(--accent)]">Watchlistr</span>
            </strong>{" "}
            — your personalized hub for keeping up with the latest releases, hidden gems, and timeless classics. With an
            intuitive design, powerful search tools, and smart watchlist management, Watchlistr makes it effortless to
            stay on top of your entertainment journey.
          </p>
        }
        featureTitle="Features"
        features={[
          <>
            <strong className="text-slate-100">Browse &amp; Discover:</strong> Explore the latest blockbusters, classic
            films, and binge-worthy series. Enjoy curated lists, streaming service breakdowns, and dedicated TV show
            sections highlighting what’s airing today and tomorrow. Sort your content your way with flexible sorting
            options.
          </>,
          <>
            <strong className="text-slate-100">Smart Search:</strong> Quickly find movies, shows, actors, or genres with
            a powerful search feature — complete with search history for fast access. View collections when available for
            movies and preview genre-based media selections.
          </>,
          <>
            <strong className="text-slate-100">Detailed Media Info:</strong> Tap into rich details for any title — from
            episode counts to streaming availability. Jump directly into streaming apps (if installed) or view details on
            TMDB. Easily explore collections, discover related media through cast connections, and enjoy smart
            suggestions.
          </>,
          <>
            <strong className="text-slate-100">Share Your Favorites:</strong> Share media directly from its detail page.
            The recipient is taken straight to the media’s page within the app for seamless sharing and discovery.
          </>,
          <>
            <strong className="text-slate-100">Custom Notifications:</strong> Stay in the loop with reminders for new
            releases, upcoming episodes, or rewatch plans — all delivered with a unique notification sound.
          </>,
          <>
            <strong className="text-slate-100">Manage Your Watchlist:</strong> Mark movies or individual episodes as
            “watched,” long-press to set reminders or toggle statuses, auto “New Episode” badges, sort by
            status/alpha/added date, and organize into folders.
          </>,
          <>
            <strong className="text-slate-100">Personalized Profile:</strong> Customize photo, text colors, light/dark
            mode, see counts &amp; notifications, choose default launch tab.
          </>,
          <>
            <strong className="text-slate-100">Secure Sign-In:</strong> Apple/Google auth with Firebase; try as a guest
            via a temp user.
          </>,
        ]}
        builtWith={[
          { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
          { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
          { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
          { src: AppImages.expo, alt: "Expo", href: "https://docs.expo.dev/" },
          { src: AppImages.firebase, alt: "Firebase", href: "https://firebase.google.com/" },
          { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/watchlistr-mobile/terms") },
          { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/watchlistr-mobile/privacy") },
        ]}
      />

      <IpaInstallModal isOpen={isIpaModalOpen} onClose={() => setIsIpaModalOpen(false)} />
    </>
  );
}

function IpaInstallModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setPortalContainer(document.getElementById("modal-root") ?? document.body);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusHandle = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusHandle);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !portalContainer) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-black/90 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="watchlistr-ipa-title"
      style={watchlistrModalAccentVars}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[88dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 text-slate-100 shadow-2xl shadow-black/50 ring-1 ring-white/10">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-2xl leading-none text-slate-200 transition hover:scale-105 hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          aria-label="Close IPA install instructions"
        >
          &times;
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-6 sm:px-7 sm:pt-7">
          <div className="pr-11">
            <h2 id="watchlistr-ipa-title" className="text-2xl font-semibold tracking-tight text-[color:var(--accent-light)] sm:text-3xl">
              Watchlistr IPA
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Install with your preferred iOS sideloading tool.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {sideloadSteps.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent-light)] ring-1 ring-[color:var(--accent-softer)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-[color:var(--accent-soft)] bg-[color:var(--accent-verysoft)] p-4 text-sm leading-6 text-slate-300">
            Free Apple ID installs may need to be refreshed periodically.
          </div>

        </div>

        <div className="border-t border-white/10 bg-slate-950/95 px-5 py-4 sm:px-7">
          <a
            href={WATCHLISTR_IPA_PATH}
            download
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--accent-light)] to-[color:var(--accent)] px-5 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-light)]"
          >
            Download IPA
          </a>
        </div>
      </div>
    </div>,
    portalContainer
  );
}
