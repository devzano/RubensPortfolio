"use client";

import React, { useEffect, useMemo } from "react";
import { notFound, useSearchParams } from "next/navigation";

const KNOWN = new Set(["tictactoe", "connectfour", "checkers", "chess"]);

export default function InvitePage({ params }: { params: { game: string } }) {
  const { game } = params;
  if (!KNOWN.has(game)) return notFound();

  const sp = useSearchParams();
  const room = sp.get("room") ?? "";

  // Deep link into the app (your scheme)
  const schemeUrl = useMemo(() => {
    const qp = room ? `?room=${encodeURIComponent(room)}` : "";
    return `logiqo://${game}${qp}`;
  }, [game, room]);

  // Store fallback
  const storeUrl = useMemo(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    if (isAndroid) return "https://play.google.com/store/apps/details?id=com.devzano.Logiqo";
    if (isIOS)    return "https://apps.apple.com/us/app/logiqo/id6752290923";
    return "/logiqo";
  }, []);

  // Try to open the app automatically when a room is present
  useEffect(() => {
    if (!room) return;
    const t = setTimeout(() => { window.location.href = storeUrl; }, 1200);
    window.location.href = schemeUrl;
    return () => clearTimeout(t);
  }, [schemeUrl, storeUrl, room]);

  return (
    <main style={{minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem"}}>
      <div style={{maxWidth:520}}>
        <h1 style={{marginBottom:8}}>Open in Logiqo</h1>
        <p style={{opacity:.8, marginBottom:16}}>
          You’re joining <b>{game}</b>{room ? <> — room <code>{room}</code></> : null}.
        </p>
        <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
          <a href={schemeUrl} style={btnPrimary}>Open the app</a>
          <a href={storeUrl}  style={btnSecondary}>Get the app</a>
          <a href="/logiqo"   style={btnGhost}>About Logiqo</a>
        </div>
      </div>
    </main>
  );
}

const btnPrimary: React.CSSProperties = {
  padding:"10px 14px", background:"#111", color:"#fff",
  borderRadius:12, textDecoration:"none", fontWeight:600
};
const btnSecondary: React.CSSProperties = {
  padding:"10px 14px", background:"#eee", color:"#111",
  borderRadius:12, textDecoration:"none", fontWeight:600
};
const btnGhost: React.CSSProperties = {
  padding:"10px 14px", background:"transparent", color:"#111",
  borderRadius:12, textDecoration:"none", fontWeight:600, border:"1px solid #ddd"
};