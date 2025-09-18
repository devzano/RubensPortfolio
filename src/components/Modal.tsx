// src/components/Modal.tsx
"use client";

import { useEffect, useRef, useId } from "react";
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
  /** Extra classes to add to the backdrop (defaults are always applied) */
  className?: string;
  /** Extra classes to add to the inner content (defaults are always applied) */
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
  contentClassName = "",
}: ModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const headingUid = useId();
  const headingId = title ? `modal-title-${headingUid}` : undefined;

  // Prepare a portal node (dark-only, no theme toggling needed)
  if (!portalRef.current && typeof document !== "undefined") {
    portalRef.current = document.createElement("div");
    portalRef.current.className = "modal-portal";
  }

  // Attach portal to DOM
  useEffect(() => {
    if (!portalRef.current) return;
    const root = document.getElementById("modal-root") || document.body;
    root.appendChild(portalRef.current);
    return () => {
      root.removeChild(portalRef.current!);
    };
  }, []);

  // Focus mgmt + ESC + scroll lock
  useEffect(() => {
    if (!isOpen) return;

    lastActiveRef.current = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      } else {
        const firstFocusable = backdropRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }
    };
    focusFirst();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        // basic focus trap
        const nodes = Array.from(
          backdropRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) || []
        ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

        if (nodes.length === 0) return;

        const idx = nodes.indexOf(document.activeElement as HTMLElement);
        let nextIdx = idx;

        if (e.shiftKey) nextIdx = idx <= 0 ? nodes.length - 1 : idx - 1;
        else nextIdx = idx === nodes.length - 1 ? 0 : idx + 1;

        nodes[nextIdx].focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // prevent background scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastActiveRef.current?.focus?.();
    };
  }, [isOpen, closeOnEsc, onClose, initialFocusRef]);

  if (!isOpen || !portalRef.current) return null;

  const onBackdropMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) onClose();
  };

  // DARK-ONLY tokens
  const backdropBase = clsx(
    "fixed inset-0 z-[1000] grid place-items-center p-4 sm:p-6 backdrop-blur-sm",
    "bg-black/60"
  );

  const contentBase = clsx(
    "relative w-full max-w-3xl rounded-2xl p-6 sm:p-8",
    "text-slate-100",
    "bg-white/10 backdrop-blur-md",
    "border border-white/10",
    "ring-1 ring-white/10",
    "shadow-2xl shadow-black/40",
    "outline outline-1 outline-white/10"
  );

  const titleBase = clsx(
    "text-center font-semibold tracking-tight",
    "text-2xl sm:text-3xl"
  );

  const titleUnderline = clsx(
    "mx-auto mt-3 h-px w-24",
    "bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"
  );

  const closeBtnBase = clsx(
    "absolute right-3 top-3 inline-grid h-9 w-9 place-items-center rounded-full transition",
    "border border-white/10 bg-white/10 text-slate-200",
    "shadow-md shadow-black/20",
    "ring-1 ring-sky-400/60",
    "hover:scale-105 hover:text-sky-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
  );

  const wrapperClass = clsx(backdropBase, className);
  const cardClass = clsx(contentBase, contentClassName);

  return createPortal(
    <div
      className={wrapperClass}
      role={role}
      aria-modal="true"
      aria-labelledby={headingId}
      onMouseDown={onBackdropMouseDown}
      ref={backdropRef}
    >
      <div className={cardClass}>
        {title ? (
          <header className="mb-4 text-center">
            <h2 id={headingId} className={titleBase}>
              {title}
            </h2>
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
      </div>
    </div>,
    portalRef.current
  );
}