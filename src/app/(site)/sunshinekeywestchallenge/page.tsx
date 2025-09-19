// app/(site)/sunshinekeywestchallenge/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import Home from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Home.png";
import Contact from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Contact.png";
import Events from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Events.png";
import Maps from "@/components/Projects/SunshineKeyWestChallenge/Screenshots/SunshineKeyWestChallenge_Maps.png";

export default function Page({
  showArrows = false,
  nextSlide,
  prevSlide,
}: SlideNavProps) {
  const router = useRouter();

  const screenshots = [Home, Contact, Events, Maps];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Sunshine Key West Challenge"
      title="SKWC"
      titleLink="https://apps.apple.com/us/app/sunshine-key-west-challenge/id6737530954"
      icon={AppImages.sunshineKeyWestChallenge}
      iconAlt="SunshineKeyWestChallenge app icon"
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
          href: "https://apps.apple.com/us/app/sunshine-key-west-challenge/id6737530954",
          variant: "primary",
        },
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.devzano.SunshineKeyWestChallenge",
          variant: "secondary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <p className="leading-relaxed">
          <strong>
            Experience the excitement and heart of the{" "}
            <span className="text-[color:var(--accent)]">Sunshine Key West Challenge</span>
          </strong>{" "}
          — a cherished annual fishing tournament supporting the Diabetes Research Institute’s
          mission to find a cure for Type 1 diabetes. Stay connected to the tournament’s purpose,
          schedule, and community right from your fingertips.
        </p>
      }
      featureTitle="Features"
      features={[
        <>
          <strong className="text-slate-100">Tournament History:</strong> Learn the inspiring story
          behind the event and its mission-driven partnership.
        </>,
        <>
          <strong className="text-slate-100">Event Schedule:</strong> Access a detailed,
          easy-to-follow schedule so you never miss a moment.
        </>,
        <>
          <strong className="text-slate-100">Exclusive Auction Items:</strong> Browse unique
          listings that support the charitable cause.
        </>,
        <>
          <strong className="text-slate-100">Photo Gallery:</strong> Relive memorable moments with a
          collection of angler photos.
        </>,
        <>
          <strong className="text-slate-100">Nearby Recommendations:</strong> Discover food spots
          and local recommendations near the event.
        </>,
        <>
          <strong className="text-slate-100">Community Spirit:</strong> Connect to the passion and
          camaraderie that make this event special.
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.reactnative, alt: "React Native", href: "https://reactnative.dev/" },
        { src: AppImages.expo, alt: "Expo", href: "https://docs.expo.dev/" },
        { src: AppImages.firebase, alt: "Firebase", href: "https://firebase.google.com/" },
        {
          src: AppImages.privacyPolicy,
          alt: "Privacy Policy",
          onClick: () => router.push("/sunshinekeywestchallenge/privacy"),
        },
        {
          src: AppImages.termsConditions,
          alt: "Terms and Conditions",
          onClick: () => router.push("/sunshinekeywestchallenge/terms"),
        },
      ]}
    />
  );
}