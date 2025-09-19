// src/components/Projects/AutoArchive/Privacy.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "April 24, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Privacy() {
  return (
    <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy applies to the AutoArchive mobile application
        (&ldquo;Application&rdquo;) created by devzano (&ldquo;Service Provider&rdquo;) as an
        ad-supported service. The Application is provided for use &ldquo;AS IS.&rdquo;
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          1. Information Collection and Use
        </h2>
        <p>
          The Application may collect certain information automatically when you download and use it, including:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Your device’s Internet Protocol (IP) address</li>
          <li>Pages you visit within the Application and timestamps</li>
          <li>Time spent on each page and overall session duration</li>
          <li>Your device operating system</li>
        </ul>
        <p className="mt-3">
          The Application does <span className="font-semibold text-slate-100">not</span> collect precise location data.
          It may gather approximate location for:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li><strong className="text-slate-100">Geolocation services:</strong> personalized content and relevant recommendations</li>
          <li><strong className="text-slate-100">Analytics &amp; improvements:</strong> trend analysis and performance enhancements</li>
          <li><strong className="text-slate-100">Third-party services:</strong> occasional anonymized location data to optimize offerings</li>
        </ul>
        <p className="mt-3">
          For an enhanced experience, the Application may ask for personally identifiable information, such as your email address (e.g., {SUPPORT_EMAIL}). This information is retained and used as described in this Policy.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          2. Third-Party Services
        </h2>
        <p>The Application may use third-party services that have their own privacy policies:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Google AdMob — ads</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          3. Disclosure of Information
        </h2>
        <p>Information you provide or that is collected automatically may be disclosed:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>As required by law (e.g., subpoena or legal process)</li>
          <li>To protect rights, safety, investigate fraud, or respond to government requests</li>
          <li>To trusted service providers acting on our behalf under confidentiality obligations</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">4. Opt-Out Rights</h2>
        <p>
          You can stop all information collection by uninstalling the Application using your device’s standard uninstall process or the app marketplace.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">5. Data Retention</h2>
        <p>
          The Service Provider retains user-provided data while you use the Application and for a reasonable period thereafter.
          To request deletion of data you provided, contact
          &nbsp;
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          . We will respond within a reasonable timeframe.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">6. Children’s Privacy</h2>
        <p>
          The Application is not intended for children under 13. We do not knowingly collect personal information from children under 13.
          If you believe a child has provided personal information, please contact us so we can delete it promptly.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7. Security</h2>
        <p>
          We use reasonable physical, electronic, and procedural safeguards to protect information processed and maintained by the Application.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">8. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Updates will be posted in-app and on this page. Continued use signifies acceptance of the revised policy.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">9. Your Consent</h2>
        <p>
          By using the Application, you consent to processing of your information as outlined here, including future amendments.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">10. Contact Us</h2>
        <p>
          Questions about this Privacy Policy? Contact us at&nbsp;
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </DocShell>
  );
}