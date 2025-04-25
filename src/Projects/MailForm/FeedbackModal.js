import React from 'react';
import './FeedbackModal.css';

const FeedbackModal = ({ isOpen, onClose, onSubmit, feedback, setFeedback, appName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content glassy-effect">
        <span className="close-button" onClick={onClose} aria-label="Close Modal">
          &times;
        </span>
        <h2 className="modal-title">Send Feedback for <span className="app-name">{appName}</span></h2>
        <form onSubmit={onSubmit} className="feedback-form">
          <label className="form-label">
            First Name:
            <input
              type="text"
              value={feedback.firstName}
              onChange={(e) => setFeedback({ ...feedback, firstName: e.target.value })}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Last Name:
            <input
              type="text"
              value={feedback.lastName}
              onChange={(e) => setFeedback({ ...feedback, lastName: e.target.value })}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email:
            <input
              type="email"
              value={feedback.email}
              onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Message:
            <textarea
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
              required
              className="form-input form-textarea"
            />
          </label>
          <button type="submit" className="app-button enhanced-button">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;