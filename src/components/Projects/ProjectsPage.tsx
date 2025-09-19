// src/components/projects/ProjectPage.tsx
"use client";

import React, { useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ProjectHeader, { type ProjectHeaderProps } from "@/components/Projects/ProjectHeader";
import ScreenshotGridRotator, { type ScreenshotGridRotatorProps } from "@/components/Projects/ScreenshotGridRotator";
import FeedbackModal from "@/components/MailForm/FeedbackModal";
import useIconAccent from "@/hooks/useIconAccent";

export type BuiltWithLogo = {
  src: StaticImageData | string;
  alt: string;
  href?: string;
  onClick?: () => void;
};

export type ProjectPageProps = {
  title: string;
  titleLink?: string;
  showArrows?: boolean;
  nextSlide?: ProjectHeaderProps["nextSlide"];
  prevSlide?: ProjectHeaderProps["prevSlide"];
  subtle?: React.ReactNode;
  icon?: StaticImageData | string;
  iconAlt?: string;
  autoThemeFromIcon?: boolean;
  themeFallback?: string;
  appName: string;
  actions?:
    | ProjectHeaderProps["actions"]
    | ((helpers: { openFeedback: () => void }) => ProjectHeaderProps["actions"]);
  screenshots: (StaticImageData | string)[];
  screenshotProps?: Partial<ScreenshotGridRotatorProps>;
  description?: React.ReactNode;
  featureTitle?: string;
  features?: React.ReactNode[];
  builtWith?: BuiltWithLogo[];
  className?: string;
};

export default function ProjectPage({
  title,
  titleLink,
  showArrows = false,
  nextSlide,
  prevSlide,
  subtle,
  icon,
  iconAlt,
  autoThemeFromIcon = true,
  themeFallback = "#6366F1",
  appName,
  actions,
  screenshots,
  screenshotProps,
  description,
  featureTitle = "Features",
  features,
  builtWith = [],
  className = "",
}: ProjectPageProps) {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const openFeedback = () => setIsFeedbackModalOpen(true);

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName, ...feedback }),
      });
      if (res.ok) {
        alert("Feedback sent successfully!");
        setIsFeedbackModalOpen(false);
        setFeedback({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        alert("Failed to send feedback. Please try again later.");
      }
    } catch {
      alert("Error sending feedback. Please try again later.");
    }
  };

  const headerActions = useMemo(() => {
    if (typeof actions === "function") return actions({ openFeedback });
    return actions ?? [];
  }, [actions]);

  const { cssVars } = useIconAccent(autoThemeFromIcon ? icon : undefined, {
    fallback: themeFallback,
  });

  return (
    <div
      className={`relative mx-auto max-w-6xl px-4 py-12 sm:py-16 ${className}`}
      style={autoThemeFromIcon ? cssVars : undefined}
    >
      <ProjectHeader
        title={title}
        titleLink={titleLink}
        showArrows={showArrows}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        actions={headerActions}
        subtle={subtle}
        icon={icon}
        iconAlt={iconAlt}
      />

      <div className="mx-auto w-full">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-md ring-1 ring-white/10">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4 shadow-inner">
            <ScreenshotGridRotator
              images={screenshots}
              intervalMs={4000}
              cols={{ mobile: 2, desktop: 4 }}
              aspect="9/19"
              sizes="(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 240px"
              deferUntilMounted
              {...screenshotProps}
            />
          </div>

          {(description || (features && features.length > 0)) && (
            <div className="mx-auto mt-6 max-w-5xl rounded-xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-lg shadow-black/20">
              {description && <div className="leading-relaxed">{description}</div>}

              {features && features.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-2 text-lg font-semibold text-slate-100">Features</h3>
                  <ul className="list-disc space-y-2 pl-6 text-slate-300 marker:[color:var(--accent-deep)]">
                    {features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {builtWith.length > 0 && (
            <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-4">
              {builtWith.map((logo, i) => {
                const img = (
                  <Image
                    key={i}
                    src={logo.src}
                    alt={logo.alt}
                    width={44}
                    height={44}
                    className="h-11 w-11 select-none rounded-md object-contain opacity-90 grayscale transition hover:scale-105 hover:opacity-100 hover:grayscale-0"
                    draggable={false}
                  />
                );
                return (
                  <span key={`${logo.alt}-${i}`} className="inline-block">
                    {logo.href ? (
                      <Link href={logo.href} target={/^https?:\/\//i.test(logo.href) ? "_blank" : undefined}>
                        {img}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={logo.onClick}
                        className="cursor-pointer"
                        aria-label={logo.alt}
                        title={logo.alt}
                      >
                        {img}
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback as any}
        appName={appName}
      />
    </div>
  );
}