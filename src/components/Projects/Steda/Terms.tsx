// src/components/Projects/Steda/Terms.tsx
"use client";

import React from "react";
import DocShell from "../DocShell";

const LAST_UPDATED = "April 24, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Terms() {
  return (
    <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These terms apply to the Steda mobile application (&ldquo;Application&rdquo;) provided by
        devzano (&ldquo;Service Provider&rdquo;) as an ad-supported service. By downloading or using the
        Application, you agree to these Terms. If you do not agree, do not use the Application.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">1) License &amp; Restrictions</h2>
        <p>
          Unauthorized copying, modification, reverse engineering, translation, or creation of derivative
          works is prohibited. All trademarks, copyrights, database rights, and other intellectual property
          rights remain the property of the Service Provider.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">2) Service Changes &amp; Charges</h2>
        <p>
          The Service Provider may modify the Application or charge for services at any time. Any charges
          will be clearly communicated where required by law or platform policies.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">3) Data &amp; Device Security</h2>
        <p>
          The Application may store and process personal data you provide to deliver its features. You are
          responsible for maintaining the security of your device and access to the Application. Jailbreaking
          or rooting your device may compromise security and cause malfunctions; such use is at your own risk.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">4) Third-Party Terms</h2>
        <p>
          The Application uses third-party services that have their own Terms and Conditions, including:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>AdMob</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          5) Connectivity, Data Usage &amp; Charges
        </h2>
        <p>
          Some features require an active internet connection. The Service Provider is not responsible for
          connectivity issues or data/roaming charges incurred. If you are not the bill payer, you confirm
          you have permission to use the device and service.
        </p>
        <p className="mt-2">
          You are also responsible for ensuring your device remains charged; lack of power may impact your
          ability to access the Application.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">6) Accuracy &amp; Liability</h2>
        <p>
          While the Service Provider strives to keep the Application accurate and up-to-date, it may rely on
          third parties for certain information. The Service Provider is not liable for losses (direct or
          indirect) arising from reliance on the Application’s functionality or content.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7) Updates &amp; Termination</h2>
        <p>
          You agree to accept updates when offered. The Service Provider may discontinue the Application at
          any time. Upon termination, your rights end and you must cease use and, if necessary, delete the
          Application from your device.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">8) Changes to These Terms</h2>
        <p>
          These Terms may be updated periodically. Updates will be posted here and/or in-app. Continued use
          constitutes acceptance of the updated Terms.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">9) Contact</h2>
        <p>
          Questions or suggestions? Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </DocShell>
  );
}