// src/app/(site)/echoexpense/page.tsx
"use client";

import React from "react";
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
        <p className="leading-relaxed">
          <strong>
            Stay on top of your current and upcoming bills with{" "}
            <span className="text-[color:var(--accent)]">EchoExpense</span>
          </strong>{" "}
          — an all-in-one, modern bill &amp; payday tracker that keeps your finances clear and organized.
        </p>
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
          <strong className="text-slate-100">Profile insights:</strong> Photo/initials, totals for remaining/paid, and quick
          account management.
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
      ]}
    />
  );
}