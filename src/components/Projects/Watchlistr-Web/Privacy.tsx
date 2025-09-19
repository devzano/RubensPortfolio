// src/components/Projects/Watchlistr-Web/Privacy.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "April 08, 2025";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";
const SITE_URL = "https://www.rubenmanzano.com/watchlistr-web";

export default function Privacy() {
  return (
    <DocShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy explains how Watchlistr for web (“Site”) collects and uses information.
        By using the Site, you agree to the practices described here.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Information We Collect</h2>
        <p>
          If you create an account or sign in, we collect the minimum necessary information to operate the
          Site and sync your data:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li><strong className="text-slate-100">Email</strong> — to identify your account and support sign-in.</li>
          <li><strong className="text-slate-100">Display name / username</strong> — to personalize your profile.</li>
          <li><strong className="text-slate-100">Profile image URL</strong> — if you choose to add one.</li>
          <li><strong className="text-slate-100">Watchlist &amp; preferences</strong> — titles and options you save.</li>
        </ul>
        <p className="mt-2">
          We do <strong>not</strong> collect your precise location, contacts, or behavioral analytics via the Site.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Authentication, Cookies &amp; Local Storage</h2>
        <p>
          We use <strong>Supabase</strong> for authentication and data storage. Supabase sets secure cookies to
          maintain your session. We may also use local storage for non-sensitive preferences (e.g., theme).
          You can clear cookies/local storage in your browser at any time, though doing so may sign you out
          or reset preferences.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Third-Party Services</h2>
        <p>We rely on these providers to deliver core functionality:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>
            <strong className="text-slate-100">Supabase</strong> — authentication, database, and file storage.
          </li>
          <li>
            <strong className="text-slate-100">TMDB (The Movie Database)</strong> — media details and artwork. We do
            not send your personal data to TMDB.
          </li>
        </ul>
        <p className="mt-2">
          These providers process data under their own privacy policies. We do not sell your personal data or share it
          with third parties for marketing purposes.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">How We Use Information</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Provide and secure account access.</li>
          <li>Sync your watchlist and preferences across sessions/devices.</li>
          <li>Improve reliability and fix issues.</li>
          <li>Comply with legal obligations when required.</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Data Retention &amp; Deletion</h2>
        <p>
          Account data is retained while your account is active. You can request deletion of your account data at any time,
          or (if provided in-app) delete your account directly from settings. Deletion permanently removes your
          watchlist, profile, and related records from Supabase (subject to brief backups/logs as required for
          security and compliance).
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Security</h2>
        <p>
          We rely on Supabase’s security features (row-level security, encryption at rest/in transit, auth safeguards)
          and follow reasonable practices to protect your data. No system can be 100% secure, but we work to keep your
          information safe.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Children’s Privacy</h2>
        <p>
          The Site is not intended for children under 13. We do not knowingly collect personal data from children under 13.
          If you believe a child has provided personal information, contact us and we will take appropriate action.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Updates will be posted here with a revised date. Your
          continued use indicates acceptance of changes.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">Contact</h2>
        <ul className="list-disc space-y-1 pl-6 marker:text-sky-400">
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sky-400 hover:underline underline-offset-4">
              {SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline underline-offset-4">
              {SITE_URL}
            </a>
          </li>
        </ul>
      </div>
    </DocShell>
  );
}