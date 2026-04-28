"use client";

import { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ExternalLink } from "lucide-react";

export type HeroItem = {
  title: string;
  href: string;
  icon?: StaticImageData | string;
};

export default function HeroVisual({ items }: { items: readonly HeroItem[]; }) {
  const cards = items;

  const webItems = [
    cards.find((c) => c.title.toLowerCase() === "watchlistr"),
    cards.find((c) => c.title.toLowerCase() === "manzanos popshop"),
  ].filter(Boolean) as HeroItem[];

  const webConfig: Record<string, { url: string; href: string; }> = {
    "watchlistr": { url: "watchlistr.app", href: "/watchlistr-web" },
    "manzanos popshop": { url: "manzanospopshop.com", href: "/mps-web" },
  };


  const [activeItem, setActiveItem] = useState(webConfig["watchlistr"]);
  const [activePhoneApp, setActivePhoneApp] = useState<string>(cards[0]?.title ?? "Apps");

  const isPopShop = activeItem.url === "manzanospopshop.com";

  const appleItem = cards.find(
    (c) => c.title.toLowerCase() === "clipzora"
  );

  const webModal = (
    <div className="absolute left-6 right-[30%] top-6 h-[58%] rounded-xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-sky-500/10 hover:-translate-y-1 hover:scale-[1.02]">
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-neutral-200/70 dark:border-neutral-800/70 shrink-0 bg-neutral-50/50 dark:bg-neutral-950/50">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
        </div>

        <div className="ml-4 flex-1">
          <div className="h-7 w-full rounded-lg bg-white dark:bg-neutral-800 ring-1 ring-neutral-200 dark:ring-neutral-700 px-2.5 flex items-center justify-between group/address shadow-inner">
            <div className="flex items-center gap-2 overflow-hidden">
              <span
                className={`h-2 w-2 rounded-full shrink-0 transition-all duration-500 ${isPopShop ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] ring-1 ring-black/5" : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"}`}
              />
              <span className="text-[11px] sm:text-xs font-semibold tracking-tight text-neutral-500 dark:text-neutral-400 truncate">
                {activeItem.url}
              </span>
            </div>

            <Link
              href={activeItem.href}
              className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              title={`Open ${activeItem.url}`}
            >
              <ExternalLink
                size={12}
                className="text-neutral-400 dark:text-neutral-500 hover:text-indigo-500 transition-colors"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-10 px-4 bg-linear-to-b from-transparent to-neutral-50/30 dark:to-neutral-950/20">
        {webItems.map((c) => {
          const config = webConfig[c.title.toLowerCase()];
          const isActive = activeItem.url === config.url;
          const isPopShopIcon = c.title.toLowerCase() === "manzanos popshop";

          return (
            <Link
              key={c.title}
              href={config.href}
              onMouseEnter={() => setActiveItem(config)}
              className="flex flex-col items-center gap-3 group/icon"
            >
              <div className="relative">
                <div className={`absolute -inset-2 rounded-xl blur-lg transition-all duration-500 ${isActive ? isPopShopIcon ? "bg-white/25 opacity-100 scale-110" : "bg-blue-500/20 opacity-100 scale-110" : "opacity-0 scale-95"}`} />

                {c.icon ? (
                  <Image
                    src={c.icon}
                    alt={c.title}
                    width={52}
                    height={52}
                    className={`relative rounded-xl ring-1 transition-all duration-300 transform ${
                      isActive
                        ? isPopShopIcon
                          ? "scale-110 ring-white/40 shadow-[0_0_18px_rgba(255,255,255,0.28)]"
                          : "scale-110 ring-blue-400/40 shadow-[0_0_18px_rgba(59,130,246,0.28)]"
                        : "ring-black/5 dark:ring-white/5 grayscale-[0.3] group-hover/icon:grayscale-0"
                    } group-hover/icon:scale-110 group-hover/icon:shadow-xl`}
                    style={isActive ? { borderColor: "var(--accent)" } : undefined}
                  />
                ) : (
                  <div className="h-[52px] w-[52px] bg-neutral-200 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold">{c.title[0]}</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  const macLaptopModal = (
    <Link
      href="/clipzora"
      aria-label="Open Clipzora"
      className="absolute left-5 bottom-5 z-20 w-[42%] max-w-[300px] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] group/mac"
    >
      <div className="relative mx-auto w-full">
        <div className="absolute -inset-6 rounded-[2.5rem] bg-indigo-500/20 blur-3xl opacity-70 transition-all duration-500 group-hover/mac:opacity-100 group-hover/mac:scale-105" />

        <div className="relative mx-auto w-[86%] overflow-hidden rounded-t-[18px] border border-neutral-300/80 dark:border-neutral-700/80 bg-neutral-950 shadow-[0_20px_55px_rgba(0,0,0,0.35),0_0_35px_rgba(99,102,241,0.12)] ring-1 ring-white/10 transition-shadow duration-500 group-hover/mac:shadow-[0_20px_60px_rgba(0,0,0,0.38),0_0_45px_rgba(99,102,241,0.18)]">
          <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-10 -translate-x-1/2 rounded-b-full bg-black/55" />

          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_38%,rgba(99,102,241,0.34),transparent_32%),linear-gradient(135deg,rgba(38,38,38,0.98),rgba(9,9,11,0.98))]" />
            <div className="absolute -left-10 bottom-0 h-28 w-44 rounded-full bg-indigo-400/20 blur-2xl" />
            <div className="absolute right-4 top-4 h-12 w-12 rounded-full bg-blue-400/10 blur-xl" />

            <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center">
              {appleItem?.icon ? (
                <Image
                  src={appleItem.icon}
                  alt="Clipzora"
                  width={42}
                  height={42}
                  className="rounded-xl shadow-lg"
                />
              ) : (
                <span className="text-sm font-black text-white/80">C</span>
              )}
            </div>
          </div>
        </div>

        <div className="relative mx-auto h-4 w-full rounded-b-[18px] bg-linear-to-b from-neutral-200 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 shadow-[0_14px_28px_rgba(0,0,0,0.28),0_0_20px_rgba(99,102,241,0.10)] ring-1 ring-black/10 dark:ring-white/10 transition-shadow duration-500 group-hover/mac:shadow-[0_14px_30px_rgba(0,0,0,0.3),0_0_28px_rgba(99,102,241,0.16)]">
          <div className="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 rounded-b-lg bg-neutral-400/60 dark:bg-neutral-950/70" />
        </div>
      </div>
    </Link>
  );

  const iPhoneModal = (
    <div
      className="absolute right-6 bottom-6 z-30 h-[72%] w-[34%] transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] group/phone"
      onMouseLeave={() => setActivePhoneApp(cards[0]?.title ?? "Apps")}
    >
      <div className="absolute -inset-5 rounded-[3rem] bg-blue-500/15 blur-3xl opacity-70 transition-all duration-500 group-hover/phone:opacity-100 group-hover/phone:scale-105" />

      <div className="relative h-full w-full rounded-[2.75rem] bg-white/95 dark:bg-neutral-900/95 border border-neutral-200 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.2),0_0_30px_rgba(59,130,246,0.10)] p-3 overflow-hidden backdrop-blur-2xl transition-shadow duration-500 group-hover/phone:shadow-[0_22px_55px_rgba(0,0,0,0.24),0_0_40px_rgba(59,130,246,0.16)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(59,130,246,0.10),transparent_34%)] pointer-events-none" />

        <div className="relative h-7 w-full flex justify-center items-start pt-1">
          <div className="relative h-5 min-w-20 max-w-32 px-4 rounded-full bg-neutral-900 dark:bg-neutral-800 ring-1 ring-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-300 group-hover/phone:min-w-24">
            <span className="relative text-[10px] font-semibold tracking-tight text-white/80 truncate max-w-[90px] transition-all duration-300">
              {activePhoneApp}
            </span>
          </div>
        </div>

        <div className="relative grid grid-cols-3 gap-2.5 px-2 mt-2">
          {cards.slice(0, 12).map((c) => (
            <Link
              key={c.title}
              href={c.href}
              onMouseEnter={() => setActivePhoneApp(c.title)}
              onFocus={() => setActivePhoneApp(c.title)}
              className="aspect-square flex items-center justify-center transition-all duration-300 hover:scale-110 hover:drop-shadow-lg active:scale-95 group/phone-icon"
            >
              {c.icon ? (
                <span className="relative grid place-items-center">
                  <span className="absolute -inset-1 rounded-xl bg-blue-500/0 blur-md transition-opacity duration-300 group-hover/phone-icon:bg-blue-500/15" />
                  <Image src={c.icon} alt="" width={30} height={30} className="relative rounded-lg shadow-sm transition-shadow duration-300 group-hover/phone-icon:shadow-[0_0_14px_rgba(59,130,246,0.18)]" />
                </span>
              ) : (
                <div className="h-6 w-6" />
              )}
            </Link>
          ))}
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-2.5 h-1.5 w-20 rounded-full bg-neutral-300 dark:bg-neutral-700" />
      </div>
    </div>
  );

  return (
    <div className="relative aspect-4/3 w-full group/hero">
      <div className="absolute inset-0 p-4 sm:p-6">
        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl ring-1 ring-neutral-200/50 dark:ring-neutral-800/50 shadow-2xl">

          {webModal}
          {macLaptopModal}
          {iPhoneModal}

        </div>
      </div>
    </div>
  );
}
