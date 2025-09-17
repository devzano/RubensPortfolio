import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Optional heading shown at the top (adds aria-labelledby automatically) */
  title?: string;
  /** Modal content */
  children?: React.ReactNode;
  /** Close when pressing Escape (default: true) */
  closeOnEsc?: boolean;
  /** Close when clicking the backdrop (default: true) */
  closeOnBackdrop?: boolean;
  /** Focus this element when the modal opens (falls back to close button) */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** Override role if you need an alertdialog */
  role?: "dialog" | "alertdialog";
  /** CSS class for the outer backdrop */
  className?: string;
  /** CSS class for the inner content container */
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
  className = "modal",
  contentClassName = "modal-content",
}: ModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);

  // Prepare a portal node
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
        // simple focus trap
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
      // restore focus
      lastActiveRef.current?.focus?.();
    };
  }, [isOpen, closeOnEsc, onClose, initialFocusRef]);

  if (!isOpen || !portalRef.current) return null;

  const onBackdropMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) onClose();
  };

  const headingId = title ? "modal-title" : undefined;

  return createPortal(
    <div
      className={className}
      role={role}
      aria-modal="true"
      aria-labelledby={headingId}
      onMouseDown={onBackdropMouseDown}
      ref={backdropRef}
    >
      <div className={contentClassName}>
        {title ? (
          <h2 id={headingId} className="modal-title">
            {title}
          </h2>
        ) : null}

        <button
          type="button"
          className="close-button"
          aria-label="Close Modal"
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