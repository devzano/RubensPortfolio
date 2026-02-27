// app/(site)/manzanos-popshop/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import MPSHomePage from "@/components/Projects/MPSWeb/Screenshots/MPSWeb_HomePage.png";
import MPSBrowsePage from "@/components/Projects/MPSWeb/Screenshots/MPSWeb_BrowsePage.png";
import MPSDetailPage from "@/components/Projects/MPSWeb/Screenshots/MPSWeb_DetailPage.png";
import MPSAuthPage from "@/components/Projects/MPSWeb/Screenshots/MPSWeb_AuthModal.png";

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [
    MPSHomePage,
    MPSBrowsePage,
    MPSDetailPage,
    MPSAuthPage,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Manzanos PopShop"
      title="Manzanos PopShop"
      titleLink="https://manzanospopshop.com"
      icon={AppImages.manzanosPopShop}
      iconAlt="Manzanos PopShop app icon"
      screenshots={screenshots}
      screenshotProps={{
        variant: "web",
        webAspect: "16/9",
        webSizes: "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px",
        fit: "cover",
        intervalMs: 4000
      }}
      actions={({ openFeedback }) => [
        {
          label: "Web Store",
          href: "https://manzanospopshop.com",
          variant: "primary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <p className="leading-relaxed">
          <strong>
            Shop, collect, and show off your favorite Funko Pops with{" "}
            <span className="text-color:var(--accent)">Manzanos PopShop</span>
          </strong>{" "}
          — a unique storefront powered by passion, built for collectors, and
          curated from a personal vault of iconic vinyl figures.
        </p>
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
        { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/mps-web/terms") },
        { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/mps-web/privacy") },
      ]}
    />
  );
}