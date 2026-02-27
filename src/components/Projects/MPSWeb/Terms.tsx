// src/components/Projects/ManzanosPopShop/Terms.tsx
"use client";
import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "February 23, 2026";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";
// const SUPPORT_EMAIL = "support@manzanospopshop.com";

export default function Terms() {
  return (
    <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        Welcome to Manzanos PopShop (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
        &nbsp;&ldquo;us&rdquo;). By using our app, you (&ldquo;you,&rdquo; &ldquo;user,&rdquo; or
        &nbsp;&ldquo;customer&rdquo;) agree to these Terms of Service. Please read them carefully
        before using the app.
      </p>

      {/* 1. Acceptance of Terms */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">1. Acceptance of Terms</h2>
        <p>
          By creating an account, making a purchase, or otherwise using the app, you agree to be
          bound by these Terms. If you do not agree, please do not use the app.
        </p>
      </div>

      {/* 2. License Grant */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">2. License</h2>
        <p>
          Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable
          license to download and use the Manzanos PopShop app solely for your personal,
          non-commercial use. You may not copy, modify, distribute, sell, or sublicense any part of
          the app. We reserve all rights not expressly granted herein.
        </p>
      </div>

      {/* 3. Eligibility */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">3. Eligibility</h2>
        <p>You must be at least 18 years old to purchase on this app.</p>
        <p className="mt-2">By using the app, you confirm that you meet this requirement.</p>
      </div>

      {/* 4. Accounts */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">4. Accounts</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>You must create an account to purchase items.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>You agree to provide accurate information and keep it up to date.</li>
          <li>You are responsible for all activity under your account.</li>
        </ul>
      </div>

      {/* 5. Subscription Service — NEW */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">5. Subscription Service</h2>
        <p>
          Manzanos PopShop offers recurring subscription plans (&ldquo;Monthly Pop Subscription&rdquo;)
          billed on a monthly, 6-month, or annual basis.
        </p>

        <h3 className="mb-1 mt-4 font-semibold text-slate-200">Billing &amp; Auto-Renewal</h3>
        <p>
          By starting a subscription, you authorize us to charge your payment method on a recurring
          basis at the rate and frequency of your selected plan. Your subscription will automatically
          renew at the end of each billing period unless you cancel before the renewal date.
        </p>

        <h3 className="mb-1 mt-4 font-semibold text-slate-200">Cancellation</h3>
        <p>
          You may cancel your subscription at any time through the app. Cancellation takes effect at
          the end of your current paid billing period &mdash; you will retain access and receive any
          scheduled shipments through that date. We do not issue refunds for any unused portion of a
          paid period.
        </p>

        <h3 className="mb-1 mt-4 font-semibold text-slate-200">Plan Changes</h3>
        <p>
          Tier changes (e.g., monthly to yearly) are scheduled for your next renewal date and do not
          take effect immediately. No additional charge is made at the time of the change request.
        </p>

        <h3 className="mb-1 mt-4 font-semibold text-slate-200">Failed Payments</h3>
        <p>
          If a payment fails, we may retry the charge. If payment cannot be collected, your
          subscription may be suspended or canceled.
        </p>

        <h3 className="mb-1 mt-4 font-semibold text-slate-200">No Refunds on Subscription Charges</h3>
        <p>
          All subscription charges are final once billed. Exceptions may be made at our sole
          discretion for documented billing errors &mdash; contact us at{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-sky-400 underline-offset-4 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>

      {/* 6. Purchases & Payments */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">6. Purchases &amp; Payments</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            All payments are processed securely through Stripe (and in the future, may include
            Google Pay or Apple Pay).
          </li>
          <li>Prices are listed in the app and may change without notice.</li>
          <li>
            Once an order is placed, it cannot be canceled unless specifically allowed under our
            refund policy.
          </li>
        </ul>
      </div>

      {/* 7. Shipping & Delivery — updated */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7. Shipping &amp; Delivery</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            We currently ship within the <strong>United States only</strong>. We do not ship to
            P.O. boxes, freight forwarders, or addresses outside the US.
          </li>
          <li>
            Shipping addresses are verified through Google&rsquo;s address validation service at the
            time of entry. You are responsible for providing a valid, deliverable US address. Orders
            placed with unverifiable or undeliverable addresses may be held or canceled.
          </li>
          <li>
            We are not responsible for delays or losses caused by incorrect addresses provided by
            you, or by third-party carriers.
          </li>
          <li>Delivery times are estimates and not guaranteed.</li>
        </ul>
      </div>

      {/* 8. Refunds & Returns */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">8. Refunds &amp; Returns</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>All sales are final, unless otherwise stated (e.g., defective items).</li>
          <li>
            To request a return or refund, contact us at{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-sky-400 underline-offset-4 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </li>
          <li>Approved refunds will be issued to the original payment method.</li>
        </ul>
      </div>

      {/* 9. User Conduct */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">9. User Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Use the app for any unlawful purpose.</li>
          <li>Attempt to hack, reverse engineer, or disrupt the app.</li>
          <li>Misuse the app in ways that harm us or other users.</li>
        </ul>
        <p className="mt-3">We may suspend or terminate accounts that violate these terms.</p>
      </div>

      {/* 10. Intellectual Property */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">10. Intellectual Property</h2>
        <p>
          All content in the app (logo, design, etc.) is owned by Manzanos PopShop or licensed to
          us. You may not copy, distribute, or use our content without permission.
        </p>
      </div>

      {/* 11. Third-Party Services — updated */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">11. Third-Party Services</h2>
        <p>The app integrates with third-party services such as:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Supabase &mdash; account management, database, storage</li>
          <li>Stripe &mdash; payment processing</li>
          <li>Expo Notifications &mdash; push notifications</li>
          <li>Google Address Validation &mdash; shipping address verification</li>
          <li>
            Google AdMob &mdash; non-personalized in-app advertising. AdMob may display ads based on
            contextual information only. No personalized or interest-based advertising is used. By
            using the app, you acknowledge that ads may be served and that Google&rsquo;s{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 underline-offset-4 hover:underline"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 underline-offset-4 hover:underline"
            >
              Terms of Service
            </a>{" "}
            apply to AdMob.
          </li>
        </ul>
        <p className="mt-3">
          By using the app, you also agree to the terms of these third-party providers.
        </p>
      </div>

      {/* 12. Disclaimer & Limitation of Liability — updated */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          12. Disclaimer &amp; Limitation of Liability
        </h2>
        <p className="font-semibold uppercase tracking-wide text-slate-300">
          The app is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties
          of any kind, express or implied, including but not limited to warranties of
          merchantability, fitness for a particular purpose, or non-infringement.
        </p>
        <p className="mt-3">
          To the maximum extent permitted by law, Manzanos PopShop shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, including lost profits,
          lost data, or service interruptions, arising from your use of the app, any purchases made,
          subscription billing, shipping carrier delays or losses, or third-party service failures.
        </p>
        <p className="mt-3">
          Our total liability to you for any claim arising from use of the app shall not exceed the
          amount you paid to us in the 90 days preceding the claim.
        </p>
      </div>

      {/* 13. Termination — updated */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">13. Termination</h2>
        <p>
          We may suspend or terminate your account at any time if you violate these Terms or misuse
          the app.
        </p>
      </div>

      {/* 14. Account Deletion — NEW */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">14. Account Deletion</h2>
        <p>You may request deletion of your account at any time through the app settings.</p>
        <p className="mt-3">
          <strong className="text-slate-200">If you have an active subscription,</strong> you must
          first cancel your subscription and wait until your current paid billing period has fully
          ended before your account can be deleted. We will not process account deletion requests
          while a subscription is in an active or pending-cancellation state with remaining access
          time. This ensures all outstanding shipments and billing obligations are fulfilled.
        </p>
        <p className="mt-3">
          Upon account deletion, your personal data will be removed in accordance with our Privacy
          Policy. Order and transaction records may be retained as required by applicable law.
        </p>
      </div>

      {/* 15. Changes to Terms */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">15. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Updates will be posted in-app, and continued
          use of the app means you accept the revised Terms.
        </p>
      </div>

      {/* 16. Governing Law */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">16. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of Florida, United States, without
          regard to its conflict of law provisions.
        </p>
      </div>

      {/* 17. Contact Us */}
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">17. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:&nbsp;
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