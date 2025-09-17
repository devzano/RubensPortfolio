// src/components/Projects/SunshineKeyWestChallenge/Terms.tsx
"use client";

import React from "react";
import DocShell from "../DocShell";

const LAST_UPDATED = "April 04, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";
const SITE_URL = "https://www.rubenmanzano.com/sunshinekeywestchallenge";

export default function Terms() {
  return (
    <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These Terms govern your use of the Sunshine Key West Challenge mobile app. By using the app, you agree
        to these Terms.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Use of the App</h2>
        <p>
          The app is provided for informational purposes (e.g., event schedules, photos, and related media).
          You may use it for personal, non-commercial purposes. Do not use the app in ways that violate laws,
          disrupt functionality, or harm others.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Intellectual Property</h2>
        <p>
          All content (including images, logos, and text) is owned by the event organizers or used with permission.
          You may not reproduce or distribute this content without prior written consent.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Downloads</h2>
        <p>
          The app may allow you to download photos or other media. These are saved directly to your device for
          personal enjoyment. You are responsible for managing downloaded content on your device.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">External Links</h2>
        <p>
          The app may include links to websites not controlled by us (e.g., DRI or sponsors). We are not
          responsible for the content, policies, or practices of those third-party sites.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Disclaimer</h2>
        <p>
          The app is provided “as is,” without warranties of any kind. While we strive for accuracy, we make no
          guarantees regarding completeness, reliability, or availability.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Limitation of Liability</h2>
        <p>
          We are not liable for damages or losses resulting from use of the app, including issues related to
          downloads, permissions, or access to external content.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Updates will be posted here with a revised date. Continued
          use of the app constitutes acceptance of the updated Terms.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Contact Us</h2>
        <ul className="list-disc space-y-1 pl-6 marker:text-sky-400">
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 underline-offset-4 hover:underline"
            >
              {SITE_URL}
            </a>
          </li>
        </ul>
      </div>
    </DocShell>
  );
}