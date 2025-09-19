// FeedbackModal.tsx
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
};

export default function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  feedback,
  setFeedback,
  appName,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div
        className="modal-content glassy-effect"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
      >
        <button
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

        <form onSubmit={onSubmit} className="feedback-form">
          <label className="form-label">
            First Name:
            <input
              type="text"
              value={feedback.firstName}
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
              onChange={(e) =>
                setFeedback((prev) => ({ ...prev, message: e.target.value }))
              }
              required
              className="w-full form-input form-textarea"
            />
          </label>

          <button type="submit" className="w-full enhanced-button">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}