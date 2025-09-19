// src/components/Projects/AutoArchive/Terms.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "April 24, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Terms() {
  return (
    <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These terms and conditions apply to the AutoArchive app (&ldquo;Application&rdquo;) for mobile devices
        created by devzano (&ldquo;Service Provider&rdquo;) as an ad-supported service. By downloading or using the
        Application, you agree to these Terms. If you do not agree, please do not use the Application.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">1. License &amp; Restrictions</h2>
        <p>
          You may not copy, modify, reverse engineer, translate, extract source code from, or create derivative works of the
          Application. All trademarks, copyrights, database rights, and other intellectual property rights in the
          Application remain the property of the Service Provider.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">2. Changes to the Service</h2>
        <p>
          The Service Provider may modify the Application or charge for services at any time. Any charges will be clearly
          communicated to you in advance where applicable.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">3. Data &amp; Security</h2>
        <p>
          The Application stores and processes personal data you provide to deliver the Service. You are responsible for
          securing your device and access to the Application. Jailbreaking or rooting your device may compromise security
          and may cause the Application to malfunction; such use is discouraged and at your own risk.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">4. Third-Party Services</h2>
        <p>The Application may rely on third-party services that have their own Terms and Conditions, including:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Google AdMob — ads</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">5. Connectivity &amp; Charges</h2>
        <p>
          Some Application functions require an active internet connection. The Service Provider is not responsible for lack
          of Wi-Fi, data availability, or related charges, including roaming fees. If you are not the bill payer for your
          device, you confirm you have permission from the bill payer to use the Application.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">6. Responsibility &amp; Availability</h2>
        <p>
          You are responsible for keeping your device charged and in good working order. While the Service Provider strives
          to keep the Application accurate and up-to-date, it relies on third-party data and provides no liability for
          losses resulting from reliance on Application functionality or content.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7. Updates &amp; Termination</h2>
        <p>
          You agree to accept updates when offered. The Service Provider may stop providing the Application and terminate
          its use at any time. Upon termination, your rights under these Terms end and you must cease use and, if necessary,
          delete the Application from your device.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">8. Changes to These Terms</h2>
        <p>
          These Terms may be updated periodically. Updates will be posted on this page and/or in-app. Continued use
          constitutes acceptance of the updated Terms.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">9. Contact</h2>
        <p>
          Questions or suggestions about these Terms? Contact:&nbsp;
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </DocShell>
  );
}