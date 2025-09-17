// src/components/Modal.tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  closeOnEsc?: boolean;
  closeOnBackdrop?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  role?: "dialog" | "alertdialog";
  className?: string;        // extra backdrop classes
  contentClassName?: string; // extra content classes
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
  const [mounted, setMounted] = useState(false);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const headingUid = useId();
  const headingId = title ? `modal-title-${headingUid}` : undefined;

  // mount portal on client only
  useEffect(() => {
    setMounted(true);
    const node = document.createElement("div");
    node.className = "modal-portal";
    portalRef.current = node;

    const root = document.getElementById("modal-root") || document.body;
    root.appendChild(node);

    return () => {
      root.removeChild(node);
      portalRef.current = null;
    };
  }, []);

  // focus trap + esc + scroll lock
  useEffect(() => {
    if (!mounted || !isOpen) return;

    lastActiveRef.current = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      if (initialFocusRef?.current) initialFocusRef.current.focus();
      else if (closeBtnRef.current) closeBtnRef.current.focus();
      else {
        const first = backdropRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        first?.focus();
      }
    };
    focusFirst();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = Array.from(
        backdropRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) || []
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (nodes.length === 0) return;
      const idx = nodes.indexOf(document.activeElement as HTMLElement);
      const nextIdx = e.shiftKey ? (idx <= 0 ? nodes.length - 1 : idx - 1)
                                 : (idx === nodes.length - 1 ? 0 : idx + 1);
      nodes[nextIdx].focus();
      e.preventDefault();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastActiveRef.current?.focus?.();
    };
  }, [mounted, isOpen, closeOnEsc, onClose, initialFocusRef]);

  if (!mounted || !isOpen || !portalRef.current) return null;

  const onBackdropMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) onClose();
  };

  // Glassy defaults
  const backdropBase =
    "fixed inset-0 z-[1000] grid place-items-center bg-black/40 backdrop-blur-sm p-4 sm:p-6";
  const contentBase =
    "relative w-full max-w-3xl rounded-2xl border border-white/10 bg-white/10 text-slate-100 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-md p-6 sm:p-8";
  const titleBase = "text-center text-2xl sm:text-3xl font-semibold tracking-tight";
  const titleUnderline =
    "mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent";
  const closeBtnBase =
    "absolute right-3 top-3 inline-grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-200 shadow-md shadow-black/20 ring-1 ring-white/10 backdrop-blur-md transition hover:scale-105 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60";

  return createPortal(
    <div
      className={`${backdropBase} ${className}`}
      role={role}
      aria-modal="true"
      aria-labelledby={headingId}
      onMouseDown={onBackdropMouseDown}
      ref={backdropRef}
    >
      <div className={`${contentBase} ${contentClassName}`}>
        {title ? (
          <header className="mb-4 text-center">
            <h2 id={headingId} className={titleBase}>{title}</h2>
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