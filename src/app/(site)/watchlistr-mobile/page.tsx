// app/(site)/watchlistr-mobile/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

import FeedbackModal from "@/components/MailForm/FeedbackModal";
import AppImages from "@/constants/images";
import { Feedback, SlideNavProps } from "@/types/types";

export default function Page({
  showArrows = false,
  nextSlide = () => { },
  prevSlide = () => { },
}: SlideNavProps) {
  const screenshots = useMemo(
    () => [
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
    ],
    []
  );

  const [currentSet, setCurrentSet] = useState(0);
  const [imagesPerSet, setImagesPerSet] = useState(4); // 4 desktop, 2 mobile
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({ firstName: "", lastName: "", email: "", message: "" });

  const router = useRouter();

  // responsive columns (2 on <=768px, else 4)
  useEffect(() => {
    const compute = () => setImagesPerSet(window.innerWidth <= 768 ? 2 : 4);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // auto-rotate sets
  useEffect(() => {
    if (!screenshots.length) return;
    const maxSets = Math.ceil(screenshots.length / imagesPerSet);
    const id = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % maxSets);
    }, 4000);
    return () => clearInterval(id);
  }, [screenshots.length, imagesPerSet]);

  const handleAppleStoreButtonClick = () =>
    window.open("https://apps.apple.com/us/app/watchlistr/id6459355223", "_blank");
  const handleTestFlightButtonClick = () =>
    window.open("https://testflight.apple.com/join/5fAq7d4d", "_blank");
  const handlePlayStoreButtonClick = () =>
    window.open("https://play.google.com/store/apps/details?id=com.devzano.Watchlistr", "_blank");

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appName: "Watchlistr",
          firstName: feedback.firstName,
          lastName: feedback.lastName,
          email: feedback.email,
          message: feedback.message,
        }),
      });
      if (response.ok) {
        alert("Feedback sent successfully!");
        setIsFeedbackModalOpen(false);
        setFeedback({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        alert("Failed to send feedback. Please try again later.");
      }
    } catch {
      alert("Error sending feedback. Please try again later.");
    }
  };

  const start = currentSet * imagesPerSet;
  const visible = screenshots.slice(start, start + imagesPerSet);

  const BuiltWithLogos = [
    { src: AppImages.githubLight, alt: "GitHub Logo", link: "https://github.com/devzano" },
    { src: AppImages.xcode, alt: "Xcode Logo", link: "https://developer.apple.com/xcode/" },
    { src: AppImages.swiftui, alt: "SwiftUI Logo", link: "https://developer.apple.com/xcode/swiftui/" },
    { src: AppImages.expo, alt: "Expo Logo", link: "https://docs.expo.dev/" },
    { src: AppImages.firebase, alt: "Firebase Logo", link: "https://firebase.google.com/" },
    { src: AppImages.termsConditions, alt: "Terms and Conditions", onClick: () => router.push("/watchlistr-mobile/terms") },
    { src: AppImages.privacyPolicy, alt: "Privacy Policy", onClick: () => router.push("/watchlistr-mobile/privacy") },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* Title + Arrows */}
      <div className="mb-8 flex w-full items-center justify-center">
        <div className="flex max-w-full flex-nowrap items-center gap-4">
          {/* Left chevron */}
          <button
            className={`h-12 w-12 shrink-0 rounded-full border border-white/10 bg-white/5 text-slate-200 shadow-lg shadow-black/20 backdrop-blur-md transition hover:scale-110 hover:text-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 ${showArrows ? "" : "invisible"}`}
            onClick={prevSlide}
            aria-label="Previous Project"
          >
            <span className="select-none text-3xl leading-none">‹</span>
          </button>

          {/* Title */}
          <h1 className="relative min-w-0 text-center">
            <a
              href="https://watchlistr.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex max-w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 shadow-lg shadow-black/20 ring-1 ring-white/10 backdrop-blur-md"
            >
              <span className="bg-gradient-to-br from-sky-300 via-sky-400 to-violet-400 bg-clip-text text-transparent text-2xl font-semibold tracking-tight sm:text-3xl whitespace-nowrap">
                Watchlistr
              </span>
              {/* tiny ↗ hint (hide on xs to save space) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="ml-2 hidden h-4 w-4 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 sm:block"
              >
                <path
                  d="M7 17L17 7M9 7h8v8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* subtle gradient underline */}
            <span className="pointer-events-none absolute inset-x-8 -bottom-1 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
          </h1>

          {/* Right chevron */}
          <button
            className={`h-12 w-12 shrink-0 rounded-full border border-white/10 bg-white/5 text-slate-200 shadow-lg shadow-black/20 backdrop-blur-md transition hover:scale-110 hover:text-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 ${showArrows ? "" : "invisible"}`}
            onClick={nextSlide}
            aria-label="Next Project"
          >
            <span className="select-none text-3xl leading-none">›</span>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handleAppleStoreButtonClick}
          className="rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5 hover:shadow-indigo-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
        >
          Apple Store
        </button>
        <button
          onClick={handlePlayStoreButtonClick}
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 shadow-lg shadow-black/20 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
        >
          Play Store
        </button>
        <button
          onClick={handleTestFlightButtonClick}
          className="rounded-full bg-gradient-to-br from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5 hover:shadow-blue-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
        >
          TestFlight
        </button>
        <button
          onClick={() => setIsFeedbackModalOpen(true)}
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 shadow-lg shadow-black/20 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
        >
          Send Feedback
        </button>
      </div>

      <p className="mb-6 text-center italic text-sky-400/90">
        for the full iOS experience of Watchlistr tap TestFlight!
      </p>

      {/* Card */}
      <div className="mx-auto w-full">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-md ring-1 ring-white/10">
          {/* Screenshots grid */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4 shadow-inner">
            <div className={`mx-auto grid max-w-5xl gap-4 ${imagesPerSet === 2 ? "grid-cols-2" : "grid-cols-4"}`}>
              {visible.map((src, i) => (
                <div key={i} className="relative aspect-[9/19] overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  <Image
                    src={src}
                    alt={`Watchlistr View ${start + i + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 45vw, 240px"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Copy */}
          <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-lg shadow-black/20">
            <p className="leading-relaxed">
              <strong className="font-semibold text-sky-400">
                Discover and track your favorite movies and shows with <span className="text-sky-400">Watchlistr</span>
              </strong>{" "}
              — your personalized hub for keeping up with the latest releases, hidden gems, and timeless classics. With an intuitive
              design, powerful search tools, and smart watchlist management, Watchlistr makes it effortless to stay on top of your
              entertainment journey.
            </p>

            <div className="mt-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-100">Features</h3>
              <ul className="list-disc space-y-2 pl-6 text-slate-300 marker:text-sky-400">
                <li>
                  <strong className="text-slate-100">Browse &amp; Discover:</strong> Explore the latest blockbusters, classic films,
                  and binge-worthy series. Enjoy curated lists, streaming service breakdowns, and dedicated TV show sections
                  highlighting what’s airing today and tomorrow. Sort your content your way with flexible sorting options.
                </li>
                <li>
                  <strong className="text-slate-100">Smart Search:</strong> Quickly find movies, shows, actors, or genres with a
                  powerful search feature — complete with search history for fast access. View collections when available for movies
                  and preview genre-based media selections.
                </li>
                <li>
                  <strong className="text-slate-100">Detailed Media Info:</strong> Tap into rich details for any title — from episode
                  counts to streaming availability. Jump directly into streaming apps (if installed) or view details on TMDB. Easily
                  explore collections, discover related media through cast connections, and enjoy smart suggestions.
                </li>
                <li>
                  <strong className="text-slate-100">Share Your Favorites:</strong> Share media directly from its detail page. The
                  recipient is taken straight to the media’s page within the app for seamless sharing and discovery.
                </li>
                <li>
                  <strong className="text-slate-100">Custom Notifications:</strong> Stay in the loop with reminders for new releases,
                  upcoming episodes, or rewatch plans — all delivered with a unique notification sound.
                </li>
                <li>
                  <strong className="text-slate-100">Manage Your Watchlist:</strong> Mark movies or individual episodes as “watched,”
                  long-press to set reminders or toggle statuses, auto “New Episode” badges, sort by status/alpha/added date, and
                  organize into folders.
                </li>
                <li>
                  <strong className="text-slate-100">Personalized Profile:</strong> Customize photo, text colors, light/dark mode,
                  see counts & notifications, choose default launch tab.
                </li>
                <li>
                  <strong className="text-slate-100">Secure Sign-In:</strong> Apple/Google auth with Firebase; try as a guest via a
                  temp user.
                </li>
              </ul>

              <p className="mt-4 text-slate-300">
                <strong className="text-slate-100">Embark on your cinematic journey</strong> — track, discover, and enjoy like never
                before!
              </p>
            </div>
          </div>

          {/* Built with */}
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-4">
            {BuiltWithLogos.map((logo, index) => {
              const img = (
                <Image
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  width={44}
                  height={44}
                  className="h-11 w-11 select-none rounded-md object-contain opacity-90 grayscale transition hover:scale-105 hover:opacity-100 hover:grayscale-0"
                  draggable={false}
                />
              );
              return (
                <span key={index} className="inline-block">
                  {logo.link ? (
                    <Link href={logo.link} target="_blank">
                      {img}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={logo.onClick as () => void}
                      className="cursor-pointer"
                      aria-label={logo.alt}
                      title={logo.alt}
                    >
                      {img}
                    </button>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feedback Modal only (Privacy/Terms come from @modal routes) */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        appName="Watchlistr(Mobile)"
      />
    </div>
  );
}