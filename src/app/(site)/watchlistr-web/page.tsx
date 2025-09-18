// app/(site)/watchlistr-web/page.tsx
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoginPage from "@/components/Projects/Watchlistr-Web/Screenshots/WatchlistrWeb_LoginPage.png";
import SignupPage from "@/components/Projects/Watchlistr-Web/Screenshots/WatchlistrWeb_SignupPage.png";
import HomePage from "@/components/Projects/Watchlistr-Web/Screenshots/WatchlistrWeb_HomePage.png";
import MoviesPage from "@/components/Projects/Watchlistr-Web/Screenshots/WatchlistrWeb_MoviesPage.png";
import TVShowsPage from "@/components/Projects/Watchlistr-Web/Screenshots/WatchlistrWeb_TVShowsPage.png";
import FeedbackModal from "@/components/MailForm/FeedbackModal";
import AppImages from "@/constants/images";
import { Feedback, SlideNavProps } from "@/types/types";
import ScreenshotGridRotator from "@/components/Projects/ScreenshotGridRotator";
import ProjectHeader from "@/components/Projects/ProjectHeader";

export default function Page({
  showArrows = false,
  nextSlide = () => { },
  prevSlide = () => { },
}: SlideNavProps) {
  const router = useRouter();
  const screens = useMemo(() => [LoginPage, SignupPage, HomePage, MoviesPage, TVShowsPage], []);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendMail", {
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
      if (res.ok) {
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

  const BuiltWithLogos = [
    { src: AppImages.githubLight, alt: "GitHub Logo", link: "https://github.com/devzano" },
    { src: AppImages.vs, alt: "Xcode Logo", link: "https://developer.apple.com/xcode/" },
    { src: AppImages.react, alt: "SwiftUI Logo", link: "https://developer.apple.com/xcode/swiftui/" },
    { src: AppImages.firebase, alt: "Firebase Logo", link: "https://firebase.google.com/" },
    { src: AppImages.vite, alt: "Expo Logo", link: "https://docs.expo.dev/" },
    { src: AppImages.javascript, alt: "Expo Logo", link: "https://docs.expo.dev/" },
    { src: AppImages.termsConditions, alt: "Terms and Conditions", onClick: () => router.push("/watchlistr-web/terms") },
    { src: AppImages.privacyPolicy, alt: "Privacy Policy", onClick: () => router.push("/watchlistr-web/privacy") },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <ProjectHeader
        title="Watchlistr"
        titleLink="https://watchlistr.app"
        showArrows={showArrows}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        actions={[
          {
            label: "Landing Page",
            href: "https://www.watchlistr.app/",
            external: true,
            variant: "primary",
          },
          {
            label: "Send Feedback",
            onClick: () => setIsFeedbackModalOpen(true),
            variant: "secondary",
          },
        ]}
      />

      <div className="mx-auto w-full">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-md ring-1 ring-white/10">
          <ScreenshotGridRotator
            images={screens}
            variant="web"
            webAspect="16/9"
            webSizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            fit="cover"
            intervalMs={4000}
            showArrows
          />

          <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-lg shadow-black/20">
            <p className="leading-relaxed">
              <strong className="font-semibold text-sky-400">
                Enhance your entertainment experience with{" "}
                <span className="text-sky-400">Watchlistr</span>
              </strong>{" "}
              — a platform designed to help you track, discover, and organize your
              favorite Movies and TV Shows across web and iOS. What began as a
              personal web project has now evolved into a seamless, integrated
              experience between the{" "}
              <a
                href="https://www.watchlistr.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline-offset-4 hover:underline"
              >
                web platform
              </a>{" "}
              and the{" "}
              <a
                href="https://www.rubenmanzano.com/watchlistr-ios"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline-offset-4 hover:underline"
              >
                iOS app
              </a>
              , allowing you to stay connected to your watchlist anywhere.
            </p>

            <div className="mt-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-100">Features</h3>
              <ul className="list-disc space-y-2 pl-6 text-slate-300 marker:text-sky-400">
                <li>
                  <strong className="text-slate-100">Unified Experience:</strong> Log in
                  or create an account on either platform — your watchlists stay in sync
                  between the web and mobile apps.
                </li>
                <li>
                  <strong className="text-slate-100">Personal Watchlists:</strong> Build
                  and manage your own custom watchlists. Keep track of the movies and
                  shows you&apos;re watching, have finished, or plan to watch.
                </li>
                <li>
                  <strong className="text-slate-100">Discover New Content:</strong>{" "}
                  Browse upcoming releases, explore popular picks, and check out
                  top-rated titles, all in one place.
                </li>
                <li>
                  <strong className="text-slate-100">Streaming Availability:</strong>{" "}
                  Quickly find out where your favorite movies and shows are available to
                  stream or rent.
                </li>
                <li>
                  <strong className="text-slate-100">Intuitive Browsing:</strong> Sort
                  and filter content to explore the latest blockbusters and hidden gems
                  across genres.
                </li>
                <li>
                  <strong className="text-slate-100">Seamless Account Integration:</strong>{" "}
                  Whether on desktop or mobile, your watchlist and preferences stay
                  consistent for a hassle-free viewing experience.
                </li>
              </ul>

              <p className="mt-4 text-slate-300">
                <strong className="text-slate-100">Why Watchlistr?</strong> Empower
                yourself to never miss out on the movies and TV shows you love.
              </p>
            </div>
          </div>

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

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={async (e) => {
          await handleFeedbackSubmit(e);
        }}
        feedback={feedback}
        setFeedback={setFeedback}
        appName="Watchlistr(Web)"
      />
    </div>
  );
}