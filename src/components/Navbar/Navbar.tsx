"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AppImages from "@/constants/images";

type Props = { onTogglePause: () => void; };

export default function Navbar({ onTogglePause }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const topRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const apply = () => {
      if (!topRowRef.current) return;
      const rect = topRowRef.current.getBoundingClientRect();
      const bottom = Math.ceil(rect.bottom);
      document.documentElement.style.setProperty("--nav-h", `${bottom}px`);
    };
    apply();

    const ro = new ResizeObserver(apply);
    if (topRowRef.current) ro.observe(topRowRef.current);

    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className="fixed top-2.5 inset-x-0 z-[999] pointer-events-none"
    >
      <div
        ref={topRowRef}
        className="flex items-center justify-between px-2 pointer-events-auto"
      >
        <div className="relative inline-flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle Navigation"
            aria-expanded={isOpen}
            aria-controls="vertical-navbar"
            onClick={() => setIsOpen((o) => !o)}
            className="
              group relative grid h-11 w-11 place-items-center rounded-full
              border border-neutral-200 dark:border-neutral-800
              bg-white/70 dark:bg-neutral-900/70
              backdrop-blur-md shadow-sm
              transition-all duration-200
              hover:-translate-y-px hover:scale-[1.02] hover:shadow-md
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50
            "
          >
            <Image
              src={AppImages.menu}
              alt="Menu"
              className="
                w-[22px] h-[22px] rounded-md
                brightness-[.95]
                transition-transform duration-200
                group-hover:scale-105 group-hover:brightness-100
              "
            />
            {/* soft UFO ring */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute inset-0 rounded-full
                ring-0 group-hover:ring-8 ring-sky-400/10
                transition-all duration-300
              "
            />
          </button>

          {isOpen && (
            <div
              id="vertical-navbar"
              className="
                absolute left-0 top-[calc(100%+8px)]
                w-[84px] max-h-[80vh] overflow-auto
                p-3 rounded-2xl
                border border-neutral-200 dark:border-neutral-800
                bg-white/70 dark:bg-neutral-900/70
                backdrop-blur-md shadow-2xl
                flex flex-col items-center gap-3
                transition-all duration-200
                pointer-events-auto scroll no-scrollbar
              "
            >
              {/* glow behind panel head */}
              <div
                aria-hidden
                className="
                  pointer-events-none absolute -top-1 left-3
                  h-9 w-9 rounded-full
                  bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.28),transparent_60%)]
                  blur-[10px]
                "
              />
              <div className="flex flex-col items-center gap-4">
                <Link
                  href="/"
                  title="Home"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.home}
                    alt="Home"
                    className="
                      w-[26px] h-[26px] rounded-md
                      transition-transform duration-200
                      group-hover:scale-[1.06]
                    "
                  />
                </Link>

                <div className="text-sky-400 text-[11px] uppercase tracking-[.12em] mt-1.5 -mb-1 opacity-90">
                  Web
                </div>

                <Link
                  href="/watchlistr-web"
                  title="Watchlistr Web"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.watchlistr}
                    alt="Watchlistr Web"
                    className="w-[26px] h-[26px] rounded-md transition-transform duration-200 group-hover:scale-[1.06]"
                  />
                </Link>

                <div className="text-sky-400 text-[11px] uppercase tracking-[.12em] mt-1.5 -mb-1 opacity-90">
                  Mobile
                </div>

                <Link
                  href="/watchlistr-mobile"
                  title="Watchlistr Mobile"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.watchlistr}
                    alt="Watchlistr Mobile"
                    className="w-[26px] h-[26px] rounded-md transition-transform duration-200 group-hover:scale-[1.06]"
                  />
                </Link>

                <Link
                  href="/reciperealm"
                  title="RecipeRealm"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.recipeRealm}
                    alt="RecipeRealm"
                    className="w-[26px] h-[26px] rounded-md transition-transform duration-200 group-hover:scale-[1.06]"
                  />
                </Link>

                <Link
                  href="/echoexpense"
                  title="EchoExpense"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.echoExpense}
                    alt="EchoExpense"
                    className="w-[26px] h-[26px] rounded-md transition-transform duration-200 group-hover:scale-[1.06]"
                  />
                </Link>

                <Link
                  href="/otakuhive"
                  title="OtakuHive"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.otakuHive}
                    alt="OtakuHive"
                    className="w-[26px] h-[26px] rounded-md transition-transform duration-200 group-hover:scale-[1.06]"
                  />
                </Link>

                <Link
                  href="/starship-pixelscape"
                  title="Pixelscape"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.starshipPixelscape}
                    alt="Pixelscape"
                    className="w-[26px] h-[26px] rounded-md transition-transform duration-200 group-hover:scale-[1.06]"
                  />
                </Link>

                <Link
                  href="/autoarchive"
                  title="AutoArchive"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.autoArchive}
                    alt="AutoArchive"
                    className="w-[26px] h-[26px] rounded-md transition-transform duration-200 group-hover:scale-[1.06]"
                  />
                </Link>

                <Link
                  href="/steda"
                  title="Steda"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.steda}
                    alt="Steda"
                    className="w-[26px] h-[26px] rounded-md transition-transform duration-200 group-hover:scale-[1.06]"
                  />
                </Link>

                <Link
                  href="/manzanos-popshop"
                  title="Manzanos PopShop"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.manzanosPopShop}
                    alt="Manzanos PopShop"
                    className="w-[26px] h-[26px] rounded-md transition-transform duration-200 group-hover:scale-[1.06]"
                  />
                </Link>

                <Link
                  href="/logiqo"
                  title="Logiqo"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.logiqo}
                    alt="Logiqo"
                    className="w-[26px] h-[26px] rounded-md transition-transform duration-200 group-hover:scale-[1.06]"
                  />
                </Link>

                <Link
                  href="/sunshinekeywestchallenge"
                  title="SKWC"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.sunshineKeyWestChallenge}
                    alt="SKWC"
                    className="w-[26px] h-[26px] rounded-md transition-transform duration-200 group-hover:scale-[1.06]"
                  />
                </Link>

                <Link
                  href="/projects"
                  title="All Projects"
                  onClick={handleNavClick}
                  className="
                    group relative grid h-12 w-12 place-items-center
                    rounded-[14px]
                    bg-white/70 dark:bg-neutral-900/70
                    border border-neutral-200 dark:border-neutral-800
                    backdrop-blur-md
                    transition-all duration-200
                    hover:scale-[1.04]
                    hover:bg-white/80 dark:hover:bg-neutral-800/80
                    ring-0 hover:ring-8 ring-sky-400/10
                  "
                >
                  <Image
                    src={AppImages.allProjects}
                    alt="All Projects"
                    className="w-[26px] h-[26px] rounded-md brightness-[.95] transition-transform duration-200 group-hover:scale-105 group-hover:brightness-100"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          title="Pause Animation"
          onClick={onTogglePause}
          className="
            group relative grid h-11 w-11 place-items-center rounded-full
            border border-neutral-200 dark:border-neutral-800
            bg-white/70 dark:bg-neutral-900/70
            backdrop-blur-md shadow-sm
            transition-all duration-200
            hover:-translate-y-px hover:scale-[1.02] hover:shadow-md
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50
            text-sky-400 dark:text-sky-300 text-[20px] leading-none
          "
        >
          𐫰
          <span
            aria-hidden
            className="
              pointer-events-none absolute inset-0 rounded-full
              ring-0 group-hover:ring-8 ring-sky-400/10
              transition-all duration-300
            "
          />
        </button>
      </div>
    </div>
  );
}