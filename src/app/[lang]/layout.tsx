import type { Metadata, Viewport } from "next";
import "../globals.css";
import { locales } from "@/i18n";
import { getLang, getT, shortDescription } from "@/content/server";
import { LangProvider } from "@/components/LangProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Only /… (Dutch) and /en/… (English) exist; any other first segment is a 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { siteMeta } = await getT();
  return {
    title: siteMeta.title,
    description: shortDescription(siteMeta.description),
    metadataBase: new URL("https://sincantwerpen.be"),
    openGraph: {
      title: "SINC Antwerpen",
      description: "Students for Innovation & Cooperation",
      images: ["/images/community.jpg"],
      locale: siteMeta.ogLocale,
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0e14",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLang();
  return (
    <html lang={lang}>
      <body>
        <LangProvider lang={lang}>
          <SmoothScroll />
          <Nav />
          {children}
          <Footer />
        </LangProvider>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
