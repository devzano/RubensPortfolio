// src/components/Projects/Clipzora/Terms.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "April 28, 2026";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Terms() {
  return (
    <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        These Terms apply to the Clipzora application (&ldquo;Application&rdquo;),
        created by devzano (&ldquo;Service Provider&rdquo;). Clipzora is a
        freemium clipboard manager with optional paid subscription features
        (&ldquo;Clipzora Pro&rdquo;). By downloading or using the Application, you
        agree to these Terms.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          1. License &amp; Permitted Use
        </h2>
        <p>
          The Service Provider grants you a limited, non-transferable,
          non-exclusive license to use the Application for personal or internal
          workflow purposes, subject to these Terms and applicable App Store
          rules.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          2. Restrictions
        </h2>
        <p>
          You may not copy, modify, reverse engineer, decompile, resell,
          redistribute, or create derivative works from the Application except
          where permitted by law. All intellectual property rights remain the
          property of the Service Provider.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          3. Free &amp; Pro Features
        </h2>
        <p>
          Clipzora includes free features with usage limits. Clipzora Pro unlocks
          additional capabilities, which may include expanded clipboard history,
          unlimited folders, palettes, Secure Vault items, iCloud sync, advanced
          search tools, export/import options, keyboard access, and professional
          color tools.
        </p>
        <p className="mt-3">
          Available features, limits, and pricing may change over time. Any paid
          features will be clearly presented before purchase.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          4. Subscriptions &amp; Billing
        </h2>
        <p>
          Clipzora Pro subscriptions are processed through Apple using your App
          Store account. Payment, renewal, cancellation, refunds, and billing
          management are handled by Apple under its applicable terms.
        </p>
        <p className="mt-3">
          Subscriptions may automatically renew unless canceled through your App
          Store account settings before renewal.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          5. Your Content &amp; Data
        </h2>
        <p>
          You are responsible for the clips, files, images, links, notes, colors,
          folders, palettes, and vault items you save in the Application.
          Clipzora is designed to store your data locally by default. If Pro
          iCloud sync is enabled, your data may sync through your personal iCloud
          account.
        </p>
        <p className="mt-3">
          You are responsible for maintaining backups of important content,
          including through available export tools where applicable.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          6. Secure Vault
        </h2>
        <p>
          Clipzora may offer a Secure Vault for sensitive items. You are
          responsible for maintaining access to your device, biometrics,
          passcode, Apple ID, and any related system security features. The
          Service Provider is not responsible for data loss caused by forgotten
          credentials, device changes, system resets, disabled biometrics, or
          unavailable platform security services.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          7. Extensions, Keyboard &amp; Permissions
        </h2>
        <p>
          Clipzora may include optional features such as a Share Extension,
          custom keyboard, App Shortcuts, color tools, file previews, and camera
          color picker. Some features require device permissions or system
          access. If permissions are disabled, certain features may not work.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          8. Connectivity &amp; Third-Party Services
        </h2>
        <p>
          Some features, including purchases, subscription validation, iCloud
          sync, updates, or App Store functionality, may require internet access
          or Apple services. The Service Provider is not responsible for network
          availability, data charges, iCloud availability, App Store outages, or
          third-party service interruptions.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          9. Acceptable Use
        </h2>
        <p>
          You agree not to use Clipzora to store, share, or manage content in a
          way that violates applicable law, infringes intellectual property
          rights, harms others, or attempts to misuse the Application or related
          platform services.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          10. Updates, Changes &amp; Availability
        </h2>
        <p>
          The Service Provider may update, modify, limit, suspend, or discontinue
          features of the Application at any time. You agree to accept updates
          when required for continued functionality, security, or compatibility.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          11. Disclaimer
        </h2>
        <p>
          Clipzora is provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE.&rdquo;
          The Service Provider does not guarantee that the Application will be
          uninterrupted, error-free, loss-free, or compatible with every device,
          operating system version, extension, file type, or workflow.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          12. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, the Service Provider is not
          liable for indirect, incidental, consequential, special, or exemplary
          damages, including data loss, lost productivity, lost profits, device
          issues, failed sync, or inability to access saved content.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          13. Termination
        </h2>
        <p>
          You may stop using Clipzora at any time by deleting the Application.
          The Service Provider may terminate or restrict access if you violate
          these Terms or misuse the Application. Upon termination, your right to
          use the Application ends.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          14. Changes to These Terms
        </h2>
        <p>
          These Terms may be updated periodically. Updates will be posted on this
          page and reflected by the “Last Updated” date above. Continued use of
          Clipzora after changes means you accept the updated Terms.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          15. Contact
        </h2>
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