"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "September 26, 2026";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Terms() {
  return (
    <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These Terms apply to the YieldLens mobile application (&ldquo;Application&rdquo;),
        created by devzano (&ldquo;Service Provider&rdquo;). YieldLens is an independent,
        reporting and setup companion for Google AdMob publishers. By downloading or using the
        Application, you agree to these Terms.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          1. License and Permitted Use
        </h2>
        <p>
          The Service Provider grants you a limited, non-transferable, non-exclusive license to use
          YieldLens for personal or internal business reporting and AdMob setup purposes, subject
          to these Terms, applicable app store rules, and Google&apos;s terms for services you
          connect.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          2. Google AdMob Connection
        </h2>
        <p>
          YieldLens uses Google OAuth so you can authorize access to your own Google AdMob data.
          The Application is designed to display publisher accounts, app inventory, ad units,
          mediation details, and reporting metrics. YieldLens may also request AdMob monetization
          permission so you can create AdMob apps or ad units from setup tools inside the
          Application.
        </p>
        <p className="mt-3">
          YieldLens only performs setup actions after you choose and submit them. YieldLens does
          not manage your AdMob payments, payment profile, bank details, campaigns, account
          ownership, or unrelated Google services.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          3. Your Responsibilities
        </h2>
        <p>
          You are responsible for maintaining control of your device, Google account, AdMob
          account, app store accounts, and any permissions you grant. You agree to use YieldLens
          only with accounts and data you are authorized to access. You are also responsible for
          confirming that any app or ad-unit setup action you submit is accurate and intended for
          your AdMob account.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          4. Reporting Data and Estimates
        </h2>
        <p>
          YieldLens displays data returned by Google AdMob APIs and may calculate summaries,
          comparisons, or charts from that data. Estimated earnings, impressions, clicks, eCPM,
          match rate, and related metrics may differ from finalized AdMob or payment records.
          YieldLens is not financial, tax, accounting, or legal advice.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          5. Availability and Third-Party Services
        </h2>
        <p>
          YieldLens depends on internet access, Firebase, Google Cloud, Google Sign-In, and Google
          AdMob APIs. Features may be unavailable, delayed, limited, or inaccurate when those
          services are unavailable, changed, rate-limited, or disconnected.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">6. Privacy and Data</h2>
        <p>
          Your use of YieldLens is also governed by the{" "}
          <a
            href="/yieldlens/privacy"
            className="text-sky-400 underline-offset-4 hover:underline"
          >
            YieldLens Privacy Policy
          </a>
          . You can disconnect Google access in the Application or revoke access from your Google
          Account at any time.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7. Restrictions</h2>
        <p>
          You may not copy, modify, reverse engineer, decompile, resell, redistribute, abuse, or
          interfere with the Application except where permitted by law. You may not use YieldLens to
          violate applicable law, infringe rights, attempt unauthorized access, scrape unrelated
          data, or misuse Google, Firebase, or app store services.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          8. Updates, Changes, and Termination
        </h2>
        <p>
          The Service Provider may update, modify, limit, suspend, or discontinue YieldLens features
          at any time. You may stop using YieldLens by signing out, disconnecting Google access, and
          deleting the Application. The Service Provider may restrict access if you violate these
          Terms or misuse the Application.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">9. Disclaimer</h2>
        <p>
          YieldLens is provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE.&rdquo; The Service
          Provider does not guarantee that the Application will be uninterrupted, error-free,
          loss-free, or compatible with every device, operating system version, Google account,
          AdMob account, or API change.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          10. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, the Service Provider is not liable for indirect,
          incidental, consequential, special, or exemplary damages, including lost revenue, lost
          profits, reporting errors, account issues, data loss, device issues, or inability to
          access the Application.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          11. Changes to These Terms
        </h2>
        <p>
          These Terms may be updated from time to time. Updates will be posted on this page with a
          revised &ldquo;Last updated&rdquo; date. Continued use of YieldLens after an update means
          you accept the revised Terms.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">12. Contact</h2>
        <p>
          Questions about these Terms? Contact{" "}
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
