import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SINC | Voor en door studenten met ondernemingszin",
  description:
    "SINC wil studenten laten zien dat ondernemen geen ver-van-mijn-bedshow hoeft te zijn. Inspiratie, tools en netwerk voor studenten met ondernemingszin in Antwerpen.",
  metadataBase: new URL("https://sincantwerpen.be"),
  openGraph: {
    title: "SINC Antwerpen",
    description: "Students for Innovation & Cooperation",
    images: ["/images/community.jpg"],
    locale: "nl_BE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0e14",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl">
      <body>
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
