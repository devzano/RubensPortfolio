// src/components/Projects/EchoExpense/Security.tsx
"use client";

import React from "react";
import DocShell from "../LegalDocShell";

const LAST_UPDATED = "April 2026";
const SUPPORT_EMAIL = "rmanzano.se@gmail.com";

export default function Security() {
  return (
    <DocShell title="Security Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Security Policy applies to the EchoExpense mobile application
        (&ldquo;Application&rdquo;) created and maintained by Ruben Manzano
        (operating as Devzano) (&ldquo;Owner&rdquo;). It outlines the security
        practices used to help protect the Application, its infrastructure, and
        associated user data.
      </p>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          1. Overview
        </h2>
        <p>
          EchoExpense is a mobile application developed and maintained by Ruben
          Manzano (operating as Devzano). This document describes the security
          measures and practices used to support the confidentiality, integrity,
          and availability of the application and its supporting services.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          2. Infrastructure &amp; Hosting
        </h2>
        <p>
          EchoExpense is hosted entirely on cloud infrastructure provided
          through Google Firebase and Google Cloud Platform (GCP).
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Backend services are implemented using Firebase and Cloud Functions</li>
          <li>Infrastructure is fully managed through Google Cloud</li>
          <li>No on-premise infrastructure is used</li>
          <li>Production systems are centrally managed through the Firebase Console</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          3. Data Protection
        </h2>

        <h3 className="mb-2 mt-4 text-base font-semibold text-slate-200">
          3.1 Encryption
        </h3>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Data in transit is encrypted using HTTPS/TLS</li>
          <li>Data at rest is protected by Firebase and Google Cloud infrastructure</li>
        </ul>

        <h3 className="mb-2 mt-4 text-base font-semibold text-slate-200">
          3.2 Data Storage
        </h3>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Sensitive user data is not directly stored or processed outside of Firebase services</li>
          <li>Firebase Authentication is used to securely manage user credentials</li>
          <li>Application databases are protected using Firebase Security Rules</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          4. Authentication &amp; Access Control
        </h2>

        <h3 className="mb-2 mt-4 text-base font-semibold text-slate-200">
          4.1 User Authentication
        </h3>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Authentication is handled through Firebase Authentication</li>
          <li>Supported sign-in methods are securely managed by Firebase</li>
        </ul>

        <h3 className="mb-2 mt-4 text-base font-semibold text-slate-200">
          4.2 Access Control
        </h3>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Access to production systems is restricted to authorized accounts only</li>
          <li>Role-based access is enforced through Firebase and Google account permissions</li>
          <li>Least-privilege principles are followed when granting access</li>
          <li>Access activity is logged and monitored through Firebase and Google Cloud logging tools</li>
          <li>Multi-factor authentication (MFA) is enabled for critical accounts where supported</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          5. Asset Management
        </h2>
        <p>
          EchoExpense maintains visibility into infrastructure and production
          systems through centralized cloud management tools.
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Firebase Console and Google Cloud dashboards are used to manage systems</li>
          <li>Access is controlled through authenticated Google accounts</li>
          <li>Backend services and deployments are managed centrally in the cloud</li>
        </ul>
        <p className="mt-3">
          All production assets are managed within the cloud environment to help
          maintain visibility, consistency, and administrative control.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          6. Vulnerability Management
        </h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Dependencies are monitored, reviewed, and updated regularly</li>
          <li>Security patches are applied as needed</li>
          <li>Third-party libraries are periodically reviewed for security and maintenance updates</li>
        </ul>
        <p className="mt-3">
          EchoExpense follows an ongoing process of monitoring, reviewing, and
          updating dependencies. Additional automated tooling may be
          incorporated over time to further enhance vulnerability detection.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          7. Source Code Management
        </h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Source code is stored in private GitHub repositories</li>
          <li>Repository access is restricted to authorized contributors</li>
          <li>Version control is used to track changes and support accountability</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          8. Incident Response
        </h2>
        <p>EchoExpense follows a structured response process which includes:</p>
        <ol className="list-decimal space-y-2 pl-6 marker:text-sky-400">
          <li>Identifying and isolating the issue</li>
          <li>Revoking affected credentials or access</li>
          <li>Applying necessary fixes or patches</li>
          <li>Monitoring systems for continued or additional impact</li>
          <li>Notifying users when appropriate or required</li>
        </ol>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          9. Third-Party Services
        </h2>
        <p>EchoExpense relies on trusted third-party providers, including:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-sky-400">
          <li>Firebase / Google Cloud Platform — infrastructure, authentication, and database services</li>
        </ul>
        <p className="mt-3">
          These providers maintain their own security practices, controls, and
          compliance programs.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          10. Continuous Improvement
        </h2>
        <p>
          Security practices are reviewed and improved on an ongoing basis to
          help align with evolving threats, operational needs, and generally
          accepted industry standards.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-100">
          11. Contact
        </h2>
        <p>
          Questions about this Security Policy may be directed to:{" "}
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