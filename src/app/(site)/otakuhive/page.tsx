// app/(site)/otakuhive/page.tsx
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MangaDetailView from "@/components/Projects/OtakuHive/Screenshots/OtakuHive_MangaDetailView.png";
import FullScreenReader from "@/components/Projects/OtakuHive/Screenshots/OtakuHive_FullScreenReader.png";
import SavedView from "@/components/Projects/OtakuHive/Screenshots/OtakuHive_SavedView.png";
import SearchView from "@/components/Projects/OtakuHive/Screenshots/OtakuHive_SearchView.png";
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
  const screenshots = useMemo(() => [
    MangaDetailView,
    FullScreenReader,
    SavedView,
    SearchView
  ], []);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const handleTestFlight = () => window.open("https://testflight.apple.com/join/sRsqfd9y", "_blank");

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName: "OtakuHive", ...feedback }),
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
    { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/otakuhive/terms") },
    { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/otakuhive/privacy") },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <ProjectHeader
        title="OtakuHive"
        titleLink="https://testflight.apple.com/join/sRsqfd9y"
        showArrows={showArrows}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        actions={[
          { label: "TestFlight", onClick: () => window.open("https://testflight.apple.com/join/sRsqfd9y", "_blank"), variant: "accent" },
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
                Discover a world of manga with <span className="text-sky-400">OtakuHive</span>
              </strong>{" "}
              — a sleek, powerful reader that connects directly to MangaDex for a massive, always-fresh catalog.
            </p>

            <div className="mt-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-100">Features</h3>
              <ul className="list-disc space-y-2 pl-6 text-slate-300 marker:text-sky-400">
                <li><strong className="text-slate-100">Powered by MangaDex:</strong> Real-time access to a huge library.</li>
                <li><strong className="text-slate-100">Random & Latest:</strong> Discover surprises or jump into the newest drops.</li>
                <li><strong className="text-slate-100">Smart Search:</strong> Quickly find any title by name.</li>
                <li><strong className="text-slate-100">Saved Manga:</strong> Bookmark favorites for instant access.</li>
                <li><strong className="text-slate-100">Reading Progress:</strong> Bookmarks remember your exact page and auto-scroll on reopen.</li>
              </ul>

              <p className="mt-4 text-slate-300">
                <strong className="text-slate-100">Your next manga obsession awaits.</strong>
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
        onSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        appName="OtakuHive"
      />
    </div>
  );
}