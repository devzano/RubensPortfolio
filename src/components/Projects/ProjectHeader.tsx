// src/components/Project/ProjectHeader.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";

type ActionSpec = {
  label: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "accent" | "ghost";
};

export type ProjectHeaderProps = {
  title: string;
  titleLink?: string;
  showArrows?: boolean;
  nextSlide?: () => void;
  prevSlide?: () => void;
  actions?: ActionSpec[];
  subtle?: React.ReactNode;
  className?: string;

  // icon (already requested)
  icon?: StaticImageData | string;
  iconAlt?: string;
};

const classesForVariant = (v: ActionSpec["variant"]) => {
  switch (v) {
    case "primary":
      return "rounded-full bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-deep)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2";
    case "accent":
      return "rounded-full bg-gradient-to-br from-[color:var(--accent-light)] to-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2";
    case "ghost":
      return "rounded-full bg-transparent px-5 py-2.5 text-sm font-semibold text-slate-100/80 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2";
    case "secondary":
    default:
      return "rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 shadow-lg shadow-black/20 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[color:var(--accent-soft)] hover:bg-white/10 focus:outline-none focus-visible:ring-2";
  }
};

function ActionButton({ a }: { a: ActionSpec; }) {
  const base =
    "relative will-change-transform hover:ring-4 hover:ring-[var(--accent-softer)] hover:alien-float";
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
  nextSlide = () => { },
  prevSlide = () => { },
  actions = [],
  subtle,
  className = "",
  icon,
  iconAlt,
}: ProjectHeaderProps) {
  const iconNode = icon ? (
    <span className="mr-2 inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/10 shadow-sm">
      <Image
        src={icon}
        alt={iconAlt ?? `${title} icon`}
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
        draggable={false}
        priority
      />
    </span>
  ) : null;

  return (
    <div className={`relative ${className}`}>
      {/* beams use accent vars */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 -z-10 mx-auto h-28 w-[min(90vw,52rem)] rounded-[40%] blur-3xl md:h-32 md:blur-[52px] mix-blend-screen"
        style={{
          background: `radial-gradient(closest-side, var(--accent-softer), var(--accent-soft), transparent 70%)`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-2 -z-10 h-40 w-40 -translate-x-1/2 rotate-12 blur-2xl opacity-80 md:h-48 md:w-48 md:blur-3xl mix-blend-screen"
        style={{
          background: `conic-gradient(from 210deg at 50% 50%, var(--accent-soft), var(--accent-softer), transparent 70%)`,
        }}
      />

      {/* Title + arrows */}
      <div className="mb-8 flex w-full items-center justify-center">
        <div className="flex max-w-full flex-nowrap items-center gap-4">
          {/* Left chevron */}
          <button
            className={`h-12 w-12 shrink-0 rounded-full border border-white/10 bg-white/5 text-slate-200 shadow-lg shadow-black/20 backdrop-blur-md transition hover:scale-110 hover:alien-float focus:outline-none focus-visible:ring-2 ${showArrows ? "" : "invisible"}`}
            onClick={prevSlide}
            aria-label="Previous Project"
            style={{ color: "var(--accent)" }}
            title="Previous"
          >
            <span className="select-none text-3xl leading-none">‹</span>
          </button>

          {/* Title pill */}
          <h1 className="relative min-w-0 text-center">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-6 -top-3 -z-10 h-10 rounded-full blur-xl"
              style={{
                background: `linear-gradient(to right, var(--accent-soft), var(--accent-softer))`,
              }}
            />
            {titleLink ? (
              <a
                href={titleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex max-w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 shadow-lg shadow-black/20 ring-1 ring-white/10 backdrop-blur-md"
              >
                {iconNode}
                <span
                  className="bg-clip-text text-transparent text-2xl font-semibold tracking-tight sm:text-3xl whitespace-nowrap"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--accent-light), var(--accent), var(--accent-deep))`,
                  }}
                >
                  {title}
                </span>
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
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full ring-0 transition-all duration-300 group-hover:ring-8"
                  style={{ boxShadow: "0 0 0 0 var(--accent-soft)" }}
                />
              </a>
            ) : (
              <span className="relative inline-flex max-w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 shadow-lg shadow-black/20 ring-1 ring-white/10 backdrop-blur-md">
                {iconNode}
                <span
                  className="bg-clip-text text-transparent text-2xl font-semibold tracking-tight sm:text-3xl whitespace-nowrap"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--accent-light), var(--accent), var(--accent-deep))`,
                  }}
                >
                  {title}
                </span>
              </span>
            )}
            <span
              className="pointer-events-none absolute inset-x-8 -bottom-1 h-px"
              style={{
                background: `linear-gradient(to right, transparent, var(--accent-deep), transparent)`,
                opacity: 0.6,
              }}
            />
          </h1>

          {/* Right chevron */}
          <button
            className={`h-12 w-12 shrink-0 rounded-full border border-white/10 bg-white/5 text-slate-200 shadow-lg shadow-black/20 backdrop-blur-md transition hover:scale-110 focus:outline-none focus-visible:ring-2 ${showArrows ? "" : "invisible"}`}
            onClick={nextSlide}
            aria-label="Next Project"
            style={{ color: "var(--accent)" }}
            title="Next"
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
          <div className="italic" style={{ color: "var(--accent-deep)" }}>
            {subtle}
          </div>
        </div>
      )}
    </div>
  );
}
