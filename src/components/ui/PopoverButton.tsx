"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from "react";

type Align = "center" | "start" | "end";
type Variant = "outline" | "solid" | "link";
type AsElement = "auto" | "link" | "button";

export type PopoverButtonProps = {
  id: string;
  href?: string;
  label: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  align?: Align;
  variant?: Variant;
  as?: AsElement;
  className?: string;
  panelClassName?: string;
  /** ms to wait before closing on hover-out (helps cursor travel) */
  hoverCloseDelay?: number;
};

export default function PopoverButton({
  id,
  href,
  label,
  icon,
  children,
  align = "center",
  variant = "outline",
  as = "auto",
  className = "",
  panelClassName,
  hoverCloseDelay = 120,
}: PopoverButtonProps) {
  const [open, setOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [side, setSide] = useState<"top" | "bottom">("bottom");
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({}); // left/top/maxWidth in px
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  const scheduleClose = (delay = hoverCloseDelay) => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => setOpen(false), delay);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        cancelClose();
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
      cancelClose();
    };
  }, []);

  const isLinkEl = as === "link" || (as === "auto" && !!href);

  // Prevent immediate nav on touch (first tap opens)
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouch && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleButtonClick = () => setOpen((o) => !o);

  // ---- Trigger styles ----
  const baseCommon =
    "relative group inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus-visible:outline-none";

  const pillShared =
    "h-11 px-5 rounded-full shadow-sm hover:scale-[1.02] hover:shadow-md active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400/60 w-full sm:w-auto";

  const pillOutline =
    "border border-neutral-200 dark:border-neutral-800 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white";

  const pillSolid = "bg-neutral-900 text-white dark:bg-gray-300 dark:text-neutral-900";

  const linkShared =
    "px-0 h-auto rounded-none shadow-none underline-offset-4 text-sky-600 hover:underline dark:text-sky-300";

  const triggerClass =
    variant === "link"
      ? `${baseCommon} ${linkShared}`
      : `${baseCommon} ${pillShared} ${variant === "solid" ? pillSolid : pillOutline}`;

  const positionPanel = useCallback(() => {
    if (!wrapRef.current || !triggerRef.current || !panelRef.current) return;

    const margin = 8; // viewport padding
    const gap = 8;    // gap between trigger and panel
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const wrapRect = wrapRef.current.getBoundingClientRect();
    const triggerRect = triggerRef.current.getBoundingClientRect();

    // Temporarily ensure the panel is measurable.
    const panel = panelRef.current;
    const prevDisplay = panel.style.display;
    const prevVisibility = panel.style.visibility;
    panel.style.visibility = "hidden";
    panel.style.display = "block";

    const panelW = panel.offsetWidth;
    const panelH = panel.offsetHeight;

    // Horizontal: preferred based on align, then clamp to viewport.
    const alignOffset = (triggerRect: DOMRect, panelW: number) => {
      if (align === "start") return triggerRect.left;
      if (align === "end") return triggerRect.right - panelW;
      return triggerRect.left + triggerRect.width / 2 - panelW / 2; // center
    };

    let leftViewport = alignOffset(triggerRect, panelW);
    leftViewport = Math.max(margin, Math.min(leftViewport, vw - margin - panelW));
    const left = Math.round(leftViewport - wrapRect.left);

    // Vertical: prefer below, flip to top if overflow.
    let place: "top" | "bottom" = "bottom";
    let topViewport = triggerRect.bottom + gap;
    if (topViewport + panelH > vh - margin) {
      const tryTop = triggerRect.top - gap - panelH;
      if (tryTop >= margin || vh - (triggerRect.bottom + gap) < vh / 3) {
        place = "top";
        topViewport = Math.max(margin, tryTop);
      }
    }
    const top = Math.round(topViewport - wrapRect.top);

    const maxWidthPx = Math.max(160, vw - margin * 2);

    setSide(place);
    setPanelStyle({
      left,
      top,
      maxWidth: `${maxWidthPx}px`,
    });

    // Restore temporary styles
    panel.style.display = prevDisplay;
    panel.style.visibility = prevVisibility;
  }, [align]);

  // Reposition when opening (and when align changes)
  useLayoutEffect(() => {
    if (!open) return;
    positionPanel();
  }, [open, positionPanel]);
  //   useEffect(() => {
  //   if (!open || !panelRef.current) return;
  //   const ro = new ResizeObserver(() => positionPanel());
  //   ro.observe(panelRef.current);
  //   return () => ro.disconnect();
  // }, [open, positionPanel]);


  useEffect(() => {
    if (!open) return;
    const onWin = () => positionPanel();
    window.addEventListener("resize", onWin);
    window.addEventListener("scroll", onWin, { passive: true });
    return () => {
      window.removeEventListener("resize", onWin);
      window.removeEventListener("scroll", onWin);
    };
  }, [open, positionPanel]); // ✅

  // Hover retention on trigger
  const triggerMouseEnter = () => {
    cancelClose();
    if (!isTouch) setOpen(true);
  };
  const triggerMouseLeave = () => {
    scheduleClose();
  };

  // Panel alignment class is no longer used for hard positioning.
  // We keep transform-origin for nicer scale animations.
  const originClass = side === "top" ? "origin-bottom" : "origin-top";

  // Trigger content (label + optional icon + hover adornments)
  const TriggerInner = (
    <>
      {label}
      {icon ? (
        <span
          aria-hidden
          className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-0.5"
        >
          {icon}
        </span>
      ) : null}

      {variant !== "link" ? (
        <>
          {/* soft UFO ring */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full ring-0 ring-sky-400/0 transition-all duration-300 group-hover:ring-8 group-hover:ring-sky-400/10 dark:group-hover:ring-sky-300/10"
          />
          {/* gradient underline */}
          <span
            aria-hidden
            className="pointer-events-none absolute -z-10 left-1/2 top-full mt-1 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-400/70 to-transparent transition-all duration-300 group-hover:w-2/3"
          />
        </>
      ) : (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full mt-0.5 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-400/70 to-transparent transition-all duration-300 group-hover:w-1/2"
        />
      )}
    </>
  );

  return (
    <div
      ref={wrapRef}
      className={`group/panel relative inline-flex w-full sm:w-auto flex-col items-stretch ${className}`}
    >
      {/* Trigger: Link or Button */}
      {isLinkEl ? (
        <Link
          ref={triggerRef as React.MutableRefObject<HTMLAnchorElement>}
          href={href!}
          onClick={handleAnchorClick}
          onMouseEnter={triggerMouseEnter}
          onMouseLeave={triggerMouseLeave}
          onFocus={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={id}
          className={triggerClass}
        >
          {TriggerInner}
        </Link>
      ) : (
        <button
          ref={triggerRef as React.MutableRefObject<HTMLButtonElement>}
          type="button"
          onClick={handleButtonClick}
          onMouseEnter={triggerMouseEnter}
          onMouseLeave={triggerMouseLeave}
          onFocus={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={id}
          className={triggerClass}
        >
          {TriggerInner}
        </button>
      )}

      {/* Panel (smart-positioned) */}
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-label={`${typeof label === "string" ? label : "Menu"} panel`}
        style={panelStyle}
        className={`
          absolute z-30
          ${panelClassName ?? "w-[min(28rem,calc(100vw-2rem))] sm:w-[26rem]"}
          rounded-2xl border border-neutral-200/70 dark:border-neutral-800
          bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-xl
          p-4 text-sm ${originClass}
          transition-all duration-200 ease-out
          will-change-transform will-change-opacity
          ${open ? "block opacity-100 scale-100" : "hidden opacity-0 scale-95"}
          max-h-[min(80dvh,32rem)] overflow-auto overscroll-contain
        `}
        // Keep open while hovering panel; close after delay on leave
        onMouseEnter={cancelClose}
        onMouseLeave={triggerMouseLeave}
      >
        {/* UFO beam glow behind the panel */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.28),transparent_60%)] blur-md" />
          <div className="absolute left-1/2 top-6 h-24 w-[85%] -translate-x-1/2 rounded-b-3xl bg-gradient-to-b from-sky-400/25 via-sky-400/10 to-transparent blur-sm animate-pulse" />
        </div>

        {children}
      </div>
    </div>
  );
}