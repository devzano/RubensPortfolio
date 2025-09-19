// app/(site)/steda/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import HomeView from "@/components/Projects/Steda/Screenshots/Steda_HomeView.png";
import NewHabitView from "@/components/Projects/Steda/Screenshots/Steda_NewHabitView.png";
import HabitDetailsView from "@/components/Projects/Steda/Screenshots/Steda_HabitDetailsView.png";
import MoodView from "@/components/Projects/Steda/Screenshots/Steda_MoodView.png";

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [HomeView, NewHabitView, HabitDetailsView, MoodView];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Steda"
      title="Steda"
      titleLink="https://apps.apple.com/us/app/steda/id6745674975"
      icon={AppImages.steda}
      iconAlt="Steda app icon"
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
          href: "https://apps.apple.com/us/app/steda/id6745674975",
          variant: "primary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <p className="leading-relaxed">
          <strong>
            Take control of your routines with <span className="text-[color:var(--accent)]">Steda</span>
          </strong>{" "}
          — your personal habit and mood tracker designed to help you build consistency and stay
          motivated. Whether you&apos;re focusing on one habit or many, Steda keeps your progress
          clear, your streaks visible, and your mindset positive.
        </p>
      }
      featureTitle="Features"
      features={[
        <>Create custom habits with flexible daily, weekly, or personalized schedules.</>,
        <>Log your mood each day and reflect on trends with a mood calendar.</>,
        <>Set custom reminders with motivational messages to keep you on track.</>,
        <>See progress with streak visuals and completion celebrations.</>,
        <>Daily motivational messages every time you open the app.</>,
        <>Clean, minimal design optimized for iPhone and iPad.</>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
        { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
        { src: AppImages.privacyPolicy, alt: "Privacy Policy", onClick: () => router.push("/steda/privacy") },
        { src: AppImages.termsConditions, alt: "Terms and Conditions", onClick: () => router.push("/steda/terms") },
      ]}
    />
  );
}