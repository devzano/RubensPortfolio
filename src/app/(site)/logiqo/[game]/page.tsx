"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { notFound, useSearchParams } from "next/navigation";

import useIconAccent from "@/hooks/useIconAccent";
import AppImages from "@/constants/images";

const KNOWN = ["tictactoe", "connectfour", "checkers", "chess", "battleship"] as const;
type KnownGame = (typeof KNOWN)[number];
const KNOWN_SET = new Set<KnownGame>(KNOWN);

const GAME_META: Record<KnownGame, { title: string; bg: StaticImageData; }> = {
  tictactoe: { title: "Tic Tac Toe", bg: AppImages.logiqoTicTacToe },
  connectfour: { title: "Connect Four", bg: AppImages.logiqoConnectFour },
  checkers: { title: "Checkers", bg: AppImages.logiqoCheckers },
  chess: { title: "Chess", bg: AppImages.logiqoChess },
  battleship: { title: "Battleship", bg: AppImages.logiqoBattleship },
};

const HOW_TO_BULLETS: Partial<Record<KnownGame, string[]>> = {
  tictactoe: [
    "Tap an empty cell to place your mark.",
    "Get three in a row or block your opponent.",
    "Create forks to threaten multiple wins.",
  ],
  connectfour: [
    "Tap a column to drop your disc.",
    "Connect four in any direction.",
    "Block threats while setting up two-ways.",
  ],
  checkers: [
    "Move diagonally on dark squares.",
    "Jump to capture; must-jump is on by default.",
    "Reach the end to crown a king.",
  ],
  chess: [
    "Control the center and develop pieces.",
    "Castle early; watch tactics and pins.",
    "Checkmate the opposing king to win.",
  ],
  battleship: [
    "Place ships without overlaps, all within bounds.",
    "Call shots to find and sink enemy ships.",
    "Sink the entire fleet to win.",
  ],
};

export default function InvitePage({ params }: { params: { game: string; }; }) {
  const { game } = params;
  const sp = useSearchParams();
  const room = sp.get("room") ?? "";
  const auto = sp.get("open") === "1";
  const isKnown = KNOWN_SET.has(game as KnownGame);

  const { cssVars } = useIconAccent(AppImages.logiqo, { fallback: "#6366F1" });

  const storeUrl = useMemo(() => {
    if (typeof navigator === "undefined") return "/logiqo";
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) return "https://play.google.com/store/apps/details?id=com.devzano.Logiqo";
    if (/iPhone|iPad|iPod/i.test(ua)) return "https://apps.apple.com/us/app/logiqo/id6752290923";
    return "/logiqo";
  }, []);

  const schemeUrl = useMemo(() => {
    const qp = room ? `?room=${encodeURIComponent(room)}` : "";
    return `logiqo://${game}${qp}`;
  }, [game, room]);

  // Deep link; if it doesn’t open (tab stays visible), redirect to store
  const tryOpenApp = useCallback(() => {
    const toStore = setTimeout(() => {
      if (document.visibilityState === "hidden") return;
      window.location.href = storeUrl;
    }, 1200);

    const onVis = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(toStore);
        document.removeEventListener("visibilitychange", onVis);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    window.location.href = schemeUrl;
  }, [schemeUrl, storeUrl]);

  useEffect(() => {
    if (auto && room && isKnown) tryOpenApp();
  }, [auto, room, isKnown, tryOpenApp]);

  if (!isKnown) notFound();
  const meta = GAME_META[game as KnownGame];
  const bullets = HOW_TO_BULLETS[game as KnownGame] ?? [];

  return (
    <main
      style={cssVars}
      className="
        w-full min-h-dvh
        bg-gradient-to-b from-[var(--accent-verysoft,rgba(99,102,241,0.05))] to-transparent
        flex items-center justify-center
        px-4 sm:px-6 md:px-8 py-8 sm:py-12
      "
    >
      {/* Card */}
      <section
        aria-label={`${meta.title} invite`}
        className="
          w-full max-w-xl md:max-w-3xl
          rounded-3xl overflow-hidden
          ring-1 ring-[var(--accent-softer,rgba(99,102,241,0.20))]
          shadow-2xl bg-black/20 backdrop-blur-[2px]
        "
      >
        {/* TOP: hero background + title pill */}
        <div className="relative w-full h-40 sm:h-48 md:h-56">
          <Image
            src={meta.bg}
            alt={`${meta.title} background`}
            fill
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span
              className="inline-block px-2.5 py-1 rounded-lg font-bold text-[11px] sm:text-[12px] text-black"
              style={{ background: "var(--accent, #6366F1)" }}
            >
              {meta.title}
            </span>
          </div>
        </div>

        {/* BOTTOM: row = logo | (info + buttons), then How to underneath */}
        <div className="p-4 sm:p-5 md:p-6">
          {/* Row: logo + right side */}
          <div className="flex items-start gap-3 sm:gap-4">
            {/* logo */}
            <div
              className="
                shrink-0 rounded-2xl overflow-hidden
                w-16 h-16 sm:w-14 sm:h-14 md:w-16 md:h-16
                ring-1 ring-black/10 dark:ring-white/15 bg-white/10
              "
            >
              <Image
                src={AppImages.logiqo}
                alt="Logiqo app icon"
                width={64}
                height={64}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* right: info + buttons */}
            <div className="min-w-0 flex-1">
              <p className="m-0 text-sm sm:text-[15px] text-white/85">
                Open in <span className="font-semibold">Logiqo</span>
                {room ? (
                  <>
                    {" "}
                    — room <code className="px-1 rounded bg-white/15 text-white/95">{room}</code>
                  </>
                ) : null}
                .
              </p>

              {/* buttons side-by-side */}
              <div className="mt-2 flex flex-row gap-2">
                <button
                  onClick={tryOpenApp}
                  className="
                    inline-flex items-center justify-center
                    px-3 py-2 rounded-lg text-[15px] font-semibold
                    bg-[var(--accent,#6366F1)] text-white
                    ring-1 ring-[var(--accent,#6366F1)]
                    active:scale-[0.985] transition
                  "
                >
                  Open In App
                </button>

                <Link
                  href="/logiqo"
                  className="
                    inline-flex items-center justify-center
                    px-3 py-2 rounded-lg text-[15px] font-semibold
                    bg-transparent text-white
                    ring-1 ring-white/25
                    active:scale-[0.985] transition
                  "
                >
                  About
                </Link>
              </div>
            </div>
          </div>

          {/* How to underneath (full width) */}
          {bullets.length > 0 && (
            <section aria-labelledby="howto" className="mt-6 rounded-xl bg-white/5 dark:bg-white/5 ring-1 ring-white/10 backdrop-blur-[2px] p-3 sm:p-4">
              {/* Header */}
              <div className="flex items-center gap-2">
                {/* Accent icon */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: "var(--accent, #6366F1)" }}
                >
                  <path
                    fill="currentColor"
                    d="M9 21h6v-1.5H9V21Zm3-19C7.92 2 5 4.92 5 8.5c0 2.28 1.2 4.28 3 5.39V16c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.11c1.8-1.11 3-3.11 3-5.39C19 4.92 16.08 2 12 2Z"
                  />
                </svg>
                <h2 id="howto" className="m-0 text-[13px] sm:text-[14px] font-semibold text-white/95">
                  How to play
                </h2>
              </div>

              {/* Bullets */}
              <ul className=" mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 list-none"
              >
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="w-1.5 h-1.5 mt-[7px] rounded-full shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                    <span className="text-[13px] sm:text-[14px] leading-relaxed text-white/85">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}