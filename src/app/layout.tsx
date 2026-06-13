import type { Metadata, Viewport } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flowers.ua"),
  title: {
    default: "Flowers — Преміальний квітковий бутік",
    template: "%s — Flowers",
  },
  description:
    "Flowers — квітковий бутік найвищого класу. Авторські букети, весільна флористика, ексклюзивні квіткові бокси та доставка свіжих квітів у Білгороді-Дністровському.",
  keywords: [
    "квіти",
    "квітковий бутік",
    "преміальні букети",
    "весільні букети",
    "доставка квітів",
    "Flowers",
  ],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "Flowers",
    title: "Flowers — Преміальний квітковий бутік",
    description:
      "Авторська флористика класу люкс: весільні букети, преміальні композиції, ексклюзивні квіткові бокси. Свіжі квіти щодня.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Flowers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowers — Преміальний квітковий бутік",
    description:
      "Авторська флористика класу люкс. Свіжі квіти щодня, доставка по місту та області.",
    images: ["/logo.png"],
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fffaf4",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: "Flowers",
  description:
    "Преміальний квітковий бутік: авторські букети, весільна флористика, квіткові бокси, доставка свіжих квітів.",
  image: "https://flowers.ua/logo.png",
  logo: "https://flowers.ua/logo.png",
  url: "https://flowers.ua",
  telephone: "+380 (68) 000 00 00",
  priceRange: "₴₴₴",
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Михайлівська, 35",
    addressLocality: "Білгород-Дністровський",
    addressRegion: "Одеська область",
    postalCode: "67700",
    addressCountry: "UA",
  },
  openingHours: "Mo-Su 09:00-20:00",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
