// src/components/Projects/Logiqo/Privacy.tsx
"use client";

import React from "react";
import DocShell from "../DocShell";

const LAST_UPDATED = "July 20, 2024";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Privacy() {
  return (
    <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy applies to the Logiqo mobile application
        (&ldquo;Application&rdquo;) created by devzano (&ldquo;Service Provider&rdquo;) as an
        ad-supported service. The Application is provided for use &ldquo;AS IS.&rdquo;
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          1. Information Collection and Use
        </h2>
        <p>
          The Application collects certain information automatically when you download and use it.
          This may include:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Your device’s Internet Protocol (IP) address</li>
          <li>Pages visited within the Application and the time/date of each visit</li>
          <li>Time spent on pages and overall session duration</li>
          <li>The operating system used on your device</li>
        </ul>
        <p className="mt-3">
          For an enhanced experience, the Application may request personally identifiable information
          (e.g., your email address such as {SUPPORT_EMAIL}). Any such information is retained and used
          as described in this Policy.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">2. Location Data</h2>
        <p>
          The Application does <span className="font-semibold text-slate-100">not</span> collect precise
          (GPS) location. It may gather approximate location to:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            <strong className="text-slate-100">Geolocation services:</strong> provide relevant content
            and location-based features
          </li>
          <li>
            <strong className="text-slate-100">Analytics &amp; improvements:</strong> analyze behavior and
            performance trends in aggregate
          </li>
          <li>
            <strong className="text-slate-100">Third-party services:</strong> occasionally transmit anonymized
            location data to improve the Application
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">3. Communications</h2>
        <p>
          The Service Provider may use information you provide to contact you with important notices,
          required communications, or promotions related to the Application.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          4. Third-Party Access &amp; Services
        </h2>
        <p>
          Only aggregated and anonymized data may be shared with external services to help improve the
          Application. The Application also uses third-party services with their own privacy policies:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Google AdMob — ads</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          5. Disclosure of Information
        </h2>
        <p>Information may be disclosed:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>As required by law (e.g., subpoena or similar legal process)</li>
          <li>
            To protect rights, safety, investigate fraud, or respond to government requests
          </li>
          <li>
            To trusted providers working on our behalf under confidentiality obligations
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">6. Opt-Out Rights</h2>
        <p>
          You can stop all information collection by uninstalling the Application using your device’s
          standard uninstall process or the application marketplace.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7. Data Retention</h2>
        <p>
          User-provided data is retained while you use the Application and for a reasonable time thereafter.
          To request deletion of data you provided, email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          . We will respond within a reasonable timeframe.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">8. Children’s Privacy</h2>
        <p>
          The Application is not intended for children under 13, and we do not knowingly collect personal
          information from them. If you believe a child has provided such information, contact us to delete
          it promptly.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">9. Security</h2>
        <p>
          We implement reasonable physical, electronic, and procedural safeguards to protect information
          processed and maintained by the Application.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          10. Changes to this Policy
        </h2>
        <p>
          This Policy may be updated periodically. Updates will be posted on this page and/or in-app.
          Continued use signifies acceptance of the revised Policy.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">11. Your Consent</h2>
        <p>
          By using the Application, you consent to the processing of your information as outlined here,
          including future amendments.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">12. Contact Us</h2>
        <p>
          Questions about this Privacy Policy? Contact{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </DocShell>
  );
}