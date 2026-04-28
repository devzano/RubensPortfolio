// src/components/Projects/Clipzora/Privacy.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "April 28, 2026";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Privacy() {
  return (
    <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy applies to the Clipzora application (“Application”),
        created by devzano (“Service Provider”). Clipzora is provided as a
        freemium application with optional paid subscriptions (“Clipzora Pro”).
      </p>

      <p>
        Privacy is a core design principle of Clipzora. Your clipboard history,
        vault items, palettes, folders, and related content are designed to
        remain under your control.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          1. Information Collect
        </h2>

        <p>
          Clipzora stores content you choose to save, which may include:
        </p>

        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Clipboard text, links, and notes you save</li>
          <li>Images, media, files, and shared content you import</li>
          <li>Color palettes and captured color values</li>
          <li>Secure Vault entries you intentionally create</li>
        </ul>

        <p className="mt-3">
          This information is stored locally on your device by default.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          2. iCloud Sync (Optional)
        </h2>

        <p>
          If you enable Clipzora Pro sync features, your data may be synchronized
          through your personal iCloud account using Apple CloudKit.
        </p>

        <p className="mt-3">
          Synced data is stored within your private iCloud container associated
          with your Apple ID. I do not host or access that private synced data.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          3. Subscriptions & Payments
        </h2>

        <p>
          Clipzora Pro subscriptions are processed by Apple through the App Store
          using StoreKit. I do not receive or store your payment card details or
          billing credentials.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          4. What I Do Not Do
        </h2>

        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>I do not sell your personal data</li>
          <li>I do not run advertising networks inside Clipzora</li>
          <li>I do not use third-party data brokers</li>
          <li>I do not collect precise GPS location information</li>
          <li>I do not monitor clipboard contents outside app functionality you enable</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          5. Security
        </h2>

        <p>
          I use reasonable safeguards to help protect information stored by the
          Application.
        </p>

        <p className="mt-3">
          Secure Vault items may be protected using device biometrics such as
          Face ID or Touch ID and encrypted using platform security mechanisms.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          6. Extensions & Permissions
        </h2>

        <p>
          Optional features such as the Share Extension, custom keyboard, color
          tools, and camera color picker may request system permissions needed
          for those features to function. These permissions can be managed in
          your device settings.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          7. Data Control & Retention
        </h2>

        <p>
          Your data remains under your control. You may delete clips, vault
          items, folders, and palettes at any time from within the Application.
        </p>

        <p className="mt-3">
          Pro users may also have export and import tools available for backup
          and portability.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          8. Children’s Privacy
        </h2>

        <p>
          Clipzora is not intended for children under 13, and I do not knowingly
          collect personal information from children.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          9. Disclosure of Information
        </h2>

        <p>
          I may disclose information only when required by law, to protect rights
          and safety, or comply with valid legal requests.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          10. Changes to this Policy
        </h2>

        <p>
          This Privacy Policy may be updated periodically. Updates will be posted
          here and reflected by the “Last Updated” date above.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          11. Contact
        </h2>

        <p>
          Questions about this Privacy Policy? Contact{" "}
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