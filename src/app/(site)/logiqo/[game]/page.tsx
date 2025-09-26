"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

const KNOWN = new Set(["tictactoe", "connectfour", "checkers", "chess"]);

export default function InvitePage({ params }: { params: { game: string } }) {
  const { game } = params;

  // Hooks must be called unconditionally
  const sp = useSearchParams();
  const room = sp.get("room") ?? "";
  const isKnown = KNOWN.has(game);

  const schemeUrl = useMemo(() => {
    const qp = room ? `?room=${encodeURIComponent(room)}` : "";
    return `logiqo://${game}${qp}`;
  }, [game, room]);

  const storeUrl = useMemo(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent;
      if (/Android/i.test(ua))
        return "https://play.google.com/store/apps/details?id=com.devzano.Logiqo";
      if (/iPhone|iPad|iPod/i.test(ua))
        return "https://apps.apple.com/us/app/logiqo/id6752290923";
    }
    return "/logiqo";
  }, []);

  useEffect(() => {
    if (!room || !isKnown) return;
    const t = setTimeout(() => {
      window.location.href = storeUrl;
    }, 1200);
    window.location.href = schemeUrl;
    return () => clearTimeout(t);
  }, [room, isKnown, storeUrl, schemeUrl]);

  // Call after hooks so it isn't conditional
  if (!isKnown) notFound();

  return (
    <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ maxWidth: 520 }}>
        <h1 style={{ marginBottom: 8 }}>Open in Logiqo</h1>
        <p style={{ opacity: 0.8, marginBottom: 16 }}>
          You’re joining <b>{game}</b>
          {room ? (
            <>
              {" "}
              — room <code>{room}</code>
            </>
          ) : null}
          .
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {/* External/Custom scheme can be <a> */}
          <a href={schemeUrl} style={btnPrimary}>
            Open the app
          </a>
          <a href={storeUrl} style={btnSecondary} target="_blank" rel="noopener noreferrer">
            Get the app
          </a>
          {/* Internal route must use <Link /> */}
          <Link href="/logiqo" style={btnGhost}>
            About Logiqo
          </Link>
        </div>
      </div>
    </main>
  );
}

const btnPrimary: React.CSSProperties = {
  padding: "10px 14px",
  background: "#111",
  color: "#fff",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 600,
};
const btnSecondary: React.CSSProperties = {
  padding: "10px 14px",
  background: "#eee",
  color: "#111",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 600,
};
const btnGhost: React.CSSProperties = {
  padding: "10px 14px",
  background: "transparent",
  color: "#111",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 600,
  border: "1px solid #ddd",
};