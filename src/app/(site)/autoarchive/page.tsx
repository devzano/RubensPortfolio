// src/app/(site)/autoarchive/page.tsx
"use client";

import React from "react";
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
        <p className="leading-relaxed">
          <strong>
            <span className="text-(--accent)">AutoArchive</span>: Your Vehicle’s Digital Logbook
          </strong>{" "}
          Stay in control of your car care with the all-in-one app for managing vehicle maintenance, important vehicle details, fuel logs, trip tracking, reminders, and documents.
        </p>
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