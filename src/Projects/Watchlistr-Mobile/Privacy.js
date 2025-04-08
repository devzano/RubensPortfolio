import React from "react";

const Privacy = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Privacy Policy</h1>
      <p>Last updated: April 08, 2025</p>
      <p>
        This Privacy Policy applies to the Watchlistr mobile application developed by devzano. Watchlistr is
        an ad-supported mobile app designed to help users browse, track, and manage
        movies and tv shows. The app is intended for personal use only.
      </p>
      <p>
        Watchlistr uses Firebase for authentication and data storage, including secure sign-in via Apple or Google accounts. It also uses Google AdMob to display ads and the TMDB API to provide media content.
      </p>
      <p>
        By using Watchlistr, you agree to the practices described in this Privacy Policy.
      </p>

      <h2>Information Collection and Use</h2>
      <p>
        When you create an account or sign in to Watchlistr using Apple or Google, we collect limited personal information to support your experience in the app. This includes:
      </p>
      <ul>
        <li><strong>Email Address</strong> – used to identify your account and enable sign-in across devices</li>
        <li><strong>Username</strong> – used to personalize your profile</li>
        <li><strong>Notification Token</strong> – used to deliver reminders and push notifications you’ve scheduled</li>
        <li><strong>Profile Picture URL</strong> – used to display a custom or Gravatar-based profile image</li>
      </ul>
      <p>
        This information is securely stored in Firebase and is not shared with third parties for advertising or tracking purposes.
      </p>
      <p>
        Watchlistr does <strong>not</strong> collect your location, contact list, microphone input, or behavioral analytics. If you choose to upload a profile picture using your device’s camera, the app will request permission to access your camera. This is only used to capture your chosen photo and is never accessed without your consent.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        Watchlistr uses a few trusted third-party services to provide core functionality. These services may collect anonymized or technical data according to their own privacy policies:
      </p>
      <ul>
        <li><strong>Firebase</strong> – used for user authentication, secure data storage (e.g., watchlist, and profile information)</li>
        <li><strong>Google AdMob</strong> – used to display in-app ads</li>
        <li><strong>TMDB (The Movie Database)</strong> – used to display media information (we do not send your personal data to TMDB)</li>
      </ul>
      <p>
        These services may use cookies or device identifiers to support functionality or improve performance. We recommend reviewing their privacy policies for more details:
      </p>
      <ul>
        <li><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy Policy</a></li>
        <li><a href="https://transparency.google/intl/en_US/our-policies/product-terms/google-admob/" target="_blank" rel="noopener noreferrer">Google AdMob Privacy Policy</a></li>
        <li><a href="https://www.themoviedb.org/privacy-policy" target="_blank" rel="noopener noreferrer">TMDB Privacy Policy</a></li>
      </ul>

      <h2>Disclosure of Information</h2>
      <p>
        I do not sell or share your personal information with third parties for marketing purposes.
      </p>
      <p>
        I may disclose limited information in the following situations:
      </p>
      <ul>
        <li><strong>Legal Compliance:</strong> If required by law, such as to comply with a subpoena, court order, or other legal process.</li>
        <li><strong>Security or Safety:</strong> If necessary to investigate fraud, protect our rights, safeguard user safety, or respond to a government request.</li>
        <li><strong>Service Providers:</strong> Your data is stored and processed by Firebase, which acts as a secure backend service on my behalf.</li>
      </ul>

      <h2>Opt-Out Rights</h2>
      <p>
        You have full control over your Watchlistr experience. At any time, you may:
      </p>
      <ul>
        <li><strong>Disable Notifications</strong> - by turning them off in your device settings.</li>
        <li><strong>Delete Your Account</strong> - directly from the Profile screen in the app. This will permanently remove your saved data from Firebase.</li>
        <li><strong>Uninstall The App</strong> - to stop all data storage and push notifications.</li>
      </ul>

      <h2>Data Retention Policy</h2>
      <p>
        Your data is stored securely in Firebase and retained only while your account is active.
      </p>
      <p>
        If you choose to delete your account from within the app, all associated data (including your watchlist, profile info, and notification preferences) will be permanently removed.
      </p>
      <p>
        No personal data is stored outside of Firebase, and I do not retain any data once your account is deleted.
      </p>

      <h2>Children’s Privacy</h2>
      <p>
        Watchlistr is not intended for use by children under the age of 13. I do not knowingly collect personal information from users under 13 years old.
      </p>
      <p>
        If I learn that an account has been created by someone under 13, it will be deleted in accordance with the data policies.
      </p>
      <p>
        If you are a parent or guardian and believe your child has created an account, please contact me at <a href="mailto:rmanzano.se@gmail.com">rmanzano.se@gmail.com</a> so I can take appropriate action.
      </p>

      <h2>Security</h2>
      <p>
        I take the security of your personal data seriously. Watchlistr uses Firebase to store all user-related data, which includes built-in security features like authentication safeguards, encrypted storage, and access controls.
      </p>
      <p>
        While no system can be 100% secure, I rely on trusted platforms and best practices to help protect your account information and personal preferences from unauthorized access or misuse.
      </p>

      <h2>Changes to this Privacy Policy</h2>
      <p>I may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date at the top.</p>
      <p>I recommend checking this page occasionally to stay informed about how the app handles permissions and data-related features.</p>

      <h2>Your Consent</h2>
      <p>
        By using Watchlistr, you agree to the terms outlined in this Privacy Policy, including how your information is stored and used. Your continued use of the app after any updates means you accept those changes.
      </p>

      <h2>Contact Me</h2>
      <p>If you have any questions or concerns about this Privacy Policy, feel free to reach out:</p>
      <ul>
        <li><strong>Email:</strong> rmanzano.se@gmail.com</li>
        <li><strong>Website:</strong> <a href="https://www.rubenmanzano.com/watchlistr-mobile" target="_blank" rel="noopener noreferrer">https://www.rubenmanzano.com/watchlistr-mobile</a></li>
      </ul>
    </div>
  );
};

export default Privacy;