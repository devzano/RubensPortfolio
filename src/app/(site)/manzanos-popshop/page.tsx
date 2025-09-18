// src/app/(site)/manzanos-popshop/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import ManzanosPopShopHomeTab from "@/components/Projects/ManzanosPopShop/Screenshots/ManzanosPopShop_HomeTab.png";
import ManzanosPopShopPopsTab from "@/components/Projects/ManzanosPopShop/Screenshots/ManzanosPopShop_PopsTab.png";
import ManzanosPopShopPopDetails from "@/components/Projects/ManzanosPopShop/Screenshots/ManzanosPopShop_PopDetails.png";
import ManzanosPopShopOrders from "@/components/Projects/ManzanosPopShop/Screenshots/ManzanosPopShop_Orders.png";

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
  const screenshots = useMemo(() => [
    ManzanosPopShopHomeTab,
    ManzanosPopShopPopsTab,
    ManzanosPopShopPopDetails,
    ManzanosPopShopOrders,
  ], []);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleAppleStore = () =>
    window.open("https://apps.apple.com/us/app/manzanos-popshop/id6747915168", "_blank");
  const handlePlayStore = () =>
    window.open("https://play.google.com/store/apps/details?id=com.devzano.manzanospopshop", "_blank");

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName: "Manzanos PopShop", ...feedback }),
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
    { src: AppImages.expo, alt: "Expo", link: "https://docs.expo.dev/" },
    { src: AppImages.firebase, alt: "Firebase", link: "https://firebase.google.com/" },
    { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/manzanos-popshop/terms") },
    { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/manzanos-popshop/privacy") },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <ProjectHeader
        title="Manzanos PopShop"
        titleLink="https://apps.apple.com/us/app/manzanos-popshop/id6747915168"
        showArrows={showArrows}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        actions={[
          { label: "Apple Store", onClick: handleAppleStore, variant: "primary" },
          { label: "Play Store", onClick: handlePlayStore, variant: "secondary" },
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
                Shop, collect, and show off your favorite Funko Pops with{" "}
                <span className="text-sky-400">Manzanos PopShop</span>
              </strong>{" "}
              — a unique storefront powered by passion, built for collectors, and curated from a personal vault of
              iconic vinyl figures.
            </p>

            <div className="mt-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-100">Features</h3>
              <ul className="list-disc space-y-2 pl-6 text-slate-300 marker:text-sky-400">
                <li>
                  <strong className="text-slate-100">Explore the Collection:</strong> Browse an expanding catalog with
                  exclusives, chases, and limited editions. Filter by series/exclusives with rich photos and stock info.
                </li>
                <li>
                  <strong className="text-slate-100">Secure Checkout with Stripe:</strong> Fast, safe payments and
                  instant stock reservations to avoid missing out.
                </li>
                <li>
                  <strong className="text-slate-100">Favorite Your Picks:</strong> Save Pops you love to revisit and
                  purchase later.
                </li>
                <li>
                  <strong className="text-slate-100">Modern Order Management:</strong> Review past orders, thumbnails,
                  and statuses; recover carts if a payment fails.
                </li>
                <li>
                  <strong className="text-slate-100">Personalized Profile:</strong> Avatar, address book with nicknames,
                  and dark/light mode.
                </li>
                <li>
                  <strong className="text-slate-100">One-Tap Sign-In:</strong> Google or email auth; browse as guest
                  via Supabase-backed accounts.
                </li>
              </ul>

              <p className="mt-4 text-slate-300">
                <strong className="text-slate-100">Manzanos PopShop</strong> isn’t just a store — it’s a celebration of
                Pop culture. Join the hunt and add stories to your shelf.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-4">
            {BuiltWithLogos.map((logo, index) => {
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
            })}
          </div>
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        appName="Manzanos PopShop"
      />
    </div>
  );
}