// app/(site)/starship-pixelscape/page.tsx
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MainMenuView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_MainMenuView.png";
import GameSettingsView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GameSettingsView.png";
import GameSettings2View from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GameSettings2View.png";
import GamePlayView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GamePlayView.png";
import GamePlay2View from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GamePlay2View.png";
import GamePlay3View from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GamePlay3View.png";
import GamePlayBossView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GamePlayBossView.png";
import GameOverView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GameOverView.png";
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
      MainMenuView,
      GameSettingsView,
      GameSettings2View,
      GamePlayView,
      GamePlay2View,
      GamePlay3View,
      GamePlayBossView,
      GameOverView,
    ],
    []
  );
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({ firstName: "", lastName: "", email: "", message: "" });

  const handleAppleStoreButtonClick = () =>
    window.open("https://apps.apple.com/us/app/starship-pixelscape/id6741517533", "_blank");

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appName: "Starship Pixelscape",
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

  const BuiltWithLogos = [
    { src: AppImages.githubLight, alt: "GitHub", link: "https://github.com/devzano" },
    { src: AppImages.xcode, alt: "Xcode", link: "https://developer.apple.com/xcode/" },
    { src: AppImages.swiftui, alt: "SwiftUI", link: "https://developer.apple.com/xcode/swiftui/" },
    { src: AppImages.privacyPolicy, alt: "Privacy Policy", onClick: () => router.push("/starship-pixelscape/privacy") },
    { src: AppImages.termsConditions, alt: "Terms and Conditions", onClick: () => router.push("/starship-pixelscape/terms") },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <ProjectHeader
        title="Starship Pixelscape"
        titleLink="https://apps.apple.com/us/app/starship-pixelscape/id6741517533"
        showArrows={showArrows}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        actions={[
          { label: "Apple Store", onClick: handleAppleStoreButtonClick, variant: "primary" },
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
                Blast off into a retro-styled, action-packed adventure with{" "}
                <span className="text-sky-400">Starship Pixelscape</span>
              </strong>{" "}
              — dodge meteors, battle UFOs, and take down colossal bosses while chasing top leaderboard scores.
            </p>

            <div className="mt-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-100">Features</h3>
              <ul className="list-disc space-y-2 pl-6 text-slate-300 marker:text-sky-400">
                <li>
                  <strong className="text-slate-100">Choose Your Spaceship:</strong> Pick from unique ships and play your way.
                </li>
                <li>
                  <strong className="text-slate-100">Shoot Meteors:</strong> Endless cosmic storm—survive and score higher.
                </li>
                <li>
                  <strong className="text-slate-100">Intuitive Controls:</strong> Drag or classic joystick.
                </li>
                <li>
                  <strong className="text-slate-100">Power-ups:</strong> Boost abilities to turn the tide.
                </li>
                <li>
                  <strong className="text-slate-100">Enemy UFOs & Bosses:</strong> Fast dogfights and epic showdowns.
                </li>
                <li>
                  <strong className="text-slate-100">Leaderboard:</strong> Compete for the Top-10!
                </li>
              </ul>
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
        onSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        appName="Starship Pixelscape"
      />
    </div>
  );
}
