import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
