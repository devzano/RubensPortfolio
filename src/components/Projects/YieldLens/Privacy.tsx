// src/components/Projects/YieldLens/Privacy.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "September 26, 2026";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Privacy() {
  return (
    <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy applies to the YieldLens mobile application
        (&ldquo;Application&rdquo;) created by devzano (&ldquo;Service Provider&rdquo;). YieldLens
        helps users securely view Google AdMob account information, app inventory, ad units, and
        network or mediation reporting data. YieldLens also includes optional setup tools for
        creating AdMob apps and ad units when you explicitly choose to use them.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          1. Information We Collect
        </h2>
        <p>
          YieldLens only requests information needed to authenticate you, display your AdMob data,
          and complete setup actions you request after you choose to connect your Google account.
          This may include:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Your Google account identifier, name, and email address</li>
          <li>Your AdMob publisher accounts, apps, ad units, and mediation groups</li>
          <li>
            AdMob report data such as estimated earnings, impressions, clicks, eCPM, date ranges,
            apps, ad units, countries, and ad sources
          </li>
          <li>App and ad-unit setup details you enter before creating AdMob resources</li>
          <li>App settings, selected account IDs, saved report filters, and connection status</li>
          <li>Basic technical information needed to operate the service and prevent abuse</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          2. Google Sign-In and AdMob Access
        </h2>
        <p>
          YieldLens uses Google OAuth so you can grant access directly from Google. The
          Application requests access to read your AdMob reporting data and, when enabled by you,
          create or manage AdMob monetization settings such as apps and ad units. YieldLens only
          performs setup actions after you submit them in the Application.
        </p>
        <p className="mt-3">
          Access tokens are used to retrieve your AdMob information from Google APIs. Refresh
          tokens, when provided by Google, are stored securely on the backend so YieldLens can keep
          your dashboard current until you disconnect your account or revoke access.
        </p>
        <p className="mt-3">
          YieldLens does not manage your AdMob payments, payment profile, bank details, campaigns,
          account ownership, or unrelated Google services.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">3. How We Use Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Authenticate your account and maintain your signed-in session</li>
          <li>Display your AdMob accounts, apps, ad units, and reporting metrics</li>
          <li>Generate network and mediation reports based on filters you choose</li>
          <li>Create AdMob apps or ad units when you submit those setup actions</li>
          <li>Cache short-lived responses to improve performance and reduce repeated API calls</li>
          <li>Provide support, troubleshoot issues, protect the service, and honor deletion requests</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          4. Google API Limited Use
        </h2>
        <p>
          YieldLens&apos;s use and transfer of information received from Google APIs adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 underline-offset-4 hover:underline"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. Google user data is used only to provide or
          improve user-facing features that are visible and prominent in YieldLens.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          5. Sharing and Disclosure
        </h2>
        <p>
          YieldLens does not sell your personal information, AdMob data, or Google user data. We may
          share limited information only:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>With service providers that operate the Application on our behalf</li>
          <li>When required by law, subpoena, court order, or government request</li>
          <li>To protect users, investigate abuse, prevent fraud, or secure the service</li>
          <li>With your direction, such as when you export or share a report</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          6. Storage, Security, and Retention
        </h2>
        <p>
          YieldLens is hosted on Firebase and Google Cloud infrastructure. We use access controls,
          encrypted transport, encrypted storage, and secret management practices designed to
          protect OAuth credentials and account data.
        </p>
        <p className="mt-3">
          We retain connected account information and tokens while your YieldLens account remains
          connected. Short-lived report cache data is retained only as needed to provide the
          service. If you disconnect Google access or request deletion, we delete or de-identify
          stored account data unless retention is required for legal, security, or abuse-prevention
          reasons.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7. Your Controls</h2>
        <p>You can control your data by:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Disconnecting Google access in YieldLens</li>
          <li>
            Revoking YieldLens access from your{" "}
            <a
              href="https://myaccount.google.com/connections"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 underline-offset-4 hover:underline"
            >
              Google Account
            </a>
          </li>
          <li>Deleting your YieldLens account from the Application settings when available</li>
          <li>
            Contacting{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-sky-400 underline-offset-4 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            to request access, correction, export, or deletion
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">8. Children&apos;s Privacy</h2>
        <p>
          YieldLens is not intended for children under 13. We do not knowingly collect personal
          information from children under 13. If you believe a child has provided personal
          information, contact us so we can delete it.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          9. Changes to this Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Updates will be posted on this page
          with a revised &ldquo;Last updated&rdquo; date. Continued use of YieldLens after an update
          means you accept the revised Policy.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">10. Contact Us</h2>
        <p>
          Questions about this Privacy Policy or how YieldLens handles data? Contact{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-sky-400 underline-offset-4 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </DocShell>
  );
}
