// app/(site)/steda/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import OnboardingView from "@/components/Projects/Steda/Screenshots/Steda_OnboardingView.png";
import UsernameOnboardingView from "@/components/Projects/Steda/Screenshots/Steda_UsernameOnboardingView.png";
import HomeView from "@/components/Projects/Steda/Screenshots/Steda_HomeView.png";
import NewHabitView from "@/components/Projects/Steda/Screenshots/Steda_NewHabitView.png";
import CounterCreationView from "@/components/Projects/Steda/Screenshots/Steda_CounterCreationView.png";
import RemindersCreationView from "@/components/Projects/Steda/Screenshots/Steda_RemindersCreationView.png";
import TabOpenProfileView from "@/components/Projects/Steda/Screenshots/Steda_TabOpenProfileView.png";
import MoodView from "@/components/Projects/Steda/Screenshots/Steda_MoodView.png";

const screenshots = [OnboardingView, UsernameOnboardingView, HomeView, NewHabitView, CounterCreationView, RemindersCreationView, TabOpenProfileView, MoodView];

const versionHistory = [
  {
    version: "26.0",
    title: "Counters, Reminders & Daily Motivation",
    description:
      "Stay on track with customizable counters, standalone reminders, daily inspiration, and new widgets designed to keep your progress visible.",
    items: [
      "Create custom counters with personalized names, units, goals, colors, and icons.",
      "Track workouts, water intake, habits, medications, tasks, study sessions, and anything else that matters.",
      "View real-time progress and pace insights, including per-hour tracking.",
      "Start, pause, reset, and manage counter sessions with ease.",
      "Use Home Screen widgets to update counters and view your daily quote and Word of the Day.",
      "Add Steda Today widgets for quick access to habits, reminders, and daily progress.",
      "Create one-time or recurring reminders for medications, appointments, errands, calls, bills, and calendar nudges.",
      "Sync supported reminders with Apple Reminders for a seamless experience.",
      "Receive a daily motivational quote and Word of the Day at a time you choose.",
      "Save your favorite quotes and words in Saved Prompts to revisit anytime.",
    ],
  },
  {
    version: "1.1",
    title: "Achievements & Improvements",
    description:
      "A smaller update focused on improving achievements and overall reliability.",
    items: [
      "Added new and improved achievements.",
      "Improved performance and reliability.",
      "Fixed bugs throughout the app.",
    ],
  },
];

const features = [
  <>
    <strong className="text-slate-100">Flexible Habit Tracking:</strong>{" "}
    Create habits that fit your life with daily, weekly, specific-date, and
    monthly schedules.
  </>,
  <>
    <strong className="text-slate-100">Powerful Custom Counters:</strong>{" "}
    Track workouts, water, study sessions, tasks, repetitions, medication, and
    personal goals with customizable names, units, colors, icons, and targets.
  </>,
  <>
    <strong className="text-slate-100">Real-Time Pace Insights:</strong>{" "}
    View live progress and per-hour tracking insights while managing active
    counter sessions.
  </>,
  <>
    <strong className="text-slate-100">Standalone Reminders:</strong>{" "}
    Create one-time or recurring reminders for medications, appointments,
    errands, calls, bills, tasks, and calendar nudges.
  </>,
  <>
    <strong className="text-slate-100">Apple Reminders Support:</strong>{" "}
    Sync supported Steda reminders with Apple Reminders, or use Steda
    notifications on their own.
  </>,
  <>
    <strong className="text-slate-100">Daily Mood Check-Ins:</strong>{" "}
    Quickly record how you feel and uncover emotional patterns through an
    interactive mood calendar.
  </>,
  <>
    <strong className="text-slate-100">Home &amp; Lock Screen Widgets:</strong>{" "}
    Update counters, view daily content, and keep today’s habits, reminders,
    and progress close at hand.
  </>,
  <>
    <strong className="text-slate-100">Daily Motivation:</strong>{" "}
    Receive a motivational quote and Word of the Day at a time you choose, then
    save your favorites in Saved Prompts.
  </>,
  <>
    <strong className="text-slate-100">Visible Progress:</strong>{" "}
    Build streaks, reach milestones, complete habits, manage sessions, and
    watch your consistency grow over time.
  </>,
];

function WhatsNewSection() {
  const [selectedVersion, setSelectedVersion] = useState(
    versionHistory[0].version
  );

  const selected =
    versionHistory.find((item) => item.version === selectedVersion) ??
    versionHistory[0];

  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/4 p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-(--accent)">
            Version History
          </p>

          <h3 className="text-xl font-bold text-white">What’s New</h3>

          <p className="mt-1 text-sm text-slate-400">
            Explore the latest Steda updates and improvements.
          </p>
        </div>

        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Select Version

          <select
            value={selectedVersion}
            onChange={(event) => setSelectedVersion(event.target.value)}
            className="min-w-40 rounded-2xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm font-semibold normal-case tracking-normal text-white outline-none transition hover:border-white/20 focus:border-(--accent)"
          >
            {versionHistory.map((item) => (
              <option key={item.version} value={item.version}>
                Version {item.version}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
        <div className="mb-4">
          <div className="mb-2 inline-flex rounded-full border border-(--accent)/20 bg-(--accent)/10 px-3 py-1 text-xs font-bold text-(--accent)">
            Version {selected.version}
          </div>

          <h4 className="text-lg font-bold text-white">{selected.title}</h4>

          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            {selected.description}
          </p>
        </div>

        <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
          {selected.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)"
              />

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
          label: "View on the App Store",
          href: "https://apps.apple.com/us/app/steda/id6745674975",
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
          <p className="text-lg text-slate-200">
            <strong>
              Build better routines with{" "}
              <span className="text-(--accent)">Steda</span>.
            </strong>
          </p>

          <p>
            Steda is your all-in-one space to build better habits, track what
            matters, manage reminders, and stay connected to how you feel each
            day.
          </p>

          <p>
            Whether you’re working toward a goal, improving your mindset,
            remembering important tasks, or simply trying to become more
            consistent, Steda keeps your routines clear, motivating, and easy to
            return to.
          </p>

          <p>
            Create flexible habits, track progress with customizable counters,
            schedule standalone reminders, record daily moods, and keep your
            most important information visible through Home Screen and Lock
            Screen widgets.
          </p>

          <p className="font-semibold text-slate-200">
            Build habits that last. Track what matters.
            <br />
            One day, one reminder, one action, and one count at a time.
          </p>

          <WhatsNewSection />
        </div>
      }
      featureTitle="Everything You Need to Stay on Track"
      features={features}
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
          src: AppImages.privacyPolicy,
          alt: "Privacy Policy",
          onClick: () => router.push("/steda/privacy"),
        },
        {
          src: AppImages.termsConditions,
          alt: "Terms and Conditions",
          onClick: () => router.push("/steda/terms"),
        },
      ]}
    />
  );
}