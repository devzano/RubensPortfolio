// src/components/Project/ProjectHeader.tsx
"use client";

import React from "react";
import Link from "next/link";

type ActionSpec = {
  label: string;
  onClick?: () => void;
  href?: string;        // if given, we render a link instead of a button
  external?: boolean;   // forces target=_blank for external links
  variant?: "primary" | "secondary" | "accent" | "ghost";
};

export type ProjectHeaderProps = {
  title: string;
  titleLink?: string;          // optional link on the title (shows the small ↗)
  showArrows?: boolean;        // show prev/next chevrons (for slider)
  nextSlide?: () => void;
  prevSlide?: () => void;
  actions?: ActionSpec[];      // row of buttons under the title
  subtle?: React.ReactNode;    // small italic/subtle text under the actions
  className?: string;
};

const classesForVariant = (v: ActionSpec["variant"]) => {
  switch (v) {
    case "primary":
      return "rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5 hover:shadow-indigo-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70";
    case "accent":
      return "rounded-full bg-gradient-to-br from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5 hover:shadow-blue-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70";
    case "ghost":
      return "rounded-full bg-transparent px-5 py-2.5 text-sm font-semibold text-slate-100/80 transition hover:-translate-y-0.5 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70";
    case "secondary":
    default:
      return "rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 shadow-lg shadow-black/20 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70";
  }
};

function ActionButton({ a }: { a: ActionSpec }) {
  const base =
  "relative will-change-transform hover:ring-4 hover:ring-sky-400/15 hover:alien-float";

  const cls = `${classesForVariant(a.variant)} ${base}`;

  if (a.href) {
    const isExternal = a.external ?? /^https?:\/\//i.test(a.href);
    return isExternal ? (
      <a href={a.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {a.label}
      </a>
    ) : (
      <Link href={a.href} className={cls}>
        {a.label}
      </Link>
    );
  }
  return (
    <button type="button" onClick={a.onClick} className={cls}>
      {a.label}
    </button>
  );
}

export default function ProjectHeader({
  title,
  titleLink,
  showArrows = false,
  nextSlide = () => {},
  prevSlide = () => {},
  actions = [],
  subtle,
  className = "",
}: ProjectHeaderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* --- Neon beam + halo (decorative) --- */}
      <span
        aria-hidden
        className="
          pointer-events-none absolute inset-x-0 -top-10 -z-10 mx-auto
          h-28 w-[min(90vw,52rem)]
          rounded-[40%]
          bg-[radial-gradient(closest-side,rgba(56,189,248,.22),rgba(99,102,241,.14),transparent_70%)]
          blur-3xl
          md:h-32
          md:blur-[52px]
          mix-blend-screen
        "
      />
      {/* slight conic beam to add directionality */}
      <span
        aria-hidden
        className="
          pointer-events-none absolute left-1/2 top-2 -z-10
          h-40 w-40 -translate-x-1/2 rotate-12
          bg-[conic-gradient(from_210deg_at_50%_50%,rgba(56,189,248,.30),rgba(139,92,246,.22),transparent_70%)]
          blur-2xl opacity-80
          md:h-48 md:w-48 md:blur-3xl
          mix-blend-screen
        "
      />

      {/* Title + arrows */}
      <div className="mb-8 flex w-full items-center justify-center">
        <div className="flex max-w-full flex-nowrap items-center gap-4">
          {/* Left chevron */}
          <button
            className={`h-12 w-12 shrink-0 rounded-full border border-white/10 bg-white/5 text-slate-200 shadow-lg shadow-black/20 backdrop-blur-md transition hover:scale-110 hover:text-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 ${showArrows ? "" : "invisible"} hover:ring-2 hover:ring-sky-400/30`}
            onClick={prevSlide}
            aria-label="Previous Project"
          >
            <span className="select-none text-3xl leading-none">‹</span>
          </button>

          {/* Title */}
          <h1 className="relative min-w-0 text-center">
            <span
              aria-hidden
              className="
                pointer-events-none absolute inset-x-6 -top-3 -z-10
                h-10 rounded-full
                bg-gradient-to-r from-sky-400/25 via-blue-500/15 to-violet-500/25
                blur-xl
              "
            />
            {titleLink ? (
              <a
                href={titleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex max-w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 shadow-lg shadow-black/20 ring-1 ring-white/10 backdrop-blur-md"
              >
                <span className="bg-gradient-to-br from-sky-300 via-sky-400 to-violet-400 bg-clip-text text-transparent text-2xl font-semibold tracking-tight sm:text-3xl whitespace-nowrap">
                  {title}
                </span>
                {/* tiny ↗ hint */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="ml-2 hidden h-4 w-4 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 sm:block"
                >
                  <path
                    d="M7 17L17 7M9 7h8v8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* subtle hover halo to match tiles/buttons */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full ring-0 ring-sky-400/0 transition-all duration-300 group-hover:ring-8 group-hover:ring-sky-400/10"
                />
              </a>
            ) : (
              <span className="relative inline-flex max-w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 shadow-lg shadow-black/20 ring-1 ring-white/10 backdrop-blur-md">
                <span className="bg-gradient-to-br from-sky-300 via-sky-400 to-violet-400 bg-clip-text text-transparent text-2xl font-semibold tracking-tight sm:text-3xl whitespace-nowrap">
                  {title}
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full ring-0 ring-sky-400/0 transition-all duration-300 hover:ring-8 hover:ring-sky-400/10"
                />
              </span>
            )}

            {/* subtle gradient underline */}
            <span className="pointer-events-none absolute inset-x-8 -bottom-1 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
          </h1>

          {/* Right chevron */}
          <button
            className={`h-12 w-12 shrink-0 rounded-full border border-white/10 bg-white/5 text-slate-200 shadow-lg shadow-black/20 backdrop-blur-md transition hover:scale-110 hover:text-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 ${showArrows ? "" : "invisible"} hover:ring-2 hover:ring-sky-400/30`}
            onClick={nextSlide}
            aria-label="Next Project"
          >
            <span className="select-none text-3xl leading-none">›</span>
          </button>
        </div>
      </div>

      {/* Actions */}
      {actions.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
          {actions.map((a, i) => (
            <ActionButton key={`${a.label}-${i}`} a={a} />
          ))}
        </div>
      )}

      {/* Subtle text */}
      {subtle && (
        <div className="mb-6 text-center">
          <div className="italic text-sky-400/90">{subtle}</div>
        </div>
      )}
    </div>
  );
}
