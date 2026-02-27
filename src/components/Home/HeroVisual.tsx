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

  const isPopShop = activeItem.url === "manzanospopshop.com";

  return (
    <div className="relative aspect-4/3 w-full group/hero">
      <div className="absolute inset-0 p-4 sm:p-6">
        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl ring-1 ring-neutral-200/50 dark:ring-neutral-800/50 shadow-2xl">

          {/* Browser frame (WEB) */}
          <div className="absolute left-6 right-[30%] top-6 h-[58%] rounded-xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-sky-500/10">
            {/* Toolbar */}
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
                      className={`h-2 w-2 rounded-full shrink-0 transition-all duration-500 ${isPopShop ? "bg-white shadow-[0_0_8px_white] ring-1 ring-black/5" : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        }`}
                    />
                    <span className="text-[11px] sm:text-xs font-semibold tracking-tight text-neutral-500 dark:text-neutral-400 truncate">
                      {activeItem.url}
                    </span>
                  </div>

                  {/* URL Web Icon (Go to URL) */}
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

            {/* Browser Content / Icons */}
            <div className="flex-1 flex items-center justify-center gap-10 px-4 bg-linear-to-b from-transparent to-neutral-50/30 dark:to-neutral-950/20">
              {webItems.map((c) => {
                const config = webConfig[c.title.toLowerCase()];
                const isActive = activeItem.url === config.url;

                return (
                  <Link
                    key={c.title}
                    href={config.href}
                    onMouseEnter={() => setActiveItem(config)}
                    className="flex flex-col items-center gap-3 group/icon"
                  >
                    <div className="relative">
                      {/* Active Indicator Glow */}
                      <div className={`absolute -inset-2 rounded-xl blur-lg transition-opacity duration-500 ${isActive ? "bg-blue-500/20 opacity-100" : "opacity-0"
                        }`} />

                      {c.icon ? (
                        <Image
                          src={c.icon}
                          alt={c.title}
                          width={52}
                          height={52}
                          className={`relative rounded-xl ring-1 transition-all duration-300 transform ${isActive
                            ? "ring-var(--accent) scale-110 shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
                            : "ring-black/5 dark:ring-white/5 grayscale-[0.3] group-hover/icon:grayscale-0"
                            } group-hover/icon:scale-110 group-hover/icon:shadow-xl`}
                        />
                      ) : (
                        <div className="h-[52px] w-[52px] bg-neutral-200 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
                          <span className="text-[10px] text-neutral-500 uppercase font-bold">{c.title[0]}</span>
                        </div>
                      )}
                    </div>
                    {/* <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${
                      isActive ? "text-blue-500" : "text-neutral-400 dark:text-neutral-500"
                    }`}>
                      {c.title.split(' ')[0]}
                    </span> */}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Phone frame (MOBILE) */}
          <div className="absolute right-6 bottom-6 h-[72%] w-[34%] rounded-[2.75rem] bg-white/95 dark:bg-neutral-900/95 border border-neutral-200 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-3 z-10 overflow-hidden backdrop-blur-2xl">
            <div className="h-7 w-full flex justify-center items-start pt-1">
              <div className="h-4 w-20 rounded-full bg-neutral-900 dark:bg-neutral-800 ring-1 ring-white/5" />
            </div>

            <div className="grid grid-cols-3 gap-2.5 px-2 mt-2">
              {cards.slice(0, 12).map((c) => (
                <Link
                  key={c.title}
                  href={c.href}
                  className="aspect-square rounded-[18px] bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md ring-1 ring-black/5 dark:ring-white/5 active:scale-95"
                >
                  {c.icon ? (
                    <Image src={c.icon} alt="" width={30} height={30} className="rounded-lg shadow-sm" />
                  ) : (
                    <div className="h-6 w-6 rounded-md bg-neutral-200 dark:bg-neutral-700" />
                  )}
                </Link>
              ))}
            </div>

            {/* Home Indicator */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2.5 h-1.5 w-20 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          </div>

        </div>
      </div>
    </div>
  );
}
