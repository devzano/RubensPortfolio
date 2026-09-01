// src/app/(site)/logiqo/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SlideNavProps } from "@/types/types";
import AppImages from "@/constants/images";
import ProjectPage from "@/components/Projects/ProjectsPage";

// Screenshots
import LogiqoHomeView_iOS from "@/components/Projects/Logiqo/Screenshots/HomeView_iOS.png";
import LogiqoHomeViewScrolledMid_iOS from "@/components/Projects/Logiqo/Screenshots/HomeViewScrolledMid_iOS.png";
import LogiqoHomeViewScrolledBottom_iOS from "@/components/Projects/Logiqo/Screenshots/HomeViewScrolledBottom_iOS.png";
import LogiqoDailyView_iOS from "@/components/Projects/Logiqo/Screenshots/DailyView_iOS.png";
import LogiqoDailyViewScrolled_iOS from "@/components/Projects/Logiqo/Screenshots/DailyViewScrolled_iOS.png";
import LogiqoHowToPlayView_iOS from "@/components/Projects/Logiqo/Screenshots/HowToPlayView_iOS.png";
import LogiqoSettingsView_iOS from "@/components/Projects/Logiqo/Screenshots/SettingsView_iOS.png";
import LogiqoUsernameView_iOS from "@/components/Projects/Logiqo/Screenshots/UsernameView_iOS.png";
import LogiqoProfileView_iOS from "@/components/Projects/Logiqo/Screenshots/ProfileView_iOS.png";
import LogiqoProfileViewEditMode_iOS from "@/components/Projects/Logiqo/Screenshots/ProfileViewEditMode_iOS.png";
import LogiqoHomeView_Android from "@/components/Projects/Logiqo/Screenshots/HomeView_Android.jpg";
import LogiqoDailyView_Android from "@/components/Projects/Logiqo/Screenshots/DailyView_Android.jpg";
import LogiqoHowToPlayView_Android from "@/components/Projects/Logiqo/Screenshots/HowToPlayView_Android.jpg";
import LogiqoOnlineGameView_Android from "@/components/Projects/Logiqo/Screenshots/OnlineGameView_Android.jpg";
import LogiqoProfileView_Android from "@/components/Projects/Logiqo/Screenshots/ProfileView_Android.jpg";
import LogiqoProfileCustomColorView_Android from "@/components/Projects/Logiqo/Screenshots/ProfileCustomColorView_Android.jpg";

const versionHistory = [
  {
    version: "26.0",
    title: "Cards, Nearby Play & Multiplayer Improvements",
    description:
      "A major Logiqo update expanding card games, nearby multiplayer, match automation, layouts, and overall polish across the app.",
    items: [
      "Added more card game support, including Blackjack, War, Poker, and Solitaire improvements.",
      "Added Nearby Play support for select multiplayer games.",
      "Improved online and nearby multiplayer flows.",
      "Added automatic move support for timed online and nearby matches.",
      "Updated game mode screens for a more consistent experience.",
      "Improved layouts for card games and landscape play.",
      "Added new visuals, polish, and quality-of-life fixes across the app.",
    ],
  },
  {
    version: "1.0",
    title: "Initial Release",
    description:
      "The first release of Logiqo brought puzzles, classic board games, daily challenges, profiles, customization, and multiple ways to play together in one app.",
    items: [
      "Play Sudoku, Word Search, Crossword, Trivia, Flowword, and Minesweeper.",
      "Play classic strategy games including Chess, Checkers, Tic Tac Toe, Connect Four, and Battleship.",
      "Take on daily puzzles and build your streak.",
      "Save supported games and continue where you left off.",
      "Customize colors and visual styles throughout the app.",
      "Use helpful hints when you get stuck.",
      "Track player profiles, stats, wins, and game progress.",
      "Play supported games solo, locally, or online.",
    ],
  },
];

function WhatsNewSection() {
  const [selectedVersion, setSelectedVersion] = useState(
    versionHistory[0].version
  );

  const selected = useMemo(
    () =>
      versionHistory.find((item) => item.version === selectedVersion) ??
      versionHistory[0],
    [selectedVersion]
  );

  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/4 p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-(--accent)">
            Version History
          </p>

          <h3 className="text-xl font-bold text-white">What’s New</h3>

          <p className="mt-1 text-sm text-slate-400">
            Explore the latest Logiqo updates and improvements.
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

  const screenshots = [
    LogiqoHomeView_iOS,
    LogiqoHomeViewScrolledMid_iOS,
    LogiqoHomeViewScrolledBottom_iOS,
    LogiqoDailyView_iOS,
    LogiqoDailyViewScrolled_iOS,
    LogiqoHowToPlayView_iOS,
    LogiqoSettingsView_iOS,
    LogiqoUsernameView_iOS,
    LogiqoProfileView_iOS,
    LogiqoProfileViewEditMode_iOS,
    LogiqoHomeView_Android,
    LogiqoDailyView_Android,
    LogiqoHowToPlayView_Android,
    LogiqoOnlineGameView_Android,
    LogiqoProfileView_Android,
    LogiqoProfileCustomColorView_Android,
  ];

  return (
    <ProjectPage
      showArrows={showArrows}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      appName="Logiqo"
      title="Logiqo"
      titleLink="https://apps.apple.com/us/app/logiqo/id6752290923"
      icon={AppImages.logiqo}
      iconAlt="Logiqo app icon"
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
          href: "https://apps.apple.com/us/app/logiqo/id6752290923",
          variant: "primary",
        },
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.devzano.Logiqo",
          variant: "secondary",
        },
        {
          label: "Send Feedback",
          onClick: openFeedback,
          variant: "secondary",
        },
      ]}
      description={
        <div className="space-y-4 leading-relaxed">
          <p>
            <strong>
              Sharpen your mind with puzzles, word games, classic strategy
              games, and card games, all in one app.
            </strong>
          </p>

          <p>
            <span className="font-semibold text-(--accent)">Logiqo</span>{" "}
            brings together quick brain teasers, daily challenges, timeless
            board games, and familiar card games in a modern design built for
            focused play.
          </p>

          <p>
            Play everything from Sudoku, Word Search, Crossword, Trivia,
            Flowword, and Minesweeper to Chess, Checkers, Tic Tac Toe, Connect
            Four, and Battleship. Jump into the card table for Solitaire,
            Blackjack, War, Poker, and fast-paced UNO-style matches.
          </p>

          <p>
            Play solo against CPU opponents, share one device with local
            pass-and-play, compete online through rooms and matchmaking, or use
            Nearby Play in supported games.
          </p>

          <p>
            Whether you want a quick puzzle, a classic strategy match, or a
            card table with friends, Logiqo is built to be your pocket logic
            playground.
          </p>

          <WhatsNewSection />
        </div>
      }
      featureTitle="Highlights"
      features={[
        <>
          <strong className="text-slate-100">
            Puzzles, strategy &amp; cards:
          </strong>{" "}
          Play Sudoku, Crossword, Chess, Battleship, Solitaire, Blackjack,
          Poker, and much more.
        </>,
        <>
          <strong className="text-slate-100">
            Multiple ways to play:
          </strong>{" "}
          Solo CPU matches, local pass-and-play, online multiplayer, and Nearby
          Play for supported games.
        </>,
        <>
          <strong className="text-slate-100">
            Daily puzzles &amp; streaks:
          </strong>{" "}
          Take on fresh challenges and build your streak over time.
        </>,
        <>
          <strong className="text-slate-100">
            Save &amp; continue:
          </strong>{" "}
          Leave a game and pick up right where you left off.
        </>,
        <>
          <strong className="text-slate-100">
            Custom colors &amp; styles:
          </strong>{" "}
          Personalize boards, pieces, cards, and the overall app experience.
        </>,
        <>
          <strong className="text-slate-100">
            Player profiles &amp; stats:
          </strong>{" "}
          Keep track of your games, progress, wins, and performance.
        </>,
        <>
          <strong className="text-slate-100">
            Difficulty for every player:
          </strong>{" "}
          Choose from casual challenges to tougher modes built to test your
          skills.
        </>,
        <>
          <strong className="text-slate-100">Helpful hints:</strong>{" "}
          Get a nudge when you need help without taking over the game.
        </>,
        <>
          <strong className="text-slate-100">
            Smooth, focused experience:
          </strong>{" "}
          Polished layouts, animations, and distraction-free design across
          phones and tablets.
        </>,
      ]}
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
          src: AppImages.expo,
          alt: "Expo",
          href: "https://docs.expo.dev/",
        },
        {
          src: AppImages.firebase,
          alt: "Firebase",
          href: "https://firebase.google.com/",
        },
        {
          src: AppImages.termsConditions,
          alt: "Terms",
          onClick: () => router.push("/logiqo/terms"),
        },
        {
          src: AppImages.privacyPolicy,
          alt: "Privacy",
          onClick: () => router.push("/logiqo/privacy"),
        },
      ]}
    />
  );
}