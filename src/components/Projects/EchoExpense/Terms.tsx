// src/components/Projects/EchoExpense/Terms.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "April 2026";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Terms() {
  return (
    <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These Terms apply to the EchoExpense mobile application
        (&ldquo;Application&rdquo;) operated by Ruben Manzano (operating as
        Devzano) (&ldquo;Service Provider&rdquo;).
      </p>

      <p className="mt-3">By using the Application, you agree to these Terms.</p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          1. License &amp; Restrictions
        </h2>
        <p>You may not:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Copy, modify, or distribute the Application</li>
          <li>Reverse engineer or extract source code</li>
          <li>Create derivative works</li>
        </ul>
        <p className="mt-3">
          All intellectual property remains the property of the Service
          Provider.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          2. Financial Features (Plaid)
        </h2>
        <p>
          The Application integrates with Plaid Inc. to enable financial account
          connectivity.
        </p>
        <p className="mt-3">By using these features:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>You authorize Plaid to access your financial account data on your behalf</li>
          <li>You agree to Plaid&rsquo;s Terms and Privacy Policy</li>
          <li>The Service Provider does not store your banking credentials</li>
        </ul>
        <p className="mt-3">
          Plaid Terms:{" "}
          <a
            href="https://plaid.com/legal/"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 underline-offset-4 hover:underline"
          >
            https://plaid.com/legal/
          </a>
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          3. Data &amp; Device Security
        </h2>
        <p>The Application processes data to provide its services. You are responsible for:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Maintaining the security of your device</li>
          <li>Protecting access to your account</li>
        </ul>
        <p className="mt-3">
          Use of compromised devices (e.g., jailbroken/rooted) may impact
          security.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          4. Third-Party Services
        </h2>
        <p>The Application relies on third-party services:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Firebase / Google Cloud — infrastructure</li>
          <li>Plaid — financial integration</li>
          <li>Google AdMob — advertising</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          5. Connectivity &amp; Charges
        </h2>
        <p>
          Some features require an internet connection. The Service Provider is
          not responsible for connectivity issues or data charges.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          6. Responsibility &amp; Availability
        </h2>
        <p>
          The Application is provided &ldquo;AS IS.&rdquo; While efforts are
          made to maintain accuracy and availability, the Service Provider is
          not liable for:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Service interruptions</li>
          <li>Data inaccuracies from third parties</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          7. Updates &amp; Termination
        </h2>
        <p>The Service Provider may:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Update the Application</li>
          <li>Modify or discontinue features</li>
        </ul>
        <p className="mt-3">
          Upon termination, your rights to use the Application end.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          8. Changes to Terms
        </h2>
        <p>
          These Terms may be updated periodically. Continued use indicates
          acceptance.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          9. Contact
        </h2>
        <p>
          For questions:{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-sky-400 underline-offset-4 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </DocShell>
  );
}