// src/components/Projects/ManzanosPopShop/Privacy.tsx
"use client";
import React from "react";
import DocShell from "@/components/Projects/LegalDocShell";

const LAST_UPDATED = "August 23, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Privacy() {
  return (
    <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        Manzanos PopShop (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
        &nbsp;&ldquo;us&rdquo;) respects your privacy. This Privacy Policy
        explains how we collect, use, and protect your information when you
        use our mobile application.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          1. Information We Collect
        </h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            <strong>Account Information:</strong> Email, username, and
            password (stored securely). If you sign in with Google or Apple,
            we collect your full name, email, and username.
          </li>
          <li>
            <strong>Profile Image:</strong> If available, your Gravatar image
            may be stored in our database.
          </li>
          <li>
            <strong>Shipping Address:</strong> Provided by you for order
            fulfillment.
          </li>
          <li>
            <strong>Order Information:</strong> Details of your purchases.
          </li>
          <li>
            <strong>Payment Information:</strong> Handled exclusively by
            Stripe. We do not store or process your card details directly.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          2. How We Use Information
        </h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Provide account access and app functionality</li>
          <li>Process and ship orders</li>
          <li>Send notifications (e.g., order updates, system notifications)</li>
          <li>Maintain purchase records for your account</li>
          <li>Securely process payments via Stripe</li>
        </ul>
        <p className="mt-3">
          We do not use your information for marketing or personalized ads.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          3. Third-Party Services
        </h2>
        <p>We rely on trusted third-party providers to deliver services:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Supabase &mdash; authentication, database, and secure storage</li>
          <li>Stripe &mdash; secure payment processing</li>
          <li>Expo Notifications &mdash; push notifications</li>
          <li>Google AdMob &mdash; in-app ads (non-personalized)</li>
        </ul>
        <p className="mt-3">
          These providers may collect limited data as necessary to perform
          their services in compliance with their own privacy policies.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          4. Data Sharing
        </h2>
        <p>
          We do not sell, rent, or share your personal information with any
          third parties, except as required by law or to process
          payments/shipping.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          5. Data Retention
        </h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            <strong>Account Data:</strong> Retained until you delete your
            account (you can delete it directly in-app).
          </li>
          <li>
            <strong>Order Data:</strong> Retained indefinitely for purchase
            records and legal compliance.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          6. Your Rights
        </h2>
        <p>Depending on your location, you may have rights to:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Access, update, or delete your personal data</li>
          <li>Request account deletion (available directly in the app)</li>
          <li>Opt out of certain types of data processing</li>
        </ul>
        <p className="mt-3">
          To exercise additional rights, contact us at:&nbsp;
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-sky-400 underline-offset-4 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          7. GDPR (EU/UK Users)
        </h2>
        <p>
          If you are located in the EU/UK, you have additional rights under
          the GDPR, including:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>The right to request a copy of your personal data</li>
          <li>The right to restrict or object to processing</li>
          <li>The right to withdraw consent at any time</li>
        </ul>
        <p className="mt-3">
          Legal basis for processing your data: contract performance (order
          fulfillment) and legitimate interest (security and fraud
          prevention).
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          8. CCPA (California Residents)
        </h2>
        <p>
          If you are a resident of California, you have rights under the
          CCPA, including:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            The right to know what personal data we collect and how it is
            used
          </li>
          <li>The right to request deletion of your personal data</li>
          <li>
            The right to opt out of the sale of your personal data (we do
            not sell data)
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          9. Children&rsquo;s Privacy
        </h2>
        <p>
          Manzanos PopShop is intended for adults and is not directed at
          children under 13. We do not knowingly collect information from
          children.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          10. Data Security
        </h2>
        <p>
          We implement reasonable technical and organizational measures to
          protect your data, including encryption and secure authentication.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          11. Changes to this Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Updates will
          be posted in-app and should be reviewed periodically.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          12. Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy or how your
          data is handled, you can contact us at:&nbsp;
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