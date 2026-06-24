// app/(site)/starship-pixelscape/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import MainMenuView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_MainMenu.png";
import SSHUBView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_SSHUB.png";
import SSHUBTopView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_SSHUBTopView.png";
import SSHUBBottomView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_SSHUBBottomView.png";
import SpaceshipView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_SpaceshipView.png";
import LaserMissileView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_LaserMissileView.png";
import MeteorView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_MeteorView.png";
import PausedGameView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_PausedGameView.png";
import GameOverView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_GameOverView.png";
import AchievementsView from "@/components/Projects/StarshipPixelscape/Screenshots/StarshipPixelscape_AchievementsView.png";

const versionHistory = [
  {
    version: "26.0",
    title: "26.0 Update",
    items: [
      "Modes: Online Multiplayer (Co-op + 1v1/2v2/Free-for-All, up to 4 players) & Boss Rush",
      "New Power-Up: Piercing Shots",
      "Full-Direction Movement",
      "Smoother Aiming & Performance",
      "Revamped Animated Widget",
      "Bug Fixes & Polish",
    ],
  },
  {
    version: "1.4",
    title: "1.4 Update",
    items: [
      "Landscape Mode – Enjoy a wider battlefield with better control and clearer visibility.",
      "Daily Notifications – Optional reminders to jump back in, improve your skills, and climb the ranks.",
      "Widget Support – Your chosen ship, laser, and meteor now animate on your Home Screen — with battery info and custom loadouts at a glance.",
      "Game Center Sync – Track your progress and achievements seamlessly across all your devices.",
      "Controller Support – Gamepad-ready! Precision movement and smoother firing with full controller support.",
      "More Spaceships – A bigger fleet to unlock, customize, and show off.",
      "More Enemies – Face new foes with deadlier patterns and unpredictable moves.",
      "More Lasers & Projectiles – Experiment with brand-new shot types and variants for the ultimate build.",
      "Tougher Environments – Faster chaos, tighter margins — the deeper you go, the harder it gets.",
      "Harder Boss Battles – Bosses now hit harder, think faster, and throw down in brutal new ways.",
    ],
  },
  {
    version: "1.3",
    title: "1.3 Update",
    items: [
      "Over 65 Playable Spaceships – Choose from a massive selection of unique ships, each with its own style and design!",
      "New Meteors – Experience an expanded variety of meteors.",
      "Smarter Enemies – UFOs now dodge bullets, forcing you to sharpen your aim and tactics!",
      "Bosses with Special Attacks – Prepare for tougher, more dynamic boss battles with unique attack patterns.",
      "Optimizations – Faster, smoother gameplay with improved performance!",
    ],
  },
  {
    version: "1.2",
    title: "1.2 Update",
    items: [
      "New Spaceships! Choose from a wider selection of unique ships to dominate the battlefield.",
      "New Meteors – Choose from a variety of meteors.",
      "New Projectiles – Customize your firepower with different projectile types to take down enemies in style.",
      "New Power-Up: Space Helper – A friendly spaceship joins the fight, assisting you in battle!",
      "Full Screen Movement! You’re no longer stuck at the bottom—move freely across the screen for better control.",
      "Customizable Joystick! Play the way you prefer by placing the joystick on either the right or left side.",
    ],
  },
  {
    version: "1.1",
    title: "1.1 Update",
    items: [
      "Cosmic Destruction: Every meteor impact, enemy takedown, and boss defeat now comes with explosive visuals!",
      "Revive Feature: Get a second chance after game over—don’t give up the fight just yet!",
      "Start with a Power-Up: Boost your survival from the get-go with a random power-up!",
      "Leaderboard Added: Compete for the Top 10 scores and prove you're the best pilot in the galaxy.",
      "Performance Upgrades: Smoother gameplay and optimizations for an even better experience.",
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
          <p className="text-sm text-slate-400">View Starship Pixelscape version history.</p>
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
    // Group 1
    MainMenuView,
    SSHUBView,
    SSHUBTopView,
    SSHUBBottomView,

    // Group 2
    SpaceshipView,
    LaserMissileView,
    MeteorView,
    PausedGameView,

    // Group 3
    GameOverView,
    AchievementsView,
    MainMenuView,
    SSHUBView,

    // Group 4
    SSHUBTopView,
    SSHUBBottomView,
    SpaceshipView,
    LaserMissileView,

    // Group 5
    MeteorView,
    PausedGameView,
    GameOverView,
    AchievementsView,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Starship Pixelscape"
      title="Starship Pixelscape"
      titleLink="https://apps.apple.com/us/app/starship-pixelscape/id6741517533"
      icon={AppImages.starshipPixelscape}
      iconAlt="Starship Pixelscape app icon"
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
          href: "https://apps.apple.com/us/app/starship-pixelscape/id6741517533",
          variant: "primary",
        },
        { label: "Send Feedback", onClick: openFeedback, variant: "secondary" },
      ]}
      description={
        <div className="space-y-4 leading-relaxed">
          <p>
            <strong>
              Blast off into an epic adventure with{" "}
              <span className="text-(--accent)">Starship Pixelscape</span>!
            </strong>
          </p>

          <p>
            Embark on a thrilling journey through the pixelated cosmos in Starship Pixelscape! Dodge, blast, and conquer your way through this retro-inspired space shooter filled with danger, intense battles, and endless action. Go solo for a high-score run, push your limits in Boss Rush, or jump online and challenge pilots across the galaxy.
          </p>

          <p>Ready to take on the cosmos?</p>

          <WhatsNewSection />
        </div>
      }
      featureTitle="Features"
      features={[
        <>
          <strong className="text-slate-100">Choose Your Loadout:</strong> Customize your
          experience with unique spaceships, projectiles, asteroids, and particle colors.
        </>,
        <>
          <strong className="text-slate-100">Endless Survival:</strong> Blast meteors, UFOs,
          enemy fighters, and massive bosses as the storm grows fiercer.
        </>,
        <>
          <strong className="text-slate-100">Boss Rush Mode:</strong> Battle relentless waves
          of bosses back-to-back.
        </>,
        <>
          <strong className="text-slate-100">Online Multiplayer:</strong> Play Co-op, 1v1, 2v2,
          or Free-for-All with up to 4 players.
        </>,
        <>
          <strong className="text-slate-100">Full-Direction Movement:</strong> Fly and fire in
          every direction for complete battlefield control.
        </>,
        <>
          <strong className="text-slate-100">Power Up:</strong> Collect rapid fire, triple lasers,
          missiles, shields, helper ships, time freeze, piercing shots, bombs, and more.
        </>,
        <>
          <strong className="text-slate-100">Compete &amp; Achieve:</strong> Climb the global
          Top 10 leaderboard and unlock achievements.
        </>,
        <>
          <strong className="text-slate-100">Home Screen Widget:</strong> Show off your favorite
          ship, loadout, high score, and battery level.
        </>,
      ]}
      builtWith={[
        { src: AppImages.githubLight, alt: "GitHub", href: "https://github.com/devzano" },
        { src: AppImages.xcode, alt: "Xcode", href: "https://developer.apple.com/xcode/" },
        { src: AppImages.swiftui, alt: "SwiftUI", href: "https://developer.apple.com/xcode/swiftui/" },
        {
          src: AppImages.privacyPolicy,
          alt: "Privacy Policy",
          onClick: () => router.push("/starship-pixelscape/privacy"),
        },
        {
          src: AppImages.termsConditions,
          alt: "Terms and Conditions",
          onClick: () => router.push("/starship-pixelscape/terms"),
        },
      ]}
    />
  );
}