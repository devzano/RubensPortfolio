// src/components/Projects/Steda/Privacy.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "April 24, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Privacy() {
  return (
    <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy applies to the Steda mobile application (&ldquo;Application&rdquo;) created by
        devzano (&ldquo;Service Provider&rdquo;) as an ad-supported service. The Application is provided
        &ldquo;AS IS.&rdquo;
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          1) Information Collection &amp; Use
        </h2>
        <p>When you download and use the Application, certain information may be collected automatically:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Device Internet Protocol (IP) address</li>
          <li>Pages you visit within the Application and timestamps</li>
          <li>Time spent on each page and overall session time</li>
          <li>Operating system and basic device information</li>
        </ul>
        <p className="mt-2">
          The Application does not collect precise location data. It may gather approximate location to
          enable features such as:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            <strong className="text-slate-100">Geolocation Services:</strong> Personalized content and
            relevant recommendations.
          </li>
          <li>
            <strong className="text-slate-100">Analytics &amp; Improvements:</strong> Aggregated,
            anonymized insights to improve performance and functionality.
          </li>
          <li>
            <strong className="text-slate-100">Third-Party Services:</strong> Occasional anonymized data
            sent to external services to optimize offerings.
          </li>
        </ul>
        <p className="mt-2">
          If you provide contact information (e.g., email), it may be used to send important notices or
          respond to support requests.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">2) Third-Party Access</h2>
        <p>
          Only aggregated and anonymized data is shared to help improve the Application and related
          services. The Application uses third-party services that have their own privacy policies,
          including:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>AdMob</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">3) Disclosure of Information</h2>
        <p>
          Information you provide or that is collected automatically may be disclosed:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>To comply with law or legal processes</li>
          <li>To protect rights, safety, and prevent fraud</li>
          <li>To trusted service providers working on our behalf under appropriate safeguards</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">4) Opt-Out Rights</h2>
        <p>
          You can stop all information collection by uninstalling the Application via your device or app
          marketplace’s standard process.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">5) Data Retention</h2>
        <p>
          User-provided data is retained while you use the Application and for a reasonable period
          thereafter. To request deletion of data provided via the Application, email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">6) Children’s Privacy</h2>
        <p>
          The Application is not intended for children under 13. We do not knowingly collect personal
          information from children. If a child has provided personal information, contact us so we can
          delete it promptly.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7) Security</h2>
        <p>
          We use reasonable technical and organizational measures to protect information processed and
          maintained by the Application.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">8) Changes to this Policy</h2>
        <p>
          This Policy may be updated periodically. Updates will be posted here and/or in-app. Continued
          use signifies acceptance of the revised Policy.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">9) Contact</h2>
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
