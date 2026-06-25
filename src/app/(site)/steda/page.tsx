// app/(site)/steda/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import HomeView from "@/components/Projects/Steda/Screenshots/Steda_HomeView.png";
import NewHabitView from "@/components/Projects/Steda/Screenshots/Steda_NewHabitView.png";
import HabitDetailsView from "@/components/Projects/Steda/Screenshots/Steda_HabitDetailsView.png";
import MoodView from "@/components/Projects/Steda/Screenshots/Steda_MoodView.png";

const versionHistory = [
  {
    version: "26.0",
    title: "26.0 Update",
    items: [
      "Added meaningful counters for tracking water, workouts, focus sessions, goals, and more.",
      "Counters now sync across the app, Home Screen widgets, Apple Watch, Watch widgets, and Live Activities.",
      "Added dedicated one-time and repeating reminders for tasks that are not daily habits.",
      "Added Apple Calendar and Apple Reminders support.",
      "Expanded habit schedules with specific-date and monthly options.",
      "Added daily quote and word of the day notification options.",
      "Added more personalization with colors, app icons, and tracking details.",
    ],
  },
  {
    version: "1.1",
    title: "1.1 Update",
    items: ["New & improved achievements.", "Bug fixes."],
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
          <p className="text-sm text-slate-400">View Steda version history.</p>
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
        <div className="space-y-4 leading-relaxed">
          <p>
            <strong>
              Build better routines with{" "}
              <span className="text-var(--accent)">Steda</span>
            </strong>{" "}
            — Steda helps you build better habits, track meaningful counters, manage
            reminders, and reflect on how you feel along the way. Designed to keep
            your progress visible and your motivation high, Steda makes routines feel
            simple, personal, and easier to return to every day.
          </p>

          <p>
            Start building the habits, reminders, and small actions that move you
            forward. One day at a time.
          </p>

          <WhatsNewSection />
        </div>
      }
      featureTitle="Features"
      features={[
        <>
          <strong className="text-slate-100">Flexible Habit Tracking:</strong> Create custom habits
          with daily, weekly, specific-date, and monthly schedules.
        </>,
        <>
          <strong className="text-slate-100">Counters That Stay in Sync:</strong> Track water,
          workouts, focus sessions, personal goals, and more across the app, widgets,
          Apple Watch, and Live Activities.
        </>,
        <>
          <strong className="text-slate-100">Dedicated Reminders:</strong> Create one-time or
          repeating reminders for medication, calls, errands, appointments, and monthly check-ins.
        </>,
        <>
          <strong className="text-slate-100">Calendar &amp; Apple Reminders Support:</strong> Connect
          Steda with Apple Calendar and Apple Reminders.
        </>,
        <>
          <strong className="text-slate-100">Daily Mood Reflection:</strong> Log how you feel each day
          and review emotional patterns with an interactive mood calendar.
        </>,
        <>
          <strong className="text-slate-100">Your Notifications:</strong> Set personalized habit and
          reminder notifications, plus daily quote and word of the day delivery times.
        </>,
        <>
          <strong className="text-slate-100">Progress You Can See:</strong> View streaks,
          completions, achievements, and progress snapshots.
        </>,
        <>
          <strong className="text-slate-100">Personal Customization:</strong> Choose colors, app icons,
          and details that make your tracking space feel like your own.
        </>,
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