// src/components/ProjectsMenuCTA.tsx
"use client";

import PopoverButton from "@/components/ui/PopoverButton";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

export type VariantLink = { label: string; href: string };
export type ProjectItem = {
  title: string;
  href: string;
  icon?: StaticImageData | string;
  variants?: readonly VariantLink[];
};

export default function ProjectsMenuCTA({ items }: { items: readonly ProjectItem[] }) {
  return (
    <PopoverButton
      id="projects-popover"
      label="View All Projects"
      variant="outline"
      align="center"
      as="button"
    >
      {/* Top quick-link */}
      <div className="mb-3">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-medium hover:underline underline-offset-4"
        >
          Browse All Projects <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Icons grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-5">
        {items.map((item) => {
          const hasVariants = Array.isArray(item.variants) && item.variants.length > 0;
          return (
            <div key={item.title} className="flex flex-col items-center">
              {/* Icon-only tile */}
              <Link
                href={item.href}
                aria-label={item.title}
                title={item.title}
                className="group relative grid h-16 w-16 place-items-center rounded-2xl
                           ring-1 ring-neutral-200/80 dark:ring-neutral-800/80
                           bg-white/70 dark:bg-neutral-900/70
                           hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60
                           transition shadow-sm hover:shadow-md"
              >
                {item.icon ? (
                  <Image
                    src={item.icon}
                    alt="" /* decorative; we have aria-label on the link */
                    width={44}
                    height={44}
                    className="rounded-lg ring-1 ring-black/10 dark:ring-white/10
                               transition-transform duration-200 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-sm opacity-70">{item.title[0]}</span>
                )}

                {/* soft UFO ring on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-sky-400/0
                             transition-all duration-300
                             group-hover:ring-8 group-hover:ring-sky-400/10
                             dark:group-hover:ring-sky-300/10"
                />
              </Link>

              {/* Variants only for Watchlistr (or any item with variants) */}
              {hasVariants && (
                <div className="mt-2 text-[12px] text-neutral-600 dark:text-neutral-400">
                  {item.variants!.map((v, i) => (
                    <span key={v.label}>
                      {i > 0 && <span className="mx-1 opacity-60">|</span>}
                      <Link
                        href={v.href}
                        className="hover:underline underline-offset-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {v.label}
                      </Link>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PopoverButton>
  );
}