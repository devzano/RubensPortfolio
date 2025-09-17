// src/components/Projects/Watchlistr-Mobile/Privacy.tsx
"use client";

import React from "react";
import DocShell from "../DocShell";

const LAST_UPDATED = "April 08, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";
const SITE_URL = "https://www.rubenmanzano.com/watchlistr-mobile";

export default function Privacy() {
  return (
    <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy applies to the Watchlistr mobile application developed by devzano. Watchlistr is an
        ad-supported app to browse, track, and manage movies &amp; TV shows. By using Watchlistr, you agree to this policy.
      </p>

      <p>
        Watchlistr uses Firebase for authentication and data storage (including Apple/Google sign-in), Google AdMob to
        display ads, and the TMDB API for media content.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Information Collection and Use</h2>
        <p>When you sign in or create an account, we collect limited information to support your experience:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li><strong className="text-slate-100">Email Address</strong> — identify your account and enable multi-device sign-in</li>
          <li><strong className="text-slate-100">Username</strong> — personalize your profile</li>
          <li><strong className="text-slate-100">Notification Token</strong> — deliver reminders/push notifications you schedule</li>
          <li><strong className="text-slate-100">Profile Picture URL</strong> — display your chosen/Gravatar image</li>
        </ul>
        <p className="mt-2">This data is stored securely in Firebase and not shared for marketing or tracking.</p>
        <p className="mt-2">
          Watchlistr does <strong>not</strong> collect location, contacts, microphone input, or behavioral analytics. If you upload
          a profile photo via camera, the app will request camera permission only for that action and never without consent.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Third-Party Services</h2>
        <p>Trusted services that support core functionality:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li><strong className="text-slate-100">Firebase</strong> — auth &amp; secure storage (watchlist, profile, preferences)</li>
          <li><strong className="text-slate-100">Google AdMob</strong> — in-app ads</li>
          <li><strong className="text-slate-100">TMDB</strong> — media information (no personal data sent to TMDB)</li>
        </ul>
        <p className="mt-2">See their policies for details:</p>
        <ul className="list-disc space-y-1 pl-6 marker:text-sky-400">
          <li><a className="text-sky-400 hover:underline underline-offset-4" href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy Policy</a></li>
          <li><a className="text-sky-400 hover:underline underline-offset-4" href="https://transparency.google/intl/en_US/our-policies/product-terms/google-admob/" target="_blank" rel="noopener noreferrer">Google AdMob Privacy Policy</a></li>
          <li><a className="text-sky-400 hover:underline underline-offset-4" href="https://www.themoviedb.org/privacy-policy" target="_blank" rel="noopener noreferrer">TMDB Privacy Policy</a></li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Disclosure of Information</h2>
        <p>I do not sell or share your personal information for marketing. Limited disclosure may occur for:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li><strong className="text-slate-100">Legal Compliance</strong> — when required by law</li>
          <li><strong className="text-slate-100">Security/Safety</strong> — to investigate fraud, protect rights, or respond to requests</li>
          <li><strong className="text-slate-100">Service Providers</strong> — Firebase stores and processes data on my behalf</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Your Choices</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li><strong className="text-slate-100">Disable notifications</strong> in device settings.</li>
          <li><strong className="text-slate-100">Delete your account</strong> from the Profile screen to remove your Firebase data.</li>
          <li><strong className="text-slate-100">Uninstall the app</strong> to stop data storage and notifications.</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Data Retention</h2>
        <p>
          Data is stored in Firebase only while your account is active. Deleting your account permanently removes your
          watchlist, profile info, and notification preferences. No personal data is stored outside Firebase.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Children’s Privacy</h2>
        <p>
          Watchlistr isn’t intended for users under 13. If an under-13 account is discovered, it will be deleted per policy.
          Parents/guardians can contact me at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 hover:underline underline-offset-4">
            {SUPPORT_EMAIL}
          </a>.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Security</h2>
        <p>
          Watchlistr uses Firebase’s security features (auth safeguards, encrypted storage, access controls). While no system
          is 100% secure, I rely on trusted platforms and best practices to help protect your data.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Changes to this Policy</h2>
        <p>Updates will be reflected here with a revised date. Continued use constitutes acceptance of changes.</p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Contact Me</h2>
        <ul className="list-disc space-y-1 pl-6 marker:text-sky-400">
          <li><strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 hover:underline underline-offset-4">{SUPPORT_EMAIL}</a></li>
          <li><strong>Website:</strong> <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline underline-offset-4">{SITE_URL}</a></li>
        </ul>
      </div>
    </DocShell>
  );
}