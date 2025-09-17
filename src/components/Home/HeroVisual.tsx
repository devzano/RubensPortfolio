// src/components/HeroVisual.tsx
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

export type HeroItem = {
  title: string;
  href: string;
  icon?: StaticImageData | string;
};

export default function HeroVisual({ items }: { items: readonly HeroItem[]; }) {
  const cards = items;

  const webItems = cards.filter((c) => c.title.toLowerCase() === "watchlistr");

  return (
    <div className="relative aspect-[4/3] w-full">
      {/* Outer glass panel */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-950 ring-1 ring-neutral-200/70 dark:ring-neutral-800" />
      <div className="absolute inset-0 p-4 sm:p-6">
        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md ring-1 ring-neutral-200/70 dark:ring-neutral-800/70">
          {/* Browser frame (WEB) */}
          <div className="absolute left-6 right-[30%] top-6 h-[58%] rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/70 dark:border-neutral-800/70 shadow-md overflow-hidden flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-neutral-200/70 dark:border-neutral-800/70 shrink-0">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <div className="ml-3 flex-1">
                <div
                  aria-label="Address bar"
                  className="h-6 w-full rounded-md bg-neutral-100 dark:bg-neutral-800
               ring-1 ring-neutral-200/60 dark:ring-neutral-700/60
               px-2 flex items-center gap-2"
                >
                  <span aria-hidden className="h-2 w-2 rounded-full bg-blue-500/80" />
                  <span className="text-[11px] sm:text-xs font-medium tracking-wide
                     text-neutral-600 dark:text-neutral-300">
                    watchlistr.app
                  </span>
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 grid place-items-center">
              {(webItems.length ? webItems : [{ title: "Watchlistr", href: "https://watchlistr.app" }]).map(
                (c) => (
                  <Link
                    key={c.title}
                    href="https://watchlistr.app"
                    aria-label="Watchlistr (web)"
                    title="Watchlistr (web)"
                    className="aspect-video w-full max-w-sm bg-neutral-100 dark:bg-neutral-800/80 ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-center transition-transform duration-200 hover:scale-[1.02]"
                  >
                    {c.icon ? (
                      <Image
                        src={c.icon}
                        alt=""
                        width={44}
                        height={44}
                        className="rounded-md pb-5 ring-black/10 dark:ring-white/10"
                      />
                    ) : (
                      <span className="text-sm text-neutral-500">Watchlistr</span>
                    )}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Phone frame (MOBILE grid preview) */}
          <div className="absolute right-6 bottom-6 h-[68%] w-[32%] rounded-[2rem] bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/70 dark:border-neutral-800/70 shadow-xl p-3 z-10">
            <div className="h-6" /> {/* notch space */}
            <div className="grid grid-cols-3 gap-2 px-1">
              {cards.slice(0, 12).map((c) => (
                <Link
                  key={c.title}
                  href={c.href}
                  aria-label={c.title}
                  title={c.title}
                  className="aspect-square rounded-xl bg-neutral-100 dark:bg-neutral-800/80 ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-center transition-transform duration-200 hover:scale-[1.03]"
                >
                  {c.icon ? (
                    <Image
                      src={c.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="rounded-md ring-1 ring-black/10 dark:ring-white/10"
                    />
                  ) : (
                    <span className="text-[10px] text-neutral-500">{c.title}</span>
                  )}
                </Link>
              ))}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 h-1.5 w-16 rounded-full bg-neutral-300/70 dark:bg-neutral-700/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
