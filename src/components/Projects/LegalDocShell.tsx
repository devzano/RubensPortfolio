// src/components/Projects/LegalDocShell.tsx
"use client";
import React from "react";

export default function LegalDocShell({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <article className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-slate-200 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-md">
        <header className="mb-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-slate-400">Last updated: {lastUpdated}</p>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
        </header>
        <section className="space-y-6 leading-relaxed">{children}</section>
      </article>
    </main>
  );
}