// src/app/(site)/autoarchive/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import HomeView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_HomeView.png";
import NewVehicleView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_NewVehicleView.png";
import VehicleDetailsView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_VehicleDetailsView.png";
import ServiceLogView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_ServiceLogView.png";

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [HomeView, NewVehicleView, VehicleDetailsView, ServiceLogView];

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
        <p className="leading-relaxed">
          <strong>
            Stay in control of your car care with <span className="text-[color:var(--accent)]">AutoArchive</span>
          </strong>{" "}
          — your all-in-one app for managing vehicles, maintenance, and service records in one clean place.
        </p>
      }
      featureTitle="Highlights"
      features={[
        <>Create vehicle profiles; auto-fill make/model/year with VIN.</>,
        <>Log services with cost, mileage, notes, and multiple photos.</>,
        <>Track registration, inspection, insurance, oil life, tire pressure, and more.</>,
        <>Save part numbers for filters, tires, brakes, etc.</>,
        <>Organize with custom tags and notes; set flexible reminders.</>,
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