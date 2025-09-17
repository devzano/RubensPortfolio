// src/components/GetInTouchCTA.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PopoverButton from "@/components/ui/PopoverButton";
import AppImages from "@/constants/images";

export default function GetInTouchCTA() {
  const [isTouch, setIsTouch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  return (
    <PopoverButton
      id="menu-popover"
      label="Get In Touch"
      variant="solid"
      align="center"
      as="button"
      panelClassName="w-[min(18rem,calc(100vw-2rem))] sm:w-[22rem]"
    >
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div
          className="group flex flex-col items-center"
          onMouseLeave={() => !isTouch && setMobileOpen(false)}
        >
          <button
            type="button"
            aria-label="Phone options"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="relative grid aspect-square h-16 w-16 place-items-center rounded-2xl bg-white/70 dark:bg-neutral-900/70 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 transition shadow-sm hover:shadow-md focus-visible:outline-none"
          >
            <Image
              src={AppImages.mobile}
              alt=""
              width={40}
              height={40}
              className="rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-sky-400/0 transition-all duration-300 group-hover:ring-8 group-hover:ring-sky-400/10 dark:group-hover:ring-sky-300/10"
            />
          </button>

          <div className="relative mt-1.5 h-4 w-full text-center text-[11px] sm:text-xs">
            <span
              className={[
                "absolute inset-0 flex items-start justify-center",
                "text-neutral-600 dark:text-neutral-400 transition-opacity duration-200",
                mobileOpen ? "opacity-0" : "opacity-100",
                !mobileOpen ? "group-hover:opacity-0" : "",
              ].join(" ")}
            >
              Mobile
            </span>

            <div
              className={[
                "absolute inset-0 flex items-start justify-center",
                "text-neutral-600 dark:text-neutral-400 transition-opacity duration-200",
                (mobileOpen ? "opacity-100" : "opacity-0"),
                (!mobileOpen ? "group-hover:opacity-100" : ""),
              ].join(" ")}
            >
              <a
                href="tel:3053232827"
                className="hover:underline underline-offset-4"
                onClick={(e) => e.stopPropagation()}
              >
                Call
              </a>
              <span className="mx-1 opacity-60">|</span>
              <a
                href="sms:3053232827"
                className="hover:underline underline-offset-4"
                onClick={(e) => e.stopPropagation()}
              >
                Text
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <a
            href="mailto:rmanzano.se@gmail.com"
            aria-label="Send an email"
            title="Email"
            className="group relative grid aspect-square h-16 w-16 place-items-center rounded-2xl bg-white/70 dark:bg-neutral-900/70 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 transition shadow-sm hover:shadow-md focus-visible:outline-none"
          >
            <Image
              src={AppImages.email}
              alt=""
              width={40}
              height={40}
              className="rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-sky-400/0 transition-all duration-300 group-hover:ring-8 group-hover:ring-sky-400/10 dark:group-hover:ring-sky-300/10"
            />
          </a>
          <span className="mt-1.5 h-4 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
            Email
          </span>
        </div>

        {/* LinkedIn tile */}
        <div className="flex flex-col items-center">
          <a
            href="https://www.linkedin.com/in/rubenmanzano-se/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn profile"
            title="LinkedIn"
            className="group relative grid aspect-square h-16 w-16 place-items-center rounded-2xl bg-white/70 dark:bg-neutral-900/70 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 transition shadow-sm hover:shadow-md focus-visible:outline-none0"
          >
            <Image
              src={AppImages.linkedin}
              alt=""
              width={40}
              height={40}
              className="rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-sky-400/0 transition-all duration-300 group-hover:ring-8 group-hover:ring-sky-400/10 dark:group-hover:ring-sky-300/10"
            />
          </a>
          <span className="mt-1.5 h-4 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
            LinkedIn
          </span>
        </div>
      </div>
    </PopoverButton>
  );
}