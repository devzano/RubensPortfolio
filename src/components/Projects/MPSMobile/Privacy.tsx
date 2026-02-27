// src/components/Projects/ManzanosPopShop/Privacy.tsx
"use client";
import React from "react";
import DocShell from "@/components/Projects/LegalDocShell";

const LAST_UPDATED = "February 23, 2026";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Privacy() {
  return (
    <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        Manzanos PopShop (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &nbsp;&ldquo;us&rdquo;) respects
        your privacy. This Privacy Policy explains how we collect, use, and protect your information
        when you use our mobile application.
      </p>

      {/* 1. Information We Collect */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">1. Information We Collect</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            <strong>Account Information:</strong> Email, username, and password (stored securely).
            If you sign in with Google or Apple, we collect your full name, email, and username.
          </li>
          <li>
            <strong>Profile Image:</strong> If available, your Gravatar image may be stored in our
            database.
          </li>
          <li>
            <strong>Shipping Address:</strong> Provided by you for order fulfillment. Addresses are
            validated through Google&rsquo;s address validation service before being stored.
          </li>
          <li>
            <strong>Order Information:</strong> Details of your purchases, including items ordered,
            order dates, and fulfillment status.
          </li>
          <li>
            <strong>Subscription Data:</strong> Your subscription tier (monthly, 6-month, or
            yearly), billing status, current period start and end dates, cancellation status, and
            your Stripe subscription identifier. This data is stored in our database and used to
            manage your subscription and display your subscription status in the app.
          </li>
          <li>
            <strong>Shipment Tracking Data:</strong> Carrier name, tracking number, and shipment
            status associated with your subscription deliveries. This data is stored on your account
            and surfaced to you via the subscription modal in the app. If you have enabled push
            notifications, we may also send you tracking updates as notifications.
          </li>
          <li>
            <strong>Payment Information:</strong> Handled exclusively by Stripe. We do not store or
            process your card details directly. Stripe retains payment method and billing history
            data in accordance with their own privacy policy and legal obligations.
          </li>
        </ul>
      </div>

      {/* 2. How We Use Information */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">2. How We Use Information</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Provide account access and app functionality</li>
          <li>Process and ship orders</li>
          <li>Manage your subscription, billing cycles, and plan changes</li>
          <li>Display shipment tracking information within the app</li>
          <li>
            Send push notifications for order updates, shipment tracking, and system notifications
            (only if you have granted notification permissions)
          </li>
          <li>Maintain purchase and subscription records for your account</li>
          <li>Securely process payments via Stripe</li>
          <li>Validate shipping addresses through Google to ensure accurate delivery</li>
        </ul>
        <p className="mt-3">We do not use your information for marketing or personalized ads.</p>
      </div>

      {/* 3. Third-Party Services */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">3. Third-Party Services</h2>
        <p>We rely on trusted third-party providers to deliver services:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            <strong>Supabase</strong> &mdash; authentication, database, and secure storage. Your
            account, order, subscription, and tracking data is stored here.
          </li>
          <li>
            <strong>Stripe</strong> &mdash; secure payment processing and subscription billing.
            Stripe retains payment method and transaction data independently per their privacy
            policy. Account deletion on our end does not automatically delete data Stripe is
            required to retain.
          </li>
          <li>
            <strong>Expo Notifications</strong> &mdash; push notification delivery. Only used if
            you have granted notification permissions.
          </li>
          <li>
            <strong>Google Address Validation</strong> &mdash; shipping address verification.
            Address data is transmitted to Google to validate and standardize addresses at the time
            of entry.
          </li>
          <li>
            <strong>Google AdMob</strong> &mdash; non-personalized in-app advertising. No
            personalized or interest-based ads are served. Google may collect limited contextual
            data to display ads. See{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 underline-offset-4 hover:underline"
            >
              Google&rsquo;s Privacy Policy
            </a>{" "}
            for details.
          </li>
        </ul>
        <p className="mt-3">
          These providers may collect limited data as necessary to perform their services in
          compliance with their own privacy policies.
        </p>
      </div>

      {/* 4. Data Sharing */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">4. Data Sharing</h2>
        <p>
          We do not sell, rent, or share your personal information with any third parties, except as
          required by law or as necessary to process payments, fulfill shipments, or operate the
          services listed above.
        </p>
      </div>

      {/* 5. Data Retention */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">5. Data Retention</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            <strong>Account Data:</strong> Retained until you delete your account. Note: accounts
            with an active or pending-cancellation subscription cannot be deleted until the
            subscription has been fully canceled and the current billing period has ended. See
            Section 6 below.
          </li>
          <li>
            <strong>Subscription Data:</strong> Retained while your subscription is active and for
            a reasonable period following cancellation for billing dispute resolution. Upon account
            deletion, subscription records are removed from our systems. Note that Stripe retains
            its own billing records independently.
          </li>
          <li>
            <strong>Shipment Tracking Data:</strong> Retained for 2 years following the associated
            shipment date, then deleted.
          </li>
          <li>
            <strong>Order &amp; Transaction Records:</strong> Retained for a minimum of 7 years
            after the transaction date for legal, tax, and financial compliance purposes. These
            records are kept even after account deletion.
          </li>
        </ul>
      </div>

      {/* 6. Account Deletion */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">6. Account Deletion</h2>
        <p>You may request deletion of your account at any time through the app settings.</p>
        <p className="mt-3">
          <strong className="text-slate-200">If you have an active subscription,</strong> you must
          first cancel your subscription and wait until your current paid billing period has fully
          ended before your account can be deleted. We will not process deletion requests while a
          subscription is active or in a pending-cancellation state with remaining access time.
        </p>
        <p className="mt-3">Upon account deletion, the following occurs:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Your account profile, shipping addresses, and subscription data are deleted.</li>
          <li>Shipment tracking data associated with your account is deleted.</li>
          <li>
            Order and transaction records are retained for legal and business compliance as described
            in Section 5.
          </li>
          <li>
            Stripe retains payment method and billing history data per their own legal obligations
            and privacy policy, independent of our deletion process.
          </li>
        </ul>
      </div>

      {/* 7. Your Rights */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7. Your Rights</h2>
        <p>As a US-based user, you have the right to:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Access or update your personal data through the app</li>
          <li>Request account deletion (subject to the subscription requirements in Section 6)</li>
          <li>Opt out of push notifications through your device settings at any time</li>
        </ul>
        <p className="mt-3">
          To exercise any rights or ask questions about your data, contact us at:&nbsp;
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-sky-400 underline-offset-4 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>

      {/* 8. CCPA (California Residents) */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">8. CCPA (California Residents)</h2>
        <p>If you are a resident of California, you have rights under the CCPA, including:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>The right to know what personal data we collect and how it is used</li>
          <li>The right to request deletion of your personal data</li>
          <li>
            The right to opt out of the sale of your personal data &mdash; we do not sell your data
          </li>
          <li>The right to non-discrimination for exercising your privacy rights</li>
        </ul>
        <p className="mt-3">
          To exercise your CCPA rights, contact us at:&nbsp;
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-sky-400 underline-offset-4 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>

      {/* 9. Geographic Scope */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">9. Geographic Scope</h2>
        <p>
          Manzanos PopShop is currently available to users located in the{" "}
          <strong>United States only</strong>. We do not knowingly provide services to users in the
          European Union, United Kingdom, or other jurisdictions outside the US. If you are
          accessing the app from outside the United States, you do so at your own risk and we make
          no representations that the app or these policies comply with the laws of your
          jurisdiction.
        </p>
        <p className="mt-3">
          We may expand to additional regions in the future, at which time this policy will be
          updated to reflect any applicable regional requirements.
        </p>
      </div>

      {/* 10. Children's Privacy */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">10. Children&rsquo;s Privacy</h2>
        <p>
          Manzanos PopShop is intended for adults (18+) and is not directed at children under 13.
          We do not knowingly collect personal information from children. If we become aware that a
          child under 13 has provided us with personal data, we will delete it promptly.
        </p>
      </div>

      {/* 11. Data Security */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">11. Data Security</h2>
        <p>
          We implement reasonable technical and organizational measures to protect your data,
          including encryption in transit, secure authentication, and access controls. However, no
          system is completely secure and we cannot guarantee absolute security of your data.
        </p>
      </div>

      {/* 12. Changes to this Policy */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">12. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Updates will be posted in-app with a
          revised &ldquo;Last updated&rdquo; date and should be reviewed periodically. Continued use
          of the app after changes are posted constitutes your acceptance of the updated policy.
        </p>
      </div>

      {/* 13. Contact Us */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">13. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or how your data is handled, contact
          us at:&nbsp;
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