// app/(site)/manzanos-popshop/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import ManzanosPopShopHomeTab from "@/components/Projects/MPSMobile/Screenshots/MPSMobile_HomeTab.png";
import ManzanosPopShopPopsTab from "@/components/Projects/MPSMobile/Screenshots/MPSMobile_PopsTab.png";
import ManzanosPopShopPopDetails from "@/components/Projects/MPSMobile/Screenshots/MPSMobile_PopDetails.png";
import ManzanosPopShopOrders from "@/components/Projects/MPSMobile/Screenshots/MPSMobile_Orders.png";

const versionHistory = [
  {
    version: "26.0",
    title: "26.0 Update",
    items: [
      "Pop barcode scanner for scanning Pop box barcodes directly in the app.",
      "Send scanned Pops as buy requests, sell requests, or requests to add them to the store.",
      "Improved checkout, shipping, receipt, and tracking notifications.",
      "Real-time inventory updates so Pop details refresh faster when stock changes.",
    ],
  },
  {
    version: "1.0.4",
    title: "1.0.4 Update",
    items: [
      "Subscription modal.",
      "Subscription banner.",
      "Under the hood fixes.",
    ],
  },
  {
    version: "1.0.3",
    title: "1.0.3 Update",
    items: [
      "Thank you message.",
      "Under the hood improvements.",
    ],
  },
  {
    version: "1.0.2",
    title: "1.0.2 Update",
    items: [
      "Live release.",
      "Bug fixes.",
      "Small improvements.",
    ],
  },
  {
    version: "1.0.1",
    title: "1.0.1 Update",
    items: ["Bug fixes."],
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
          <p className="text-sm text-slate-400">View Manzanos PopShop version history.</p>
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
    ManzanosPopShopHomeTab,
    ManzanosPopShopPopsTab,
    ManzanosPopShopPopDetails,
    ManzanosPopShopOrders,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Manzanos PopShop"
      title="Manzanos PopShop"
      titleLink="https://apps.apple.com/us/app/manzanos-popshop/id6747915168"
      icon={AppImages.manzanosPopShop}
      iconAlt="Manzanos PopShop app icon"
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
          href: "https://apps.apple.com/us/app/manzanos-popshop/id6747915168",
          variant: "primary",
        },
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.devzano.manzanospopshop",
          variant: "secondary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <div className="space-y-4 leading-relaxed">
          <p>
            <strong>
              Shop, collect, and show off your favorite Funko Pops with{" "}
              <span className="text-var(--accent)">Manzanos PopShop</span>
            </strong>{" "}
            — a unique storefront powered by passion, built for collectors, and
            curated from a personal vault of iconic vinyl figures.
          </p>

          <WhatsNewSection />
        </div>
      }
      featureTitle="Features"
      features={[
        <>
          <strong className="text-slate-100">Explore the Collection:</strong>{" "}
          Browse an expanding catalog with exclusives, chases, and limited
          editions. Filter by series/exclusives with rich photos and stock info.
        </>,
        <>
          <strong className="text-slate-100">Secure Checkout with Stripe:</strong>{" "}
          Fast, safe payments and instant stock reservations to avoid missing
          out.
        </>,
        <>
          <strong className="text-slate-100">Favorite Your Picks:</strong> Save
          Pops you love to revisit and purchase later.
        </>,
        <>
          <strong className="text-slate-100">Modern Order Management:</strong>{" "}
          Review past orders, thumbnails, and statuses; recover carts if a
          payment fails.
        </>,
        <>
          <strong className="text-slate-100">Personalized Profile:</strong>{" "}
          Avatar, address book with nicknames, and dark/light mode.
        </>,
        <>
          <strong className="text-slate-100">One-Tap Sign-In:</strong> Google or
          email auth; browse as guest via Supabase-backed accounts.
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
        { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
        { src: AppImages.expo, alt: "Expo", href: "https://docs.expo.dev/" },
        { src: AppImages.firebase, alt: "Firebase", href: "https://firebase.google.com/" },
        { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/mps-mobile/terms") },
        { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/mps-mobile/privacy") },
      ]}
    />
  );
}
