// src/components/Modal.tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  closeOnEsc?: boolean;
  closeOnBackdrop?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  role?: "dialog" | "alertdialog";
  className?: string;
  contentClassName?: string;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeOnEsc = true,
  closeOnBackdrop = true,
  initialFocusRef,
  role = "dialog",
  className = "",
  // contentClassName = "",
}: ModalProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    setContainer(document.getElementById("modal-root"));
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    lastActiveRef.current = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      if (initialFocusRef?.current) initialFocusRef.current.focus();
      else if (closeBtnRef.current) closeBtnRef.current.focus();
      else {
        backdropRef.current
          ?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
          ?.focus();
      }
    };
    focusFirst();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const nodes = Array.from(
          backdropRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) ?? []
        ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

        if (!nodes.length) return;
        const idx = nodes.indexOf(document.activeElement as HTMLElement);
        const nextIdx = e.shiftKey ? (idx <= 0 ? nodes.length - 1 : idx - 1)
                                   : (idx === nodes.length - 1 ? 0 : idx + 1);
        nodes[nextIdx].focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastActiveRef.current?.focus?.();
    };
  }, [isOpen, closeOnEsc, onClose, initialFocusRef]);

  if (!isOpen || !container) return null;

  const onBackdropMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) onClose();
  };

  // Backdrop scrolls when content is taller than viewport
  const backdropBase = clsx(
    "fixed inset-0 z-[1000] grid place-items-center",
    "p-4 sm:p-6 backdrop-blur-sm bg-black/60",
    "overflow-y-auto overscroll-contain" // 👈 enable page-level scrolling
  );

  // Card scrolls internally with a capped height
  // const contentBase = clsx(
  //   "relative w-full max-w-3xl rounded-2xl p-6 sm:p-8",
  //   "text-slate-100 bg-white/10 backdrop-blur-md",
  //   "border border-white/10 ring-1 ring-white/10",
  //   "shadow-2xl shadow-black/40 outline outline-1 outline-white/10",
  //   "max-h-[85dvh] overflow-y-auto overscroll-contain" // 👈 constrain + internal scroll
  // );

  const titleBase = clsx("text-center font-semibold tracking-tight", "text-2xl sm:text-3xl");
  const titleUnderline = clsx("mx-auto mt-3 h-px w-24", "bg-gradient-to-r from-transparent via-sky-400/60 to-transparent");
  const closeBtnBase = clsx(
    "absolute right-3 top-3 inline-grid h-9 w-9 place-items-center rounded-full transition",
    "border border-white/10 bg-white/10 text-slate-200",
    "shadow-md shadow-black/20 ring-1 ring-sky-400/60",
    "hover:scale-105 hover:text-sky-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
  );

  return createPortal(
    <div
      className={clsx(backdropBase, className)}
      role={role}
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      onMouseDown={onBackdropMouseDown}
      ref={backdropRef}
    >
      {/* <div className={clsx(contentBase, contentClassName)} role="document"> */}
        {title ? (
          <header className="mb-4 text-center">
            <h2 id={titleId} className={titleBase}>{title}</h2>
            <div className={titleUnderline} />
          </header>
        ) : null}

        <button
          type="button"
          className={closeBtnBase}
          aria-label="Close"
          onClick={onClose}
          ref={closeBtnRef}
        >
          &times;
        </button>

        {children}
      {/* </div> */}
    </div>,
    container
  );
}