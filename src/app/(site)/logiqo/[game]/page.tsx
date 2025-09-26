"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import useIconAccent from "@/hooks/useIconAccent";
import AppImages from "@/constants/images";

const KNOWN = new Set(["tictactoe", "connectfour", "checkers", "chess"]);

export default function InvitePage({ params }: { params: { game: string; }; }) {
  const { game } = params;
  const sp = useSearchParams();
  const room = sp.get("room") ?? "";
  const auto = sp.get("open") === "1";
  const isKnown = KNOWN.has(game);

  // 🔹 derive accent from the Logiqo icon
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
    }, 1500);

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

  return (
    <main
      style={{
        ...cssVars, // ← exposes --accent, --accent-light, etc.
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <h1 style={{ marginBottom: 8 }}>Open in Logiqo</h1>
        <p style={{ opacity: 0.8, marginBottom: 16 }}>
          You’re joining <b>{game}</b>
          {room ? <> — room <code>{room}</code></> : null}.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {/* Uses the accent via CSS vars */}
          <button onClick={tryOpenApp} style={btnPrimary}>Open in app</button>
          <a href={storeUrl} target="_blank" rel="noopener noreferrer" style={btnSecondary}>Get the app</a>
          <Link href="/logiqo" style={btnGhost}>About Logiqo</Link>
        </div>
      </div>
    </main>
  );
}

const btnPrimary: React.CSSProperties = {
  padding: "10px 14px",
  background: "var(--accent)",
  color: "#fff",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 600,
  border: "1px solid var(--accent)",
};
const btnSecondary: React.CSSProperties = {
  padding: "10px 14px",
  background: "var(--accent-soft)",
  color: "#fff",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 600,
  border: "1px solid var(--accent-softer)",
};
const btnGhost: React.CSSProperties = {
  padding: "10px 14px",
  background: "var(--accent-soft)",
  color: "#fff",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 600,
  border: "1px solid var(--accent-softer)",
};