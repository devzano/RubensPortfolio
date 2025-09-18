// src/app/(site)/logiqo/page.tsx
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogiqoHomeView_iOS from "@/components/Projects/Logiqo/Screenshots/HomeView_iOS.png";
import LogiqoDailyView_iOS from "@/components/Projects/Logiqo/Screenshots/DailyView_iOS.png";
import LogiqoProfileView_iOS from "@/components/Projects/Logiqo/Screenshots/ProfileView_iOS.png";
import LogiqoProfileCustomColorView_iOS from "@/components/Projects/Logiqo/Screenshots/ProfileCustomColorView_iOS.png";
import LogiqoHomeView_Android from "@/components/Projects/Logiqo/Screenshots/HomeView_Android.jpg";
import LogiqoDailyView_Android from "@/components/Projects/Logiqo/Screenshots/DailyView_Android.jpg";
import LogiqoProfileView_Android from "@/components/Projects/Logiqo/Screenshots/ProfileView_Android.jpg";
import LogiqoProfileCustomColorView_Android from "@/components/Projects/Logiqo/Screenshots/ProfileCustomColorView_Android.jpg";
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
  const screenshots = useMemo(
    () => [
      LogiqoHomeView_iOS,
      LogiqoDailyView_iOS,
      LogiqoProfileView_iOS,
      LogiqoProfileCustomColorView_iOS,
      LogiqoHomeView_Android,
      LogiqoDailyView_Android,
      LogiqoProfileView_Android,
      LogiqoProfileCustomColorView_Android,
    ],
    []
  );
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleAppleStore = () =>
    window.open("https://apps.apple.com/us/app/Logiqo/id6752290923", "_blank");
  const handlePlayStore = () =>
    window.open("https://play.google.com/store/apps/details?id=com.devzano.Logiqo", "_blank");

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName: "Logiqo", ...feedback }),
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
    { src: AppImages.githubLight, alt: "GitHub", link: "https://github.com/devzano" },
    { src: AppImages.xcode, alt: "Xcode", link: "https://developer.apple.com/xcode/" },
    { src: AppImages.swiftui, alt: "SwiftUI", link: "https://developer.apple.com/xcode/swiftui/" },
    { src: AppImages.expo, alt: "Expo", link: "https://docs.expo.dev/" },
    { src: AppImages.firebase, alt: "Firebase", link: "https://firebase.google.com/" },
    { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/logiqo/terms") },
    { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/logiqo/privacy") },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <ProjectHeader
        title="Logiqo"
        titleLink="https://apps.apple.com/us/app/logiqo/id6752290923"
        showArrows={showArrows}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        actions={[
          { label: "Apple Store", onClick: handleAppleStore, variant: "primary" },
          { label: "Play Store", onClick: handlePlayStore, variant: "secondary" },
          { label: "Send Feedback", onClick: () => setIsFeedbackModalOpen(true), variant: "secondary" },
        ]}
      />

      <div className="mx-auto w-full">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-md ring-1 ring-white/10">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4 shadow-inner">
            <ScreenshotGridRotator
              images={screenshots}
              intervalMs={4000}
              cols={{ mobile: 2, desktop: 4 }}
              aspect="9/19"
              sizes="(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 240px"
              deferUntilMounted
            />
          </div>

          <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-lg shadow-black/20">
            <p className="leading-relaxed">
              <strong className="font-semibold text-sky-400">
                Sharpen your mind with puzzles and classic board games —{" "}
                <span className="text-sky-400">Logiqo</span>
              </strong>{" "}
              brings together Sudoku, Word Search, Chess, Checkers, Minesweeper and more in a sleek, modern app.
            </p>

            <div className="mt-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-100">Highlights</h3>
              <ul className="list-disc space-y-2 pl-6 text-slate-300 marker:text-sky-400">
                <li>
                  <strong className="text-slate-100">Daily puzzles &amp; streaks:</strong> Fresh challenges to keep you
                  coming back.
                </li>
                <li>
                  <strong className="text-slate-100">Save &amp; continue:</strong> Pick up right where you left off.
                </li>
                <li>
                  <strong className="text-slate-100">Custom colors:</strong> Personalize the look and feel.
                </li>
                <li>
                  <strong className="text-slate-100">Helpful hints:</strong> Nudge past tricky moments.
                </li>
                <li>
                  <strong className="text-slate-100">Distraction-free design:</strong> A smooth UI focused on play.
                </li>
              </ul>

              <p className="mt-4 text-slate-300">
                <strong className="text-slate-100">Start your streak today</strong> — quick brain-teasers or deep
                strategy, in your pocket.
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
                  {"link" in logo ? (
                    <Link href={logo.link!} target="_blank">
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
        onSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        appName="Logiqo"
      />
    </div>
  );
}