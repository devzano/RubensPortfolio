export const metadata = {
  title: "Sunshine Fuel Portal",
  description: "A mock Sunshine customer fuel portal showing account status, past orders, and re-order flow.",
  alternates: {
    canonical: "/ssfuelportal",
  },
  openGraph: {
    title: "Sunshine Fuel Portal",
    description: "A mock Sunshine customer fuel portal showing account status, past orders, and re-order flow.",
    url: "https://rubenmanzano.com/ssfuelportal",
    siteName: "Sunshine Fuel Portal",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/ssfuelportal/opengraph-image.png",
        width: 300,
        height: 260,
        alt: "Sunshine Fuel Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunshine Fuel Portal",
    description: "A mock Sunshine customer fuel portal showing account status, past orders, and re-order flow.",
    images: ["/ssfuelportal/twitter-image.png"],
  },
};

export default function SSFuelPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
