// src/components/Projects/RecipeRealm/Terms.tsx
"use client";

import React from "react";
import DocShell from "../DocShell";

const LAST_UPDATED = "July 20, 2024";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Terms() {
  return (
    <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These terms apply to the RecipeRealm app (&ldquo;Application&rdquo;) for mobile devices, created
        by devzano (&ldquo;Service Provider&rdquo;) as an ad-supported service. By downloading or using
        the Application, you agree to these terms. If you do not agree, do not use the Application.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          1) License &amp; Restrictions
        </h2>
        <p>
          Unauthorized copying, modification, reverse engineering, translation, or creation of derivative
          works is prohibited. All trademarks, copyrights, database rights, and other intellectual
          property rights remain the property of the Service Provider.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          2) Service Changes &amp; Charges
        </h2>
        <p>
          The Service Provider may modify the Application or charge for services at any time. Any
          applicable charges will be communicated where required by law or platform policy.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          3) Data &amp; Device Security
        </h2>
        <p>
          The Application may store and process personal data you provide to deliver the Service. You are
          responsible for maintaining the security of your device and access. Jailbreaking or rooting
          your device may compromise security and cause the Application to malfunction; such use is at
          your own risk.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          4) Third-Party Services
        </h2>
        <p>The Application may rely on third-party services that have their own Terms, including:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Google AdMob — ads</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          5) Connectivity, Data Usage &amp; Charges
        </h2>
        <p>
          Some functions require an active internet connection. The Service Provider is not responsible
          for lack of Wi-Fi/data or related charges (including roaming). If you are not the bill payer,
          you confirm you have the bill payer’s permission to use the Application.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          6) Your Responsibility
        </h2>
        <p>
          You are responsible for ensuring your device remains charged and functional. The Service
          Provider is not liable if the Service is unavailable due to device issues such as low battery.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          7) Accuracy &amp; Liability
        </h2>
        <p>
          While the Service Provider strives to keep the Application accurate and up-to-date, it relies
          on third-party data and services and is not liable for losses arising from reliance on the
          Application’s functionality or content.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          8) Updates &amp; Termination
        </h2>
        <p>
          You agree to accept updates when offered. The Service Provider may stop providing the
          Application and terminate its use at any time. Upon termination, your rights end and you must
          cease use and, if necessary, delete the Application from your device.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          9) Changes to These Terms
        </h2>
        <p>
          These Terms may be updated periodically. Updates will be posted on this page and/or in-app.
          Continued use constitutes acceptance of the updated Terms.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">10) Contact</h2>
        <p>
          Questions or suggestions about these Terms? Contact{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </DocShell>
  );
}
