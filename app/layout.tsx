import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Y.R. Mahal | Premium Wedding & Event Venue in Nagercoil",
  description:
    "Y.R. Mahal is a premium wedding and event venue on Water Tank Road, Nagercoil, Tamil Nadu for weddings, receptions, engagements, family functions, and corporate gatherings.",
  keywords: [
    "Y.R. Mahal",
    "wedding hall in Nagercoil",
    "marriage hall Nagercoil",
    "event venue Nagercoil",
    "reception hall Tamil Nadu"
  ],
  openGraph: {
    title: "Y.R. Mahal | Premium Wedding & Event Venue in Nagercoil",
    description:
      "A refined venue for weddings, receptions, engagements, family celebrations, and corporate gatherings in Nagercoil.",
    images: ["/venue/yr-mahal-exterior-wide.png"],
    type: "website",
    locale: "en_IN"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
