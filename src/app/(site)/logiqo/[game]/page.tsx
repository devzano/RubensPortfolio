"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";

import useIconAccent from "@/hooks/useIconAccent";
import AppImages from "@/constants/images";

const KNOWN = ["tictactoe", "connectfour", "checkers", "chess", "battleship"] as const;
type KnownGame = (typeof KNOWN)[number];
const KNOWN_SET = new Set<KnownGame>(KNOWN);

const GAME_META: Record<KnownGame, { title: string; bg: any }> = {
  tictactoe:   { title: "Tic Tac Toe",   bg: AppImages.logiqoTicTacToe },
  connectfour: { title: "Connect Four",  bg: AppImages.logiqoConnectFour },
  checkers:    { title: "Checkers",      bg: AppImages.logiqoCheckers },
  chess:       { title: "Chess",         bg: AppImages.logiqoChess },
  battleship:  { title: "Battleship",    bg: AppImages.logiqoBattleship },
};

export default function InvitePage({ params }: { params: { game: string } }) {
  const { game } = params;
  const sp = useSearchParams();
  const room = sp.get("room") ?? "";
  const auto = sp.get("open") === "1";
  const isKnown = KNOWN_SET.has(game as KnownGame);

  // Accent variables from app icon
  const { cssVars } = useIconAccent(AppImages.logiqo, { fallback: "#6366F1" });

  const schemeUrl = useMemo(() => {
    const qp = room ? `?room=${encodeURIComponent(room)}` : "";
    return `logiqo://${game}${qp}`;
  }, [game, room]);

  const storeUrl = useMemo(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent;
      if (/Android/i.test(ua)) return "https://play.google.com/store/apps/details?id=com.devzano.Logiqo";
      if (/iPhone|iPad|iPod/i.test(ua)) return "https://apps.apple.com/us/app/logiqo/id6752290923";
    }
    return "/logiqo";
  }, []);

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

  return (
    <main
      style={cssVars}
      className="
        w-full min-h-dvh md:min-h-0
        bg-gradient-to-b from-[var(--accent-verysoft,rgba(99,102,241,0.05))] to-transparent
        flex items-start md:items-center justify-center
        px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-16
      "
    >
      {/* Card: background = game image, with dim + vignette */}
      <section
        className="
          relative w-full max-w-xl md:max-w-3xl
          rounded-2xl overflow-hidden
          ring-1 ring-[var(--accent-softer,rgba(99,102,241,0.20))]
          shadow-xl
          aspect-[16/10] sm:aspect-[16/9]
        "
        aria-label={`${meta.title} invite`}
      >
        {/* Background image */}
        <Image
          src={meta.bg}
          alt={`${meta.title} background`}
          fill
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />

        {/* Dim + subtle vignette */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/15 to-transparent" />
        <div className="absolute inset-0 [mask-image:radial-gradient(120%_80%_at_50%_70%,#000_40%,transparent_100%)] bg-black/10" />

        {/* Content row */}
        <div className="absolute inset-0 p-4 sm:p-6 md:p-7 flex items-end">
          <div className="flex w-full items-center gap-3 sm:gap-4">
            {/* App icon */}
            <div
              className="
                shrink-0 rounded-2xl overflow-hidden
                w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                ring-1 ring-white/20 bg-white/10
                backdrop-blur-[2px]
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

            {/* Title + room + actions */}
            <div className="min-w-0 flex-1">
              <h1 className="text-white font-semibold leading-tight text-lg sm:text-xl md:text-2xl m-0">
                {meta.title}
              </h1>
              <p className="text-white/85 text-xs sm:text-sm mt-0.5 mb-2">
                Open in <span className="font-semibold">Logiqo</span>
                {room ? (
                  <>
                    {" "}
                    — room{" "}
                    <code className="px-1 rounded bg-white/15 text-white/95">{room}</code>
                  </>
                ) : null}
                .
              </p>

              <div className="flex flex-wrap gap-2">
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
                  Open in app
                </button>

                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center
                    px-3 py-2 rounded-lg text-[15px] font-semibold
                    bg-white/12 text-white
                    ring-1 ring-white/25
                    active:scale-[0.985] transition
                  "
                >
                  Get the app
                </a>

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
                  About Logiqo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tiny accent stripe at top for brand touch (optional) */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--accent,#6366F1)]/70" />
      </section>
    </main>
  );
}