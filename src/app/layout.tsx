import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rubenmanzano.com"),
  title: {
    default: "Ruben Manzano — Portfolio",
    template: "%s — Devzano",
  },
  description:
    "Portfolio of Ruben Manzano. Motivated software engineer seeking an entry-level role. About, contact (LinkedIn, email, phone), and skills including HTML, CSS, JavaScript, Python, React, Swift, Flask, Express, Node.js, Git, PostgreSQL, MySQL, data analysis, algorithms, UI/UX, debugging, testing, and full-stack development.",
  keywords: [
    "Ruben Manzano",
    "software engineer",
    "portfolio",
    "entry-level",
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "React",
    "Swift",
    "Flask",
    "Express",
    "Node.js",
    "Git",
    "PostgreSQL",
    "MySQL",
    "Data Analysis",
    "Algorithms",
    "UI/UX Design",
    "Debugging",
    "Testing",
    "Full-Stack Developer",
    "Next.js",
    "Expo",
    "React Native",
  ],
  openGraph: {
    title: "Ruben Manzano — Portfolio",
    description:
      "About, contact, and skills: HTML, CSS, JavaScript, Python, React, Swift, Flask, Express, Node.js, Git, PostgreSQL, MySQL, data analysis, algorithms, UI/UX, debugging, testing, full-stack.",
    url: "https://rubenmanzano.com/",
    siteName: "Ruben Manzano",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-portfolio.png", width: 1200, height: 630, alt: "Ruben Manzano — Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruben Manzano — Portfolio",
    description:
      "About, contact, and skills for Ruben Manzano — motivated software engineer seeking an entry-level role.",
    images: ["/og-portfolio.png"],
    creator: "@rubenizag",
  },
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "Devzano's Portfolio",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#252526" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100`}>
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}