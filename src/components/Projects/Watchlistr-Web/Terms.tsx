import React from "react";

const Terms = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Terms of Service</h1>
      <p>Last updated: April 04, 2025</p>
      <p>
        These Terms of Use apply to the Watchlistr mobile app, developed by devzano, and made available as an ad-supported service. By downloading or using Watchlistr, you agree to these terms.
      </p>

      <h2>Use of the App</h2>
      <p>
        Watchlistr is designed to help you browse, track, and manage your favorite movies and tv shows. You agree to use the app for personal, non-commercial purposes only.
      </p>
      <p>
        You may not copy, modify, or attempt to extract the source code of the app. All trademarks, code, and intellectual property belong to me or the respective content providers.
      </p>

      <h2>Accounts & Data</h2>
      <p>
        When you sign in using Apple or Google or create an account using your email address, your account info is securely stored using Firebase. You are responsible for keeping your device and account safe.
      </p>
      <p>
        If you choose to upload a profile picture or schedule notifications, those settings are tied to your account and stored in the cloud.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        Watchlistr uses a few trusted services to function properly:
      </p>
      <ul>
        <li><strong>Firebase</strong> – for secure authentication and storing watchlist data</li>
        <li><strong>Google AdMob</strong> – for displaying ads</li>
        <li><strong>TMDB (The Movie Database)</strong> – for providing movie and tv information</li>
      </ul>
      <p>
        Each of these services has its own Terms of Use and Privacy Policy. I recommend reviewing them for more info.
      </p>

      <h2>Internet & Connectivity</h2>
      <p>
        Some features require an internet connection. I’m not responsible for any issues caused by lack of connectivity, roaming charges, or mobile data usage.
      </p>

      <h2>Device Responsibility</h2>
      <p>
        It’s your responsibility to keep your device charged, up-to-date, and functioning. I’m not liable for any loss of access due to technical issues on your device.
      </p>

      <h2>Content Accuracy</h2>
      <p>
        While I strive to display accurate and up-to-date info from TMDB, I can’t guarantee its completeness or reliability. I’m not responsible for any issues that arise from relying on that content.
      </p>

      <h2>Updates & Termination</h2>
      <p>
        I may update the app or these terms at any time. If the app is no longer supported, I may remove it from app stores and end service without notice. If that happens, your access to the app and any associated data will end.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        These Terms of Use may be updated from time to time. I’ll post updates here with the new effective date. Continued use of the app means you accept the updated terms.
      </p>

      <h2>Contact Me</h2>
      <p>
        If you have any questions or suggestions about these terms, feel free to reach out:
      </p>
      <ul>
        <li><strong>Email:</strong> rmanzano.se@gmail.com</li>
        <li><strong>Website:</strong> <a href="https://www.rubenmanzano.com/watchlistr-mobile" target="_blank" rel="noopener noreferrer">https://www.rubenmanzano.com/watchlistr-mobile</a></li>
      </ul>
    </div>
  );
};

export default Terms;