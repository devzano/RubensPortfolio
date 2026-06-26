// app/(site)/sunshinekeywestchallenge/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import Home from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Home.png";
import Contact from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Contact.png";
import Events from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Events.png";
import Maps from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Maps.png";

const versionHistory = [
  {
    version: "26.1",
    title: "26.1 Update",
    items: [
      "Improved photo uploads for a smoother tournament experience.",
      "Strengthened app performance throughout the event.",
      "Added a more helpful first-time setup for notifications, location, and photo access.",
      "Bug fixes and overall improvements.",
    ],
  },
  {
    version: "1.0.2",
    title: "1.0.2 Update",
    items: [
      "Performance enhancements and bug fixes.",
      "Redesigned interface with a refreshed, modern look.",
      "Push notifications for tournament news, schedule changes, and event alerts.",
      "Added a feedback center for in-app suggestions.",
      "Added photo uploads for the official SKWC gallery.",
    ],
  },
  {
    version: "1.0.1",
    title: "1.0.1 Update",
    items: ["View magazine in-app.", "Bug fixes."],
  },
  {
    version: "1.0",
    title: "1.0 Release",
    items: ["Initial release."],
  },
];

function WhatsNewSection() {
  const [selectedVersion, setSelectedVersion] = useState(versionHistory[0].version);

  const selected = useMemo(
    () => versionHistory.find((item) => item.version === selectedVersion) ?? versionHistory[0],
    [selectedVersion]
  );

  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/4 p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">What’s New</h3>
          <p className="text-sm text-slate-400">View SKWC version history.</p>
        </div>

        <select
          value={selectedVersion}
          onChange={(event) => setSelectedVersion(event.target.value)}
          className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm font-semibold text-white outline-none transition hover:border-white/20 focus:border-(--accent)"
        >
          {versionHistory.map((item) => (
            <option key={item.version} value={item.version}>
              Version {item.version}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <h4 className="mb-3 text-lg font-bold text-white">{selected.title}</h4>

        <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
          {selected.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [Home, Contact, Events, Maps];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Sunshine Key West Challenge"
      title="SKWC"
      titleLink="https://apps.apple.com/us/app/sunshine-key-west-challenge/id6737530954"
      icon={AppImages.sunshineKeyWestChallenge}
      iconAlt="SunshineKeyWestChallenge app icon"
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
          href: "https://apps.apple.com/us/app/sunshine-key-west-challenge/id6737530954",
          variant: "primary",
        },
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.devzano.SunshineKeyWestChallenge",
          variant: "secondary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <div className="space-y-4 leading-relaxed">
          <p>
            <strong>
              Experience the excitement and heart of the{" "}
              <span className="text-var(--accent)">Sunshine Key West Challenge</span>
            </strong>{" "}
            — a cherished annual fishing tournament supporting the Diabetes Research
            Institute’s mission to find a cure for Type 1 diabetes. Stay connected to
            the tournament’s purpose, schedule, and community right from your fingertips.
          </p>

          <WhatsNewSection />
        </div>
      }
      featureTitle="Features"
      features={[
        <>
          <strong className="text-slate-100">Tournament History:</strong> Learn the inspiring story
          behind the event and its mission-driven partnership.
        </>,
        <>
          <strong className="text-slate-100">Event Schedule:</strong> Access a detailed,
          easy-to-follow schedule so you never miss a moment.
        </>,
        <>
          <strong className="text-slate-100">Exclusive Auction Items:</strong> Browse unique
          listings that support the charitable cause.
        </>,
        <>
          <strong className="text-slate-100">Photo Gallery:</strong> Relive memorable moments with a
          collection of angler photos.
        </>,
        <>
          <strong className="text-slate-100">Nearby Recommendations:</strong> Discover food spots
          and local recommendations near the event.
        </>,
        <>
          <strong className="text-slate-100">Community Spirit:</strong> Connect to the passion and
          camaraderie that make this event special.
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.reactnative, alt: "React Native", href: "https://reactnative.dev/" },
        { src: AppImages.expo, alt: "Expo", href: "https://docs.expo.dev/" },
        { src: AppImages.firebase, alt: "Firebase", href: "https://firebase.google.com/" },
        {
          src: AppImages.privacyPolicy,
          alt: "Privacy Policy",
          onClick: () => router.push("/sunshinekeywestchallenge/privacy"),
        },
        {
          src: AppImages.termsConditions,
          alt: "Terms and Conditions",
          onClick: () => router.push("/sunshinekeywestchallenge/terms"),
        },
      ]}
    />
  );
}