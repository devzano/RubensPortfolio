// src/components/Projects/SunshineKeyWestChallenge/Privacy.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "April 04, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";
const SITE_URL = "https://www.rubenmanzano.com/sunshinekeywestchallenge";

export default function Privacy() {
  return (
    <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy explains how the Sunshine Key West Challenge app handles your information.
        We do not collect or store any personal data from users. The app may request limited permissions,
        such as access to your device’s location or photos, to enable certain features. These permissions
        are optional, and no personal information is shared with third parties.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Definitions</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li><strong>Application</strong> refers to the Sunshine Key West Challenge mobile app.</li>
          <li><strong>Device</strong> means any mobile device (e.g., smartphone or tablet) used to access the app.</li>
          <li><strong>Service</strong> refers to the functionality provided by the Application.</li>
          <li><strong>You</strong> means the individual using the Application.</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Collecting &amp; Using Your Data</h2>
        <p>
          The app does not collect or store personal data on its own servers. It may request access to
          certain device features to provide a better experience:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            <strong className="text-slate-100">Location:</strong> If enabled, used to show event-related
            context (e.g., maps). Location data is never stored or shared externally.
          </li>
          <li>
            <strong className="text-slate-100">Photos &amp; Media:</strong> Images you download are saved
            directly to your device. No uploads or remote storage occur.
          </li>
        </ul>
        <p className="mt-2">
          Permissions are optional and can be managed in your device settings at any time.
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-base font-semibold text-slate-100">Use of Your Data</h3>
        <p>
          The app does not collect, process, or share personal data. Any granted permissions are used solely
          to support optional features and are not used for tracking, analytics, or marketing.
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-base font-semibold text-slate-100">Retention of Your Data</h3>
        <p>
          We do not retain any personal data. Images downloaded via the app remain on your device under your control.
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-base font-semibold text-slate-100">Transfer of Your Data</h3>
        <p>
          No personal data is transferred because none is collected or stored. Downloaded content remains local to your device.
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-base font-semibold text-slate-100">Deleting Your Data</h3>
        <p>
          We do not hold personal data to delete. You can remove downloaded images or revoke permissions directly in your device settings.
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-base font-semibold text-slate-100">Disclosure of Your Data</h3>
        <p>
          Since no personal data is collected, there is nothing to disclose to third parties or authorities.
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-base font-semibold text-slate-100">Security</h3>
        <p>
          Because the app does not collect or store personal data, there is no exposure risk via the app itself.
          Any content saved to your device is protected by your device’s operating system and security settings.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Children’s Privacy</h2>
        <p>
          The app is suitable for general audiences and does not collect personal data from users, including children.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Links to Other Websites</h2>
        <p>
          The app may contain links to external sites (e.g., the Diabetes Research Institute or sponsors).
          We are not responsible for their content or data practices; please review their privacy policies.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Changes to this Policy</h2>
        <p>
          Updates will be reflected on this page with a revised date. We recommend checking periodically
          to stay informed about permissions and data-handling details.
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
