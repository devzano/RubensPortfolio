// src/components/Projects/StarshipPixelscape/Terms.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "February 5, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Terms() {
  return (
    <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These Terms apply to the Starship Pixelscape app (&ldquo;Application&rdquo;) for mobile devices,
        provided by devzano (&ldquo;Service Provider&rdquo;) as a free service. By downloading or using
        the Application, you agree to these Terms. If you do not agree, do not use the Application.
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
          The Service Provider may modify the Application or its features at any time. If charges are ever
          introduced, they will be communicated where required by law or platform policies.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">3) Privacy</h2>
        <p>
          The Application does not collect, store, or share personal data. See the Privacy Policy for
          details. If you contact support by email, that correspondence may be retained to respond to your
          inquiry.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          4) Connectivity, Data Usage &amp; Charges
        </h2>
        <p>
          Some functions may require an internet connection. The Service Provider is not responsible for
          connectivity issues or any data/roaming charges incurred. If you are not the bill payer, you
          confirm you have the bill payer’s permission to use the Application.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">5) Device Responsibility</h2>
        <p>
          You are responsible for the security and proper functioning of your device. Jailbreaking/rooting
          may compromise security and cause the Application to malfunction; such use is at your own risk.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">6) Accuracy &amp; Liability</h2>
        <p>
          The Service Provider strives to keep the Application accurate and up-to-date but relies on third
          parties for certain platform information. The Service Provider is not liable for losses (direct or
          indirect) arising from reliance on the Application’s functionality or content.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7) Updates &amp; Termination</h2>
        <p>
          You agree to accept updates when offered. The Service Provider may discontinue the Application
          at any time. Upon termination, your rights end and you must cease use and, if necessary, delete
          the Application from your device.
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
          Questions or suggestions about these Terms? Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </DocShell>
  );
}