// src/app/(site)/autoarchive/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import HomeView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_HomeView.png";
import NewVehicleView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_NewVehicleView.png";
import VehicleDetailsView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_VehicleDetailsView.png";
import ServiceLogView from "@/components/Projects/AutoArchive/Screenshots/AutoArchive_ServiceLogView.png";

import FeedbackModal from "@/components/MailForm/FeedbackModal";
import AppImages from "@/constants/images";
import { Feedback, SlideNavProps } from "@/types/types";

export default function Page({
  showArrows = false,
  nextSlide = () => {},
  prevSlide = () => {},
}: SlideNavProps) {
  const screenshots = useMemo(
    () => [HomeView, NewVehicleView, VehicleDetailsView, ServiceLogView],
    []
  );

  const [currentSet, setCurrentSet] = useState(0);
  const [imagesPerSet, setImagesPerSet] = useState(4); // 4 desktop, 2 mobile
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const router = useRouter();

  // responsive columns (2 on <=768px, else 4)
  useEffect(() => {
    const compute = () => setImagesPerSet(window.innerWidth <= 768 ? 2 : 4);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // auto-rotate sets
  useEffect(() => {
    if (!screenshots.length) return;
    const maxSets = Math.ceil(screenshots.length / imagesPerSet);
    const id = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % maxSets);
    }, 4000);
    return () => clearInterval(id);
  }, [screenshots.length, imagesPerSet]);

  const handleAppleStore = () =>
    window.open("https://apps.apple.com/us/app/autoarchive/id6744589503", "_blank");

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName: "AutoArchive", ...feedback }),
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

  const start = currentSet * imagesPerSet;
  const visible = screenshots.slice(start, start + imagesPerSet);

  const BuiltWithLogos = [
    { src: AppImages.githubLight, alt: "GitHub", link: "https://github.com/devzano" },
    { src: AppImages.xcode, alt: "Xcode", link: "https://developer.apple.com/xcode/" },
    { src: AppImages.swiftui, alt: "SwiftUI", link: "https://developer.apple.com/xcode/swiftui/" },
    // pretty URLs intercepted by your @modal routes (and/or standalone pages)
    { src: AppImages.termsConditions, alt: "Terms", onClick: () => router.push("/autoarchive/terms") },
    { src: AppImages.privacyPolicy, alt: "Privacy", onClick: () => router.push("/autoarchive/privacy") },
  ];

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* Title + Arrows */}
      <div className="mb-8 flex w-full items-center justify-center">
        <div className="flex max-w-full flex-nowrap items-center gap-4">
          {/* Left chevron */}
          <button
            className={`h-12 w-12 shrink-0 rounded-full border border-white/10 bg-white/5 text-slate-200 shadow-lg shadow-black/20 backdrop-blur-md transition hover:scale-110 hover:text-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 ${showArrows ? "" : "invisible"}`}
            onClick={prevSlide}
            aria-label="Previous Project"
          >
            <span className="select-none text-3xl leading-none">‹</span>
          </button>

          {/* Title */}
          <h1 className="relative min-w-0 text-center">
            <a
            href="https://apps.apple.com/us/app/autoarchive/id6744589503"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex max-w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 shadow-lg shadow-black/20 ring-1 ring-white/10 backdrop-blur-md"
            >
              <span className="bg-gradient-to-br from-sky-300 via-sky-400 to-violet-400 bg-clip-text text-transparent text-2xl font-semibold tracking-tight sm:text-3xl whitespace-nowrap">
                AutoArchive
              </span>
              {/* tiny ↗ hint (hide on xs to save space) */}
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
            </a>

            {/* subtle gradient underline */}
            <span className="pointer-events-none absolute inset-x-8 -bottom-1 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
          </h1>

          {/* Right chevron */}
          <button
            className={`h-12 w-12 shrink-0 rounded-full border border-white/10 bg-white/5 text-slate-200 shadow-lg shadow-black/20 backdrop-blur-md transition hover:scale-110 hover:text-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 ${showArrows ? "" : "invisible"}`}
            onClick={nextSlide}
            aria-label="Next Project"
          >
            <span className="select-none text-3xl leading-none">›</span>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handleAppleStore}
          className="rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5 hover:shadow-indigo-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
        >
          Apple Store
        </button>
        <button
          onClick={() => setIsFeedbackModalOpen(true)}
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 shadow-lg shadow-black/20 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
        >
          Send Feedback
        </button>
      </div>

      {/* Card */}
      <div className="mx-auto w-full">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-md ring-1 ring-white/10">
          {/* Screenshots grid */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4 shadow-inner">
            <div className={`mx-auto grid max-w-5xl gap-4 ${imagesPerSet === 2 ? "grid-cols-2" : "grid-cols-4"}`}>
              {visible.map((src, i) => (
                <div key={i} className="relative aspect-[9/19] overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  <Image
                    src={src}
                    alt={`AutoArchive View ${start + i + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 240px"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Copy */}
          <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-lg shadow-black/20">
            <p className="leading-relaxed">
              <strong className="font-semibold text-sky-400">
                Stay in control of your car care with <span className="text-sky-400">AutoArchive</span>
              </strong>{" "}
              — your all-in-one app for managing vehicles, maintenance, and service records in one clean place.
            </p>

            <div className="mt-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-100">Highlights</h3>
              <ul className="list-disc space-y-2 pl-6 text-slate-300 marker:text-sky-400">
                <li>Create vehicle profiles; auto-fill make/model/year with VIN.</li>
                <li>Log services with cost, mileage, notes, and multiple photos.</li>
                <li>Track registration, inspection, insurance, oil life, tire pressure, and more.</li>
                <li>Save part numbers for filters, tires, brakes, etc.</li>
                <li>Organize with custom tags and notes; set flexible reminders.</li>
              </ul>

              <p className="mt-4 text-slate-300">
                Keep your vehicles running smoothly with streamlined records and timely reminders — anywhere, anytime.
              </p>
            </div>
          </div>

          {/* Built with */}
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-4">
            {BuiltWithLogos.map((logo, index) => {
              const img = (
                <Image
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  width={44}
                  height={44}
                  className="h-11 w-11 select-none rounded-md object-contain opacity-90 grayscale transition hover:scale-105 hover:opacity-100 hover:grayscale-0"
                  draggable={false}
                />
              );
              return (
                <span key={index} className="inline-block">
                  {"link" in logo ? (
                    <Link href={logo.link!} target="_blank">
                      {img}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={logo.onClick as () => void}
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
        </div>
      </div>

      {/* Feedback modal only (Privacy/Terms handled via @modal routes if you keep them) */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        appName="AutoArchive"
      />
    </div>
  );
}