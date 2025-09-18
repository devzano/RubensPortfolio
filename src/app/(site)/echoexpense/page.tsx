// src/app/(site)/echoexpense/page.tsx
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import FeedbackModal from "@/components/MailForm/FeedbackModal";
import AppImages from "@/constants/images";
import { Feedback, SlideNavProps } from "@/types/types";
import ScreenshotGridRotator from "@/components/Projects/ScreenshotGridRotator";
import ProjectHeader from "@/components/Projects/ProjectHeader";

export default function Page({
  showArrows = false,
  nextSlide = () => { },
  prevSlide = () => { },
}: SlideNavProps) {
  const router = useRouter();
  const screenshots = useMemo(
    () => [
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
    ],
    []
  );
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleAppleStore = () =>
    window.open("https://apps.apple.com/us/app/echoexpense/id6475660500", "_blank");

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName: "EchoExpense", ...feedback }),
      });
      if (res.ok) {
        alert("Feedback sent successfully!");
        setIsFeedbackModalOpen(false);
        setFeedback({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        alert("Failed to send feedback. Please try again later.");
      }
    } catch {
      alert("Error sending feedback. Please try again later.");
    }
  };

  const BuiltWithLogos = [
    { src: AppImages.githubLight, alt: "GitHub", link: "https://github.com/devzano" },
    { src: AppImages.xcode, alt: "Xcode", link: "https://developer.apple.com/xcode/" },
    { src: AppImages.swiftui, alt: "SwiftUI", link: "https://developer.apple.com/xcode/swiftui/" },
    { src: AppImages.firebase, alt: "Firebase", link: "https://firebase.google.com/" },
    { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/echoexpense/terms") },
    { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/echoexpense/privacy") },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <ProjectHeader
        title="EchoExpense"
        titleLink="https://apps.apple.com/us/app/echoexpense/id6475660500"
        showArrows={showArrows}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        actions={[
          { label: "Apple Store", onClick: handleAppleStore, variant: "primary" },
          { label: "Send Feedback", onClick: () => setIsFeedbackModalOpen(true), variant: "secondary" },
        ]}
      />

      <div className="mx-auto w-full">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-md ring-1 ring-white/10">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4 shadow-inner">
            <ScreenshotGridRotator
              images={screenshots}
              intervalMs={4000}
              cols={{ mobile: 2, desktop: 4 }}
              aspect="9/19"
              sizes="(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 240px"
              deferUntilMounted
            />
          </div>

          <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-lg shadow-black/20">
            <p className="leading-relaxed">
              <strong className="font-semibold text-sky-400">
                Stay on top of your current and upcoming bills with{" "}
                <span className="text-sky-400">EchoExpense</span>
              </strong>{" "}
              — an all-in-one, modern bill & payday tracker that keeps your finances clear and organized.
            </p>

            <div className="mt-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-100">Highlights</h3>
              <ul className="list-disc space-y-2 pl-6 text-slate-300 marker:text-sky-400">
                <li>
                  <strong className="text-slate-100">Manage bills:</strong> Create, edit, mark paid/unpaid, view history and
                  notifications from a clean details view.
                </li>
                <li>
                  <strong className="text-slate-100">Paydays:</strong> Add paydays and see end-of-month projections with income
                  overview.
                </li>
                <li>
                  <strong className="text-slate-100">Calendar:</strong> Browse past & upcoming bills side-by-side with paydays.
                </li>
                <li>
                  <strong className="text-slate-100">Smart notifications:</strong> Choose alert times and get last-chance reminders.
                </li>
                <li>
                  <strong className="text-slate-100">Profile insights:</strong> Photo/initials, totals for remaining/paid, and quick
                  account management.
                </li>
                <li>
                  <strong className="text-slate-100">Secure sign-in:</strong> Apple/Google auth and an intuitive, modern UI.
                </li>
              </ul>

              <p className="mt-4 text-slate-300">
                Keep your finances organized and confidently manage every payment — all in one place.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-4">
            {[
              ...BuiltWithLogos.map((logo, index) => {
                const img = (
                  <Image
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    width={44}
                    height={44}
                    className="h-11 w-11 select-none rounded-md object-contain opacity-90 grayscale transition hover:scale-105 hover:opacity-100 hover:grayscale-0"
                    draggable={false}
                  />
                );
                return (
                  <span key={index} className="inline-block">
                    {"link" in logo ? (
                      <Link href={logo.link!} target="_blank">
                        {img}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={logo.onClick as () => void}
                        className="cursor-pointer"
                        aria-label={logo.alt}
                        title={logo.alt}
                      >
                        {img}
                      </button>
                    )}
                  </span>
                );
              }),
            ]}
          </div>
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        appName="EchoExpense"
      />
    </div>
  );
}