// src/components/Projects/Watchlistr-Web/Terms.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "April 08, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";
const SITE_URL = "https://www.rubenmanzano.com/watchlistr-web";

export default function Terms() {
  return (
        <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
          <p>
            These Terms govern your use of the Watchlistr website (“Site”). By accessing or using the Site,
            you agree to be bound by these Terms.
          </p>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">1. Purpose &amp; License</h2>
            <p>
              Watchlistr lets you browse, track, and manage movies and TV shows for personal, non-commercial
              use. You are granted a limited, non-exclusive, non-transferable license to use the Site
              in accordance with these Terms.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">2. Acceptable Use</h2>
            <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
              <li>No scraping, reverse engineering, or attempts to extract source code.</li>
              <li>No misuse that disrupts the Site or harms other users.</li>
              <li>No infringement of third-party rights or violation of applicable laws.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">3. Accounts</h2>
            <p>
              You may create an account to sync your data across devices. You are responsible for your
              account credentials and all activity under your account. Keep your login information secure
              and up to date.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">4. Third-Party Services</h2>
            <p>The Site integrates with trusted providers:</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
              <li>
                <strong className="text-slate-100">Supabase</strong> — authentication and database/storage for your
                watchlist and profile.
              </li>
              <li>
                <strong className="text-slate-100">TMDB (The Movie Database)</strong> — media information and artwork.
              </li>
            </ul>
            <p className="mt-2">
              Each third-party service has its own Terms and Privacy Policy, which govern their handling of
              data and content.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">5. Content &amp; Accuracy</h2>
            <p>
              Media metadata and images are provided by external sources (e.g., TMDB). While we aim for
              accuracy, we do not guarantee completeness or reliability. The Site and content are provided
              “as is.”
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">6. Availability &amp; Connectivity</h2>
            <p>
              The Site requires internet access. We are not responsible for network fees, connectivity issues,
              or service interruptions. We may modify, suspend, or discontinue the Site at any time without
              liability to you.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">7. Intellectual Property</h2>
            <p>
              All software, design, and branding on the Site are owned by devzano or licensed to us. You may
              not reproduce, distribute, or create derivative works without permission. TMDB content is subject
              to TMDB’s terms and attribution requirements.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">8. Disclaimers &amp; Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, the Site is provided without warranties of any kind.
              We are not liable for any indirect, incidental, or consequential damages arising from your use of
              the Site or reliance on its content.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">9. Termination</h2>
            <p>
              We may suspend or terminate your access if you violate these Terms. Upon termination, your right
              to use the Site ceases immediately. You may delete your account at any time (see Privacy Policy
              for data handling and retention).
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">10. Changes to These Terms</h2>
            <p>
              We may update these Terms periodically. Updates will be posted with a new effective date. Your
              continued use indicates acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">11. Contact</h2>
            <ul className="list-disc space-y-1 pl-6 marker:text-sky-400">
              <li>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 hover:underline underline-offset-4">
                  {SUPPORT_EMAIL}
                </a>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline underline-offset-4">
                  {SITE_URL}
                </a>
              </li>
            </ul>
          </div>
    </DocShell>
  );
}