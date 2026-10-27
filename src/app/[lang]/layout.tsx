import type { Metadata, Viewport } from "next";
import "../globals.css";
import { notFound } from "next/navigation";
import { isLang, locales } from "@/i18n";
import { getLang, getLive, getT, shortDescription } from "@/content/server";
import { LangProvider } from "@/components/LangProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Only /… (Dutch) and /en/… (English) exist; any other first segment is a 404 (checked below).
// Not `dynamicParams = false`: that would also apply to the pages under it, and an event published
// in the dashboard after the last build must still get its page (events/[slug]).
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { siteMeta } = await getT();
  return {
    title: siteMeta.title,
    description: shortDescription(siteMeta.description),
    metadataBase: new URL("https://www.sincantwerpen.be"),
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

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  if (!isLang((await params).lang)) notFound();
  const lang = await getLang();
  const live = await getLive(lang);
  return (
    <html lang={lang}>
      <body>
        <LangProvider lang={lang} live={live}>
          <SmoothScroll />
          <Nav />
          {children}
          <Footer />
        </LangProvider>
        <div aria-hidden className="grain max-lg:hidden" />
      </body>
    </html>
  );
}
