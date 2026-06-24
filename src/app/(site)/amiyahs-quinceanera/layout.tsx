import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amiyah's Quinceañera",
  description: "A live guest upload page for Amiyah's Quinceañera photos, videos, and voice memos.",
  alternates: {
    canonical: "/amiyahs-quinceanera",
  },
  openGraph: {
    title: "Amiyah's Quinceañera",
    description: "A live guest album for Amiyah's Quinceañera. Upload photos, videos, and voice memos from the event.",
    url: "https://rubenmanzano.com/amiyahs-quinceanera",
    siteName: "Amiyah's Quinceañera",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/amiyahs-quinceanera/opengraph-image.png",
        width: 1680,
        height: 945,
        alt: "Amiyah's Quinceañera event preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amiyah's Quinceañera",
    description: "A live guest album for Amiyah's Quinceañera. Upload photos, videos, and voice memos from the event.",
    images: ["/amiyahs-quinceanera/twitter-image.png"],
  },
};

export default function AmiyahsQuinceaneraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
