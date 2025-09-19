// app/(site)/watchlistr-mobile/page.tsx
"use client";

import React from "react";
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

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

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
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Watchlistr (Mobile)"
      title="Watchlistr"
      titleLink="https://watchlistr.app"
      icon={AppImages.watchlistr}
      iconAlt="Watchlistr app icon"
      subtle={<>for the full iOS experience of Watchlistr tap TestFlight!</>}
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
          href: "https://apps.apple.com/us/app/watchlistr/id6459355223",
          variant: "primary",
        },
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.devzano.Watchlistr",
          variant: "secondary",
        },
        {
          label: "TestFlight",
          href: "https://testflight.apple.com/join/5fAq7d4d",
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
          intuitive design, powerful search tools, and smart watchlist management, Watchlistr makes it effortless to stay
          on top of your entertainment journey.
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
          <strong className="text-slate-100">Smart Search:</strong> Quickly find movies, shows, actors, or genres with a
          powerful search feature — complete with search history for fast access. View collections when available for
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
          “watched,” long-press to set reminders or toggle statuses, auto “New Episode” badges, sort by status/alpha/added
          date, and organize into folders.
        </>,
        <>
          <strong className="text-slate-100">Personalized Profile:</strong> Customize photo, text colors, light/dark
          mode, see counts &amp; notifications, choose default launch tab.
        </>,
        <>
          <strong className="text-slate-100">Secure Sign-In:</strong> Apple/Google auth with Firebase; try as a guest via
          a temp user.
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
  );
}