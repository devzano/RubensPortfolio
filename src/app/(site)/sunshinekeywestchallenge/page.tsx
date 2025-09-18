// app/(site)/sunshinekeywestchallenge/page.tsx
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Home from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Home.png";
import Contact from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Contact.png";
import Events from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Events.png";
import Maps from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Maps.png";
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

  const screenshots = useMemo(() => [Home, Contact, Events, Maps], []);

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleAppleStoreButtonClick = () =>
    window.open("https://apps.apple.com/us/app/sunshine-key-west-challenge/id6737530954", "_blank");
  const handlePlayStoreButtonClick = () =>
    window.open("https://play.google.com/store/apps/details?id=com.devzano.SunshineKeyWestChallenge", "_blank");

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appName: "Sunshine Key West Challenge",
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
    { src: AppImages.reactnative, alt: "React Native", link: "https://reactnative.dev/" },
    { src: AppImages.expo, alt: "Expo", link: "https://docs.expo.dev/" },
    { src: AppImages.firebase, alt: "Firebase", link: "https://firebase.google.com/" },
    { src: AppImages.privacyPolicy, alt: "Privacy Policy", onClick: () => router.push("/sunshinekeywestchallenge/privacy") },
    { src: AppImages.termsConditions, alt: "Terms and Conditions", onClick: () => router.push("/sunshinekeywestchallenge/terms") },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <ProjectHeader
        title="SKWC"
        titleLink="https://apps.apple.com/us/app/sunshine-key-west-challenge/id6737530954"
        showArrows={showArrows}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        actions={[
          { label: "Apple Store", onClick: handleAppleStoreButtonClick, variant: "primary" },
          { label: "Play Store", onClick: handlePlayStoreButtonClick, variant: "secondary" },
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
                Experience the excitement and heart of the{" "}
                <span className="text-sky-400">Sunshine Key West Challenge</span>
              </strong>{" "}
              — a cherished annual fishing tournament supporting the Diabetes Research Institute’s mission to find a
              cure for Type 1 diabetes. Stay connected to the tournament’s purpose, schedule, and community right from
              your fingertips.
            </p>

            <div className="mt-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-100">Features</h3>
              <ul className="list-disc space-y-2 pl-6 text-slate-300 marker:text-sky-400">
                <li>
                  <strong className="text-slate-100">Tournament History:</strong> Learn the inspiring story behind the
                  event and its mission-driven partnership.
                </li>
                <li>
                  <strong className="text-slate-100">Event Schedule:</strong> Access a detailed, easy-to-follow schedule
                  so you never miss a moment.
                </li>
                <li>
                  <strong className="text-slate-100">Exclusive Auction Items:</strong> Browse unique listings that
                  support the charitable cause.
                </li>
                <li>
                  <strong className="text-slate-100">Photo Gallery:</strong> Relive memorable moments with a collection
                  of angler photos.
                </li>
                <li>
                  <strong className="text-slate-100">Nearby Recommendations:</strong> Discover food spots and local
                  recommendations near the event.
                </li>
                <li>
                  <strong className="text-slate-100">Community Spirit:</strong> Connect to the passion and camaraderie
                  that make this event special.
                </li>
              </ul>

              <p className="mt-4 text-slate-300">
                <strong className="text-slate-100">A community united for a cause</strong> — celebrating the sport, the
                spirit, and the mission to make a difference.
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
        appName="Sunshine Key West Challenge"
      />
    </div>
  );
}