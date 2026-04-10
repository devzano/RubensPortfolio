// FeedbackModal.tsx
"use client";

import { useEffect, useRef } from "react";
import "./FeedbackModal.css";

export type Feedback = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  feedback: Feedback;
  setFeedback: React.Dispatch<React.SetStateAction<Feedback>>;
  appName: string;
  isSubmitting?: boolean;
  statusMessage?: string | null;
  statusTone?: "success" | "error" | null;
};

export default function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  feedback,
  setFeedback,
  appName,
  isSubmitting = false,
  statusMessage = null,
  statusTone = null,
}: Props) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content glassy-effect"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
        aria-describedby="feedback-modal-description"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="close-button"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>

        <h2 id="feedback-modal-title" className="modal-title">
          Send Feedback for <span className="app-name">{appName}</span>
        </h2>

        <p id="feedback-modal-description" className="sr-only">
          Share feedback about this project using your name, email, and message.
        </p>

        {statusMessage && (
          <p
            role="status"
            aria-live="polite"
            className={statusTone === "error" ? "text-red-300" : "text-emerald-300"}
          >
            {statusMessage}
          </p>
        )}

        <form onSubmit={onSubmit} className="feedback-form">
          <label className="form-label">
            First Name:
            <input
              type="text"
              value={feedback.firstName}
              disabled={isSubmitting}
              onChange={(e) =>
                setFeedback((prev) => ({ ...prev, firstName: e.target.value }))
              }
              required
              className="w-full form-input"
            />
          </label>

          <label className="form-label">
            Last Name:
            <input
              type="text"
              value={feedback.lastName}
              disabled={isSubmitting}
              onChange={(e) =>
                setFeedback((prev) => ({ ...prev, lastName: e.target.value }))
              }
              required
              className="w-full form-input"
            />
          </label>

          <label className="form-label">
            Email:
            <input
              type="email"
              value={feedback.email}
              disabled={isSubmitting}
              onChange={(e) =>
                setFeedback((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              className="w-full form-input"
            />
          </label>

          <label className="form-label">
            Message:
            <textarea
              value={feedback.message}
              disabled={isSubmitting}
              onChange={(e) =>
                setFeedback((prev) => ({ ...prev, message: e.target.value }))
              }
              required
              className="w-full form-input form-textarea"
            />
          </label>

          <button type="submit" disabled={isSubmitting} className="w-full enhanced-button">
            {isSubmitting ? "Sending..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
