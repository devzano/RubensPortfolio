import Image from "next/image";
import Link from "next/link";
import AppImages from "@/constants/images";

const features = [
  "Secure Google AdMob account connection",
  "Publisher, app, and ad-unit inventory",
  "Network and mediation reporting",
  "Estimated earnings, impressions, clicks, eCPM, CTR, and match rate",
  "Optional AdMob app and ad-unit setup tools",
  "CSV export and local saved report filters",
  "Disconnect and account deletion controls",
];

export default function YieldLensPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 pb-16 pt-28 text-slate-100 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="flex flex-col items-start gap-7">
          <Image
            src={AppImages.yieldlens}
            alt="YieldLens app icon"
            width={92}
            height={92}
            priority
            className="rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30"
          />
          <div className="space-y-5">
            <h1 className="max-w-2xl text-5xl font-black tracking-tight text-white sm:text-6xl">
              YieldLens
            </h1>
            <p className="max-w-2xl text-xl leading-8 text-slate-300">
              A reporting and setup companion for app publishers who want a clearer view of Google
              AdMob earnings, inventory, mediation performance, apps, and ad units.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/yieldlens/privacy"
              className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              Privacy Policy
            </Link>
            <Link
              href="/yieldlens/terms"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-slate-100 shadow-lg shadow-black/20 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/25"
            >
              Terms
            </Link>
            <a
              href="mailto:rmanzano.se@gmail.com"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-slate-100 shadow-lg shadow-black/20 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/25"
            >
              Contact Support
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/30 ring-1 ring-white/10 backdrop-blur-md">
          <div className="rounded-2xl border border-emerald-300/20 bg-[#0B1210] p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-200">AdMob reporting and setup</p>
                <p className="mt-1 text-sm text-slate-400">Independent app. Not affiliated with Google.</p>
              </div>
              <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
                OAuth
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 leading-7 text-slate-300 shadow-xl shadow-black/20">
        <h2 className="mb-3 text-2xl font-bold text-white">How YieldLens uses Google data</h2>
        <p>
          YieldLens requests basic Google profile information and the{" "}
          <code className="rounded bg-black/30 px-1.5 py-0.5 text-emerald-200">
            admob.readonly
          </code>{" "}
          scope so connected users can view their own AdMob publisher details, apps, ad units, and
          requested reports. It may also request the{" "}
          <code className="rounded bg-black/30 px-1.5 py-0.5 text-emerald-200">
            admob.monetization
          </code>{" "}
          scope so users can create AdMob apps and ad units from setup tools they submit.
          YieldLens does not manage AdMob payments, campaigns, account ownership, or unrelated
          Google services.
        </p>
      </section>
    </main>
  );
}
