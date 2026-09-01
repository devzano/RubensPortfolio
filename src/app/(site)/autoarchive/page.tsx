// src/app/(site)/autoarchive/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import OnboardingView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_OnboardingView.png";
import OnboardingAddVehicleView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_OnboardingView_AddVehicle.png";
import HomeView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_HomeView.png";
import NearbyFuel from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_NearbyFuel.png";
import TripCenterView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_TripCenter.png";
import NewVehicleView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_NewVehicleView.png";
import VehicleDetailsView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_VehicleDetailsView.png";
import ServiceLogView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_ServiceLogView.png";

const versionHistory = [
  {
    version: "26.0",
    title: "26.0 Update",
    items: [
      "Added nearby EV charging station support alongside fuel stations.",
      "Added fuel receipt import and OCR improvements for faster fuel log entry.",
      "Added crowd fuel price reporting and community fuel profile settings.",
      "Added smarter trip tracking with trip drafts and review flows.",
      "Added document vault support for storing vehicle records in one place.",
      "Added automatic reminders for registration, inspection, and insurance expirations.",
      "Improved vehicle analytics with better oil life, battery age, brake, and fuel economy visibility.",
      "Improved exports and reporting for a cleaner vehicle history.",
      "Expanded CarPlay support and in-vehicle trip and fuel experiences.",
      "Refined onboarding, dark appearance, and the overall app interface.",
    ],
  },
  {
    version: "1.1",
    title: "1.1 Update",
    items: [
      "Vehicle profiles with VIN lookup for make, model, and year.",
      "Service records with cost, mileage, notes, and multiple photo attachments.",
      "Registration, insurance, inspection, oil life, fluids, tires, and battery tracking.",
      "Part number storage for filters, tires, brakes, and more.",
      "Compatible parts search based on vehicle details.",
      "Custom tags, notes, and maintenance reminders.",
    ],
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
          <p className="text-sm text-slate-400">View AutoArchive version history.</p>
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

  const screenshots = [
    OnboardingView,
    OnboardingAddVehicleView,
    HomeView,
    NearbyFuel,
    TripCenterView,
    NewVehicleView,
    VehicleDetailsView,
    ServiceLogView,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="AutoArchive"
      title="AutoArchive"
      titleLink="https://apps.apple.com/us/app/autoarchive/id6744589503"
      icon={AppImages.autoArchive}
      iconAlt="AutoArchive app icon"
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
          href: "https://apps.apple.com/us/app/autoarchive/id6744589503",
          variant: "primary",
        },
        {
          label: "Send Feedback",
          onClick: openFeedback,
          variant: "secondary",
        },
      ]}
      description={
        <div className="space-y-4 leading-relaxed">
          <p>
            <strong>
              <span className="text-(--accent)">AutoArchive</span>: Your Vehicle’s Digital Logbook
            </strong>
          </p>

          <p>
            Stay in control of your vehicle with AutoArchive, the all-in-one app for
            service records, fuel logs, trip tracking, reminders, documents, and
            important vehicle details. Whether you track one car or manage a small
            fleet, AutoArchive keeps everything organized, searchable, and easy to
            review.
          </p>

          <p>
            From oil changes and tire rotations to fuel receipts, nearby fuel prices,
            trip drafts, part numbers, and renewal dates, AutoArchive helps you keep a
            complete digital history for every vehicle in one place.
          </p>

          <p>
            AutoArchive helps replace scattered notes, paper receipts, and glovebox
            clutter with one organized digital record for your vehicle.
          </p>

          <WhatsNewSection />
        </div>
      }
      featureTitle="Key Features"
      features={[
        <>
          Create detailed vehicle profiles with VIN lookup to quickly populate make,
          model, and year.
        </>,
        <>
          Log service records with cost, mileage, notes, and multiple photo
          attachments.
        </>,
        <>Track fuel fill-ups, fuel costs, mileage, and receipt details.</>,
        <>
          Import and scan fuel receipts with OCR to automatically pull useful fuel log
          information.
        </>,
        <>Discover nearby fuel and EV charging stations on the map.</>,
        <>
          View station details, report fuel prices, and help keep community pricing up
          to date.
        </>,
        <>
          Track trips automatically or manually, review trip drafts, and keep trip
          history organized.
        </>,
        <>
          Save Home, Work, and other places to support smarter trip prompts and tracking
          flows.
        </>,
        <>
          Monitor registration, insurance, inspection, oil life, fluid levels, tire
          pressure, battery age, brake condition, and fuel economy.
        </>,
        <>
          Store part numbers for filters, tires, brakes, batteries, and more, and search
          for compatible parts based on your vehicle.
        </>,
        <>
          Save documents and important records in one place with a built-in document
          vault.
        </>,
        <>
          Export reports for cleaner records, maintenance history, and easier sharing.
        </>,
        <>
          Add reminders for maintenance, renewals, and other vehicle tasks, including
          automatic expiration reminders for key legal dates.
        </>,
        <>
          Use CarPlay support for in-vehicle access to key driving and fuel-related
          experiences.
        </>,
      ]}
      builtWith={[
        {
          src: AppImages.githubLight,
          alt: "GitHub",
          href: "https://github.com/devzano",
        },
        {
          src: AppImages.xcode,
          alt: "Xcode",
          href: "https://developer.apple.com/xcode/",
        },
        {
          src: AppImages.swiftui,
          alt: "SwiftUI",
          href: "https://developer.apple.com/xcode/swiftui/",
        },
        {
          src: AppImages.termsConditions,
          alt: "Terms",
          onClick: () => router.push("/autoarchive/terms"),
        },
        {
          src: AppImages.privacyPolicy,
          alt: "Privacy",
          onClick: () => router.push("/autoarchive/privacy"),
        },
      ]}
    />
  );
}