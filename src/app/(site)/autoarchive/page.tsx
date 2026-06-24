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
      "Expanded fuel logging with receipt details, photo attachments, and e-receipt imports.",
      "Fuel receipt scanning to automatically capture useful fill-up details.",
      "Nearby fuel and EV charging stations on the map.",
      "Station details, fuel price reporting, and crowd pricing support.",
      "Trip tracking with automatic/manual options, trip drafts, and organized trip history.",
      "Document vault for storing important vehicle records.",
      "Cleaner report exports for vehicle history records.",
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

  const screenshots = [OnboardingView, OnboardingAddVehicleView, HomeView, NearbyFuel, TripCenterView, NewVehicleView, VehicleDetailsView, ServiceLogView];

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
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <div className="space-y-4 leading-relaxed">
          <p>
            <strong>
              <span className="text-(--accent)">AutoArchive</span>: Your Vehicle’s Digital Logbook
            </strong>
          </p>

          <p>
            Stay in control of your car care with AutoArchive — the all-in-one app for
            managing vehicle maintenance, fuel logs, trip tracking, reminders,
            documents, and important vehicle details. Whether you're tracking one car
            or a small fleet, AutoArchive keeps everything organized, searchable, and
            easy to review.
          </p>

          <p>
            From oil changes and tire rotations to fuel receipts, nearby gas prices,
            trip drafts, part numbers, and renewal dates, AutoArchive helps you keep a
            complete history of your vehicle in one place.
          </p>

          <WhatsNewSection />
        </div>
      }
      featureTitle="Key Features"
      features={[
        <>Create detailed vehicle profiles with VIN lookup for make, model, and year.</>,
        <>Log service records with cost, mileage, notes, and multiple photo attachments.</>,
        <>Track fuel fill-ups, costs, mileage, receipts, and e-receipt imports.</>,
        <>Scan fuel receipts to automatically capture useful fuel log details.</>,
        <>Discover nearby fuel and EV charging stations on the map.</>,
        <>View station details, report fuel prices, and support crowd pricing.</>,
        <>Track trips automatically or manually, review drafts, and organize trip history.</>,
        <>Monitor registration, insurance, inspection, oil life, fluids, tires, and battery status.</>,
        <>Store part numbers and search for compatible parts based on your vehicle.</>,
        <>Save documents and important records in the built-in document vault.</>,
        <>Export reports for a cleaner, searchable vehicle history.</>,
        <>Add custom tags, notes, and reminders for maintenance, renewals, and more.</>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
        { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
        { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/autoarchive/terms") },
        { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/autoarchive/privacy") },
      ]}
    />
  );
}