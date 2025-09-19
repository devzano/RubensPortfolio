// src/components/Projects/RecipeRealm/Privacy.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "July 20, 2024";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Privacy() {
  return (
       <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
          <p>
            This Privacy Policy applies to the RecipeRealm mobile application (&ldquo;Application&rdquo;)
            created by devzano (&ldquo;Service Provider&rdquo;) as an ad-supported service. The Application is
            provided for use &ldquo;AS IS.&rdquo;
          </p>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">
              1) Information Collection &amp; Use
            </h2>
            <p>The Application may automatically collect the following when you download and use it:</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
              <li>Your device’s Internet Protocol (IP) address</li>
              <li>Pages you visit within the Application with time/date stamps</li>
              <li>Time spent on each page and overall session duration</li>
              <li>The operating system used on your mobile device</li>
            </ul>
            <p className="mt-3">
              For an enhanced experience, the Application may request certain personally identifiable
              information (e.g., your email). Any information you provide is retained and used as described
              in this Policy.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">
              2) Location Data (Approximate)
            </h2>
            <p>The Application does not collect precise GPS location. It may use approximate location to:</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
              <li>
                <strong className="text-slate-100">Geolocation Services:</strong> Offer personalized content,
                relevant recommendations, or location-based services.
              </li>
              <li>
                <strong className="text-slate-100">Analytics &amp; Improvements:</strong> Analyze anonymized
                usage trends and improve performance/features.
              </li>
              <li>
                <strong className="text-slate-100">Third-Party Services:</strong> Occasionally share anonymized
                location data to help optimize the Application.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">3) Communications</h2>
            <p>
              The Service Provider may use the information you provide to contact you with important
              information, required notices, or marketing promotions related to the Application.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">4) Third-Party Access</h2>
            <p>
              Only aggregated and anonymized data may be shared with external services to help improve the
              Application and related services. The Application also uses third-party services with their own
              privacy policies:
            </p>
            <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
              <li>Google AdMob — ads</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">5) Disclosure of Information</h2>
            <p>Information may be disclosed:</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
              <li>As required by law (e.g., subpoena or similar legal process)</li>
              <li>To protect rights/safety, investigate fraud, or respond to government requests</li>
              <li>To trusted providers working on our behalf under confidentiality obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">6) Opt-Out Rights</h2>
            <p>
              You can stop all information collection by uninstalling the Application using your device’s
              standard uninstall process or through the app marketplace.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">7) Data Retention</h2>
            <p>
              User-provided data is retained while you use the Application and for a reasonable time
              thereafter. To request deletion of data you provided, email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
                {SUPPORT_EMAIL}
              </a>
              . We will respond within a reasonable timeframe.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">8) Children’s Privacy</h2>
            <p>
              The Application is not intended for children under 13, and we do not knowingly collect personal
              information from them. If you believe a child has provided such information, contact us so we
              can delete it promptly.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">9) Security</h2>
            <p>
              We implement reasonable physical, electronic, and procedural safeguards to protect information
              processed and maintained by the Application.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">
              10) Changes to this Privacy Policy
            </h2>
            <p>
              This Policy may be updated periodically. Updates will be posted on this page and/or in-app.
              Continued use signifies acceptance of the revised Policy.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">11) Your Consent</h2>
            <p>
              By using the Application, you consent to the processing of your information as outlined in this
              Policy, including future amendments.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-100">12) Contact</h2>
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
