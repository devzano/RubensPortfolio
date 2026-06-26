// src/app/(site)/echoexpense/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import LoginView from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_LoginView.png";
import SignupView from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_SignupView.png";
import LoadingView from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_LoadingView.png";
import HomeNoBillPaydayView from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_HomeNoBillPaydayView.png";
import NewBillPaydayMenuView from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_NewBillPaydayMenuView.png";
import BlankNewBillPaydayView from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_BlankNewBillPaydayView.png";
import NewBillView from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_NewBillView.png";
import NewPaydayView from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_NewPaydayView.png";
import NewBillView2 from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_NewBillView2.png";
import NewBillView3 from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_NewBillView3.png";
import HomeView2 from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_HomeView2.png";
import AccountView from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_AccountView.png";
import AccountView2 from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_AccountView2.png";
import HomeView3 from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_HomeView3.png";
import Details from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_Details.png";
import Menu from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_Menu.png";
import SideMenuView from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_SideMenuView.png";
import HomeView4 from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_HomeView4.png";
import AccountView3 from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_AccountView3.png";
import CalendarView from "@/components/Projects/EchoExpense/Screenshots/EchoExpense_CalendarView.png";

const versionHistory = [
  {
    version: "26.0",
    title: "26.0 Update",
    items: [
      "New look throughout the app with additional features.",
      "Smarter categories for organizing bills and paydays.",
      "Plaid sync to view transactions and match or create bills and paydays.",
      "New widget showing upcoming bills and paydays.",
      "Performance improvements and bug fixes.",
    ],
  },
  {
    version: "1.0.7",
    title: "1.0.7 Update",
    items: [
      "Added an onboarding experience introducing EchoExpense's core features.",
      "Revamped the UI with cleaner layouts for bill details, payday details, history, notifications, and calendar entries.",
      "Upgraded the notification system with customizable reminder times (8 AM, 12 PM, or 4 PM), same-day alerts for unpaid bills, and additional notifications before bill due dates.",
    ],
  },
  {
    version: "1.0.6",
    title: "1.0.6 Update",
    items: [
      "Introduced the Smart Savings bundle with budgets and savings tracking.",
      "Create financial goals and monitor your savings progress.",
      "Bug fixes and overall performance improvements.",
    ],
  },
  {
    version: "1.0.5",
    title: "1.0.5 Update",
    items: [
      "Added a Paid Off option for bills that no longer require tracking.",
      "Paid off bills are removed from future reminders while remaining in your records.",
      "Bug fixes and overall improvements.",
    ],
  },
  {
    version: "1.0.4",
    title: "1.0.4 Update",
    items: [
      "Paid on Time: Users can now mark bills as on time, even after the due date.",
      "Sign In: Enjoy a seamless login experience with Apple or Google.",
      "Feedback UI: Share feedback or suggest new features directly on the developer page.",
      "Calendar History: The calendar now displays past bills and paydays alongside future bills.",
      "Reminder Days: Set reminder notifications between 1 to 4 days before a bill is due.",
      "Bug fixes and overall improvements.",
    ],
  },
  {
    version: "1.0.3",
    title: "1.0.3 Update",
    items: [
      "Bug fixes and overall improvements.",
      "Fixed duplicate payday display when a payday is received on the pay date.",
    ],
  },
  {
    version: "1.0.2",
    title: "1.0.2 Update",
    items: [
      "Introduced Available Credit on bills.",
      "Added additional insights on the paid bill banner.",
      "Improved Bills and Paydays section performance.",
    ],
  },
  {
    version: "1.0.1",
    title: "1.0.1 Update",
    items: [
      "Added payday management with monthly income tracking.",
      "Added end-of-month calculations in the profile.",
      "Added deduction and tax percentage support.",
      "Improved bill details layout.",
      "Refined profile and navigation experience.",
      "General performance improvements.",
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
          <p className="text-sm text-slate-400">View EchoExpense version history.</p>
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
    LoginView,
    SignupView,
    LoadingView,
    HomeNoBillPaydayView,
    NewBillPaydayMenuView,
    BlankNewBillPaydayView,
    NewBillView,
    NewPaydayView,
    NewBillView2,
    NewBillView3,
    HomeView2,
    AccountView,
    AccountView2,
    HomeView3,
    Details,
    Menu,
    SideMenuView,
    HomeView4,
    AccountView3,
    CalendarView,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="EchoExpense"
      title="EchoExpense"
      titleLink="https://apps.apple.com/us/app/echoexpense/id6475660500"
      icon={AppImages.echoExpense}
      iconAlt="EchoExpense app icon"
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
          href: "https://apps.apple.com/us/app/echoexpense/id6475660500",
          variant: "primary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <div className="space-y-4 leading-relaxed">
          <p>
            <strong>
              Stay on top of your current and upcoming bills with{" "}
              <span className="text-var(--accent)">EchoExpense</span>
            </strong>{" "}
            — an all-in-one, modern bill &amp; payday tracker that keeps your finances
            clear and organized.
          </p>

          <WhatsNewSection />
        </div>
      }
      featureTitle="Highlights"
      features={[
        <>
          <strong className="text-slate-100">Manage bills:</strong> Create, edit, mark paid/unpaid, view history and
          notifications from a clean details view.
        </>,
        <>
          <strong className="text-slate-100">Paydays:</strong> Add paydays and see end-of-month projections with income
          overview.
        </>,
        <>
          <strong className="text-slate-100">Calendar:</strong> Browse past &amp; upcoming bills side-by-side with paydays.
        </>,
        <>
          <strong className="text-slate-100">Smart notifications:</strong> Choose alert times and get last-chance reminders.
        </>,
        <>
          <strong className="text-slate-100">Profile insights:</strong> Photo/initials, totals for remaining/paid, and quick account management.
        </>,
        <>
          <strong className="text-slate-100">Secure sign-in:</strong> Apple/Google auth and an intuitive, modern UI.
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
        { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
        { src: AppImages.firebase, alt: "Firebase", href: "https://firebase.google.com/" },
        { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/echoexpense/terms") },
        { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/echoexpense/privacy") },
        { src: AppImages.termsConditions, alt: "Security", onClick: () => router.push("/echoexpense/security") },
      ]}
    />
  );
}