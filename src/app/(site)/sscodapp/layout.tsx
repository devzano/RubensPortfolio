export const metadata = {
  title: "Sunshine COD Application",
  description: "A polished digital COD application experience for Sunshine Gasoline Distributors, Inc.",
  alternates: {
    canonical: "/sscodapp",
  },
  openGraph: {
    title: "Sunshine COD Application",
    description: "A polished digital COD application experience for Sunshine Gasoline Distributors, Inc.",
    url: "https://rubenmanzano.com/sscodapp",
    siteName: "Sunshine COD Application",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/sscodapp/opengraph-image.png",
        width: 300,
        height: 260,
        alt: "Sunshine COD Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunshine COD Application",
    description: "A polished digital COD application experience for Sunshine Gasoline Distributors, Inc.",
    images: ["/sscodapp/twitter-image.png"],
  },
};

export default function SSCodAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
