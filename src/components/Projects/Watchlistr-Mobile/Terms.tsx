// src/components/Projects/Watchlistr-Mobile/Terms.tsx
"use client";

import React from "react";
import DocShell from "../DocShell";

const LAST_UPDATED = "April 04, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";
const SITE_URL = "https://www.rubenmanzano.com/watchlistr-mobile";

export default function Terms() {
  return (
    <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These Terms of Use apply to the Watchlistr mobile app, developed by devzano, and made available as an
        ad-supported service. By downloading or using Watchlistr, you agree to these terms.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Use of the App</h2>
        <p>
          Watchlistr helps you browse, track, and manage your favorite movies and TV shows. Use the app for personal,
          non-commercial purposes only. You may not copy, modify, or attempt to extract the source code. All trademarks,
          code, and IP belong to me or respective providers.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Accounts &amp; Data</h2>
        <p>
          When you sign in with Apple/Google or email, your account info is securely stored via Firebase. You’re
          responsible for keeping your device and account safe. If you upload a profile picture or schedule
          notifications, those settings are tied to your account and stored in the cloud.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Third-Party Services</h2>
        <p>Watchlistr relies on trusted services:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li><strong className="text-slate-100">Firebase</strong> — authentication &amp; storing watchlist data</li>
          <li><strong className="text-slate-100">Google AdMob</strong> — displaying ads</li>
          <li><strong className="text-slate-100">TMDB</strong> — media information</li>
        </ul>
        <p className="mt-2">Each has its own Terms and Privacy Policy; please review them.</p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Internet &amp; Connectivity</h2>
        <p>
          Some features require internet access. I’m not responsible for issues from lack of connectivity, roaming
          charges, or data usage.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Device Responsibility</h2>
        <p>
          Keep your device charged, updated, and functioning. I’m not liable for loss of access due to device issues.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Content Accuracy</h2>
        <p>
          Information from TMDB is provided as-is. While I aim for accuracy, I can’t guarantee completeness or
          reliability and am not responsible for issues arising from reliance on that content.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Updates &amp; Termination</h2>
        <p>
          I may update the app or these terms at any time. If the app is no longer supported, I may remove it from app
          stores and end service without notice; your access and associated data will end accordingly.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Changes to These Terms</h2>
        <p>
          Updates may be posted here with a new effective date. Continued use means you accept the updated terms.
        </p>
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