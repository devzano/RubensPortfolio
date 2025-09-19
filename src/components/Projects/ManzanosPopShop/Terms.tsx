// src/components/Projects/ManzanosPopShop/Terms.tsx
"use client";
import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "August 23, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";
// const SUPPORT_EMAIL = "support@manzanospopshop.com";

export default function Terms() {
  return (
    <DocShell title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p>
        Welcome to Manzanos PopShop (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
        &nbsp;&ldquo;us&rdquo;). By using our app, you (&ldquo;you,&rdquo; &ldquo;user,&rdquo; or
        &nbsp;&ldquo;customer&rdquo;) agree to these Terms of Service. Please read them carefully before
        using the app.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">1. Acceptance of Terms</h2>
        <p>
          By creating an account, making a purchase, or otherwise using the app, you agree to be bound
          by these Terms. If you do not agree, please do not use the app.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">2. Eligibility</h2>
        <p>You must be at least 18 years old to use this app.</p>
        <p>By using the app, you confirm that you meet this requirement.</p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">3. Accounts</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>You must create an account to browse and purchase items.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>You agree to provide accurate information and keep it up to date.</li>
          <li>You are responsible for all activity under your account.</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">4. Purchases &amp; Payments</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            All payments are processed securely through Stripe (and in the future, may include Google
            Pay or Apple Pay).
          </li>
          <li>Prices are listed in the app and may change without notice.</li>
          <li>
            Once an order is placed, it cannot be canceled unless specifically allowed under our refund
            policy.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">5. Shipping &amp; Delivery</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>You are responsible for providing accurate shipping information.</li>
          <li>
            We are not responsible for delays or losses caused by incorrect addresses or third-party
            carriers.
          </li>
          <li>Delivery times are estimates and not guaranteed.</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">6. Refunds &amp; Returns</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>All sales are final, unless otherwise stated (e.g., defective items).</li>
          <li>
            To request a return or refund, contact us at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
              {SUPPORT_EMAIL}
            </a>
            .
          </li>
          <li>Approved refunds will be issued to the original payment method.</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">7. User Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Use the app for any unlawful purpose.</li>
          <li>Attempt to hack, reverse engineer, or disrupt the app.</li>
          <li>Misuse the app in ways that harm us or other users.</li>
        </ul>
        <p>We may suspend or terminate accounts that violate these terms.</p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">8. Intellectual Property</h2>
        <p>
          All content in the app (logo, design, etc.) is owned by Manzanos PopShop or licensed to us.
          You may not copy, distribute, or use our content without permission.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">9. Third-Party Services</h2>
        <p>The app integrates with third-party services such as:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Supabase &mdash; account management, database, storage</li>
          <li>Stripe &mdash; payment processing</li>
          <li>Expo Notifications &mdash; push notifications</li>
          <li>Google AdMob &mdash; ads</li>
        </ul>
        <p className="mt-3">
          By using the app, you also agree to the terms of these third-party providers.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, we are not liable for any damages arising from use of
          the app, including lost profits or data, or issues caused by third-party services, shipping
          carriers, or payment providers.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">11. Termination</h2>
        <p>
          We may suspend or terminate your account at any time if you violate these Terms or misuse the
          app.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">12. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Updates will be posted in-app, and continued use
          of the app means you accept the revised Terms.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">13. Governing Law</h2>
        <p>These Terms are governed by the laws of United States, Florida.</p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">14. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:&nbsp;
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 underline-offset-4 hover:underline">
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </DocShell>
  );
}
