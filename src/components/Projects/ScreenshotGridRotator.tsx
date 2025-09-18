// src/components/Screenshots/ScreenshotGridRotator.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

type ColsConfig = { mobile?: number; desktop?: number; };

export type ScreenshotGridRotatorProps = {
  images: (StaticImageData | string)[];
  intervalMs?: number;
  cols?: ColsConfig;
  aspect?: `${number}/${number}`; // app grid cell aspect
  sizes?: string;
  deferUntilMounted?: boolean;
  className?: string;
  fit?: "cover" | "contain";
  swipeThreshold?: number;
  /** NEW: pick layout variant */
  variant?: "app" | "web";
  /** Only for variant="web": aspect for the large hero (default "16/9") */
  webAspect?: `${number}/${number}`;
  /** Only for variant="web": sizes for the hero image */
  webSizes?: string;
  /** Show prev/next arrows (web variant only) */
  showArrows?: boolean;
};

export default function ScreenshotGridRotator({
  images,
  intervalMs = 4000,
  cols = { mobile: 2, desktop: 4 },
  aspect = "9/19",
  sizes = "(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 240px",
  deferUntilMounted = true,
  className = "",
  fit = "cover",
  swipeThreshold = 50,
  variant = "app",
  webAspect = "16/9",
  webSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px",
  showArrows = true,
}: ScreenshotGridRotatorProps) {
  const [mounted, setMounted] = useState(!deferUntilMounted);
  const [imagesPerSet, setImagesPerSet] = useState(
    variant === "web" ? 1 : (cols.desktop ?? 4)
  );
  const [currentSet, setCurrentSet] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // swipe state
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const draggingRef = useRef(false);

  // mount gate
  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  // responsive columns (app variant only)
  useEffect(() => {
    if (!mounted) return;
    if (variant === "web") {
      setImagesPerSet(1);
      return;
    }
    const compute = () => {
      const isMobile = window.innerWidth <= 768;
      const per = isMobile ? (cols.mobile ?? 2) : (cols.desktop ?? 4);
      setImagesPerSet(per);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [mounted, cols.mobile, cols.desktop, variant]);

  const maxSets = useMemo(
    () => Math.max(1, Math.ceil(images.length / Math.max(1, imagesPerSet))),
    [images.length, imagesPerSet]
  );

  const goTo = (idx: number) => setCurrentSet(((idx % maxSets) + maxSets) % maxSets);
  const next = () => goTo(currentSet + 1);
  const prev = () => goTo(currentSet - 1);

  useEffect(() => {
    if (!mounted || images.length === 0) return;

    const id = window.setInterval(() => {
      setCurrentSet((s) => {
        const max = Math.max(1, Math.ceil(images.length / Math.max(1, imagesPerSet)));
        return (s + 1) % max;
      });
    }, intervalMs) as unknown as number;

    intervalRef.current = id;
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [mounted, images.length, imagesPerSet, intervalMs]);

  useEffect(() => {
    if (variant !== "web" || !mounted) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentSet((s) => ((s - 1 + maxSets) % maxSets));
      } else if (e.key === "ArrowRight") {
        setCurrentSet((s) => ((s + 1) % maxSets));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant, mounted, maxSets]);

  if (deferUntilMounted && !mounted) {
    return (
      <div className={`mx-auto max-w-5xl grid gap-4 ${className} ${variant === "web" ? "grid-cols-1" : "grid-cols-4"}`}>
        {Array.from({ length: variant === "web" ? 1 : 4 }).map((_, i) => (
          <div
            key={i}
            style={{ aspectRatio: (variant === "web" ? webAspect : aspect) as unknown as number }}
            className="animate-pulse rounded-lg border border-white/10 bg-white/5"
          />
        ))}
      </div>
    );
  }

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (pointerIdRef.current !== null) return;
    pointerIdRef.current = e.pointerId;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!draggingRef.current || e.pointerId !== pointerIdRef.current) return;
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;
    draggingRef.current = false;
    pointerIdRef.current = null;

    if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > swipeThreshold) {
      setCurrentSet((s) => {
        const max = maxSets;
        return dx < 0 ? ((s + 1) % max) : ((s - 1 + max) % max);
      });
    }

    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCurrentSet((s) => ((s + 1) % maxSets));
      }, intervalMs) as unknown as number;
    }
  };

  const touchActionClass = "touch-pan-y";

  if (variant === "web") {
    const src = images[currentSet]!;
    return (
      <div className={`mx-auto w-full ${className}`}>
        <div
          style={{ aspectRatio: webAspect as unknown as number }}
          className={`relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-white/5 ${touchActionClass}`}
          aria-live="polite"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <Image
            src={src}
            alt={`Screenshot ${currentSet + 1}`}
            fill
            className={fit === "cover" ? "object-cover" : "object-contain"}
            sizes={webSizes}
            priority
            draggable={false}
          />
          {showArrows && maxSets > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={prev}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-2 text-white shadow backdrop-blur hover:bg-black/60"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={next}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-2 text-white shadow backdrop-blur hover:bg-black/60"
              >
                ›
              </button>
            </>
          )}
        </div>

        {maxSets > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {Array.from({ length: maxSets }).map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to ${idx + 1}`}
                onClick={() => goTo(idx)}
                className={`h-2.5 w-2.5 rounded-full transition ${idx === currentSet ? "bg-sky-400" : "bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // -------- app (grid) variant ----------
  const start = currentSet * imagesPerSet;
  const visible = images.slice(start, start + imagesPerSet);

  return (
    <div className={`mx-auto max-w-5xl ${className}`}>
      <div
        className={`grid gap-4 ${imagesPerSet === (cols.mobile ?? 2) ? "grid-cols-2" : "grid-cols-4"
          } ${touchActionClass}`}
        aria-live="polite"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {visible.map((src, i) => (
          <div
            key={`${start + i}-${typeof src === "string" ? src : src.src}`}
            style={{ aspectRatio: aspect as unknown as number }}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            <Image
              src={src}
              alt={`Screenshot ${start + i + 1}`}
              fill
              className={fit === "cover" ? "object-cover" : "object-contain"}
              sizes={sizes}
              priority={i === 0}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {maxSets > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {Array.from({ length: maxSets }).map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to set ${idx + 1}`}
              onClick={() => goTo(idx)}
              className={`h-2.5 w-2.5 rounded-full transition ${idx === currentSet ? "bg-sky-400" : "bg-white/20 hover:bg-white/40"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}