// src/components/Screenshots/ScreenshotGridRotator.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image, { StaticImageData } from "next/image";

type ColsConfig = { mobile?: number; desktop?: number };

export type ScreenshotGridRotatorProps = {
  images: (StaticImageData | string)[];
  intervalMs?: number;
  transitionMs?: number;
  cols?: ColsConfig;
  aspect?: `${number}/${number}`;
  sizes?: string;
  deferUntilMounted?: boolean;
  className?: string;
  fit?: "cover" | "contain";
  objectPosition?: string;
  swipeThreshold?: number;
  variant?: "app" | "web";
  webAspect?: `${number}/${number}`;
  webSizes?: string;
  showArrows?: boolean;
  unoptimized?: boolean; // Added for Vercel usage control
};

export default function ScreenshotGridRotator({
  images,
  intervalMs = 5600,
  transitionMs = 920,
  cols = { mobile: 2, desktop: 4 },
  aspect = "9/19",
  sizes = "(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 240px",
  deferUntilMounted = true,
  className = "",
  fit: fitProp,
  objectPosition,
  swipeThreshold = 50,
  variant = "app",
  webAspect = "16/9",
  webSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px",
  showArrows = false,
  unoptimized = true, // Defaulting to true to save Vercel credits
}: ScreenshotGridRotatorProps) {
  const fit: "cover" | "contain" =
    fitProp ?? (variant === "web" ? "contain" : "cover");
  const objPos: string =
    objectPosition ?? (variant === "web" ? "top center" : "center");

  const [mounted, setMounted] = useState(!deferUntilMounted);
  const [imagesPerSet, setImagesPerSet] = useState(
    variant === "web" ? 1 : cols.desktop ?? 4
  );
  const [currentSet, setCurrentSet] = useState(0);
  const [activeSet, setActiveSet] = useState(0);
  const [previousSet, setPreviousSet] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [transitionKey, setTransitionKey] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  // Swipe state
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const draggingRef = useRef(false);

  // Mount gate
  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  // Responsive columns (app variant only)
  useEffect(() => {
    if (!mounted) return;
    if (variant === "web") {
      setImagesPerSet(1);
      return;
    }
    const compute = () => {
      const isMobile = window.innerWidth <= 768;
      const per = isMobile ? cols.mobile ?? 2 : cols.desktop ?? 4;
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

  const normalizeIndex = useCallback(
    (idx: number) => ((idx % maxSets) + maxSets) % maxSets,
    [maxSets]
  );

  const goTo = (idx: number, dir?: 1 | -1) => {
    const normalized = normalizeIndex(idx);
    const fallbackDir: 1 | -1 = normalized === currentSet ? direction : normalized > currentSet ? 1 : -1;
    setDirection(dir ?? fallbackDir);
    setCurrentSet(normalized);
  };
  const next = () => goTo(currentSet + 1, 1);
  const prev = () => goTo(currentSet - 1, -1);

  useEffect(() => {
    setActiveSet((set) => normalizeIndex(set));
    setCurrentSet((set) => normalizeIndex(set));
    setPreviousSet((set) => (set === null ? null : normalizeIndex(set)));
  }, [normalizeIndex]);

  useEffect(() => {
    if (!mounted || currentSet === activeSet) return;

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    setPreviousSet(activeSet);
    setActiveSet(currentSet);
    setTransitionKey((key) => key + 1);

    transitionTimeoutRef.current = window.setTimeout(() => {
      setPreviousSet(null);
      transitionTimeoutRef.current = null;
    }, transitionMs) as unknown as number;

    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
    };
  }, [activeSet, currentSet, mounted, transitionMs]);

  // Auto-rotate
  useEffect(() => {
    if (!mounted || images.length === 0) return;

    const id = window.setInterval(() => {
      setDirection(1);
      setCurrentSet((s) => {
        const max = Math.max(
          1,
          Math.ceil(images.length / Math.max(1, imagesPerSet))
        );
        return (s + 1) % max;
      });
    }, intervalMs) as unknown as number;

    intervalRef.current = id;
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [mounted, images.length, imagesPerSet, intervalMs, maxSets]);

  // Keyboard (web variant)
  useEffect(() => {
    if (variant !== "web" || !mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setCurrentSet((s) => (s - 1 + maxSets) % maxSets);
      } else if (e.key === "ArrowRight") {
        setDirection(1);
        setCurrentSet((s) => (s + 1) % maxSets);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant, mounted, maxSets]);

  if (deferUntilMounted && !mounted) {
    return (
      <div
        className={`mx-auto grid max-w-5xl gap-4 ${className} ${
          variant === "web" ? "grid-cols-1" : "grid-cols-4"
        }`}
      >
        {Array.from({ length: variant === "web" ? 1 : 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              aspectRatio: (variant === "web"
                ? webAspect
                : aspect) as CSSProperties["aspectRatio"],
            }}
            className="animate-pulse rounded-lg border border-white/10 bg-white/5"
          />
        ))}
      </div>
    );
  }

  // Swipe handlers
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
      setDirection(dx < 0 ? 1 : -1);
      setCurrentSet((s) => {
        const max = maxSets;
        return dx < 0 ? (s + 1) % max : (s - 1 + max) % max;
      });
    }

    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setDirection(1);
        setCurrentSet((s) => (s + 1) % maxSets);
      }, intervalMs) as unknown as number;
    }
  };

  const touchActionClass = "touch-pan-y";
  const activeStageClass =
    direction > 0 ? "screenshot-stage-in-next" : "screenshot-stage-in-prev";
  const previousStageClass =
    direction > 0 ? "screenshot-stage-out-next" : "screenshot-stage-out-prev";

  const renderWebLayer = (setIndex: number, layer: "active" | "previous") => {
    const src = images[setIndex]!;
    const stageClass = layer === "active" ? activeStageClass : previousStageClass;

    return (
      <div
        key={`${layer}-${setIndex}-${transitionKey}`}
        className={`absolute inset-0 ${stageClass} ${layer === "previous" ? "pointer-events-none" : ""}`}
        style={{ animationDuration: `${transitionMs}ms` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_58%)]" />
        <Image
          src={src}
          alt={`Screenshot ${setIndex + 1}`}
          fill
          className={`${fit === "cover" ? "object-cover" : "object-contain"} screenshot-media-pan`}
          style={{
            objectPosition: objPos,
            animationDuration: `${Math.max(transitionMs * 1.9, 1400)}ms`,
          }}
          sizes={webSizes}
          priority
          draggable={false}
          unoptimized={unoptimized}
        />
      </div>
    );
  };

  const renderGrid = (setIndex: number, layer: "active" | "previous") => {
    const startIndex = setIndex * imagesPerSet;
    const setImages = images.slice(startIndex, startIndex + imagesPerSet);

    return (
      <div
        key={`${layer}-${setIndex}-${transitionKey}`}
        className={`grid gap-4 ${
          imagesPerSet === (cols.mobile ?? 2) ? "grid-cols-2" : "grid-cols-4"
        } ${touchActionClass} ${layer === "active" ? activeStageClass : previousStageClass} ${
          layer === "previous" ? "pointer-events-none absolute inset-0" : "relative"
        }`}
        style={{ animationDuration: `${transitionMs}ms` }}
      >
        {setImages.map((src, i) => (
          <div
            key={`${layer}-${setIndex}-${i}`}
            style={{
              aspectRatio: aspect as CSSProperties["aspectRatio"],
              animationDelay: layer === "active" ? `${120 + i * 55}ms` : `${i * 35}ms`,
              animationDuration: `${Math.max(transitionMs - 80, 420)}ms`,
            }}
            className={`relative overflow-hidden rounded-lg border border-white/10 bg-white/5 ${
              layer === "active" ? "screenshot-card-in" : ""
            }`}
          >
            <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />
            <Image
              src={src}
              alt={`Screenshot ${startIndex + i + 1}`}
              fill
              className={`${fit === "cover" ? "object-cover" : "object-contain"} screenshot-media-pan`}
              style={{
                objectPosition: objPos,
                animationDuration: `${Math.max(transitionMs * 1.85, 1400)}ms`,
              }}
              sizes={sizes}
              draggable={false}
              unoptimized={unoptimized}
            />
          </div>
        ))}
      </div>
    );
  };

  if (variant === "web") {
    return (
      <div className={`mx-auto w-full ${className}`}>
        <div
          style={{
            aspectRatio: webAspect as CSSProperties["aspectRatio"],
          }}
          className={`relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-white/5 ${touchActionClass}`}
          aria-live="polite"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {previousSet !== null && previousSet !== activeSet && renderWebLayer(previousSet, "previous")}
          {renderWebLayer(activeSet, "active")}

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
                onClick={() => goTo(idx, idx >= currentSet ? 1 : -1)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  idx === currentSet
                    ? "bg-sky-400"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // -------- app (grid) variant ----------
  return (
    <div className={`mx-auto max-w-5xl ${className}`}>
      <div
        className={`relative ${touchActionClass}`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {previousSet !== null && previousSet !== activeSet && renderGrid(previousSet, "previous")}
        {renderGrid(activeSet, "active")}
      </div>

      {maxSets > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: maxSets }).map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to set ${idx + 1}`}
              onClick={() => goTo(idx, idx >= currentSet ? 1 : -1)}
              className={`h-2 w-8 rounded-full transition ${
                idx === currentSet ? "bg-sky-400" : "bg-white/10 hover:bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
