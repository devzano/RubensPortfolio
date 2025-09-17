// src/components/Projects/StarshipPixelscape/Privacy.tsx
"use client";

import React from "react";
import DocShell from "../DocShell";

const LAST_UPDATED = "February 5, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Privacy() {
  return (
    <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy applies to the Starship Pixelscape mobile application
        (&ldquo;Application&rdquo;) created by devzano (&ldquo;Service Provider&rdquo;) as a free
        service. The Application is provided &ldquo;AS IS.&rdquo;
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">1) Information Collection &amp; Use</h2>
        <p>
          The Application <strong className="text-slate-100">does not collect, store, or share</strong> personal
          data, browsing history, device identifiers, analytics, or background activity data. It also does
          <strong className="text-slate-100"> not</strong> collect precise location information.
        </p>
        <p className="mt-2">
          If you voluntarily contact us (e.g., by email), we may use your message and email address to
          respond to you. This communication occurs outside the app itself.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">2) Third-Party Access</h2>
        <p>
          The Application does <strong className="text-slate-100">not</strong> integrate analytics SDKs, ad networks, or tracking
          technologies. If this changes in the future, this Policy will be updated before such features
          are enabled.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">3) Disclosure of Information</h2>
        <p>
          As the Application does not collect personal data, routine disclosures do not apply. However,
          information you voluntarily provide (e.g., via support email) may be disclosed if required by
          law, to protect rights/safety, investigate fraud, or respond to government requests.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">4) Opt-Out</h2>
        <p>
          You can stop using the Application at any time by uninstalling it via your device or app
          marketplace. The app itself retains no personal data to erase. For emails you sent us, contact{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          to request deletion from our correspondence records.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">5) Children’s Privacy</h2>
        <p>
          The Application is not directed to children under 13, and we do not knowingly collect personal
          information from children. If you believe a child has provided personal information, please
          contact us so we can delete it promptly.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">6) Security</h2>
        <p>
          We take reasonable measures to protect any information exchanged outside the app (e.g., support
          emails). The Application itself stores no personal data on our servers.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7) Changes to this Policy</h2>
        <p>
          We may update this Policy from time to time. Updates will be posted here and/or in-app. Continued
          use signifies acceptance of the revised Policy.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">8) Contact</h2>
        <p>
          Questions about this Policy? Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </DocShell>
  );
}