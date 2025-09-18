// src/components/System/ErrorShell.tsx
"use client";

import FXAndNav from "@/components/Home/FXAndNav";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  message: React.ReactNode;
  showHome?: boolean;
  children?: React.ReactNode; // extra actions (e.g., Try again)
};

export default function ErrorShell({ title, message, showHome = true, children }: Props) {
  return (
    <div className="error-page relative min-h-screen bg-transparent">
      <FXAndNav />

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-md ring-1 ring-white/10">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
            <span className="bg-gradient-to-br from-sky-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          <p className="mt-3 text-slate-300">{message}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {showHome && (
              <Link
                href="/"
                className="home-link rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 shadow-lg shadow-black/20 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
              >
                Back to home
              </Link>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}