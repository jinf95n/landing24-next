import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landing24.com.ar"),
  title: {
    default: "Fábrica Digital — Sitio Web Profesional en 24hs | San Juan",
    template: "%s | Landing24",
  },
  description:
    "Transformamos tu negocio en una marca profesional en menos de 24 horas. Sitio web moderno, rápido y seguro. Especialistas en San Juan, Argentina.",
  keywords: [
    "sitio web San Juan",
    "diseño web San Juan Argentina",
    "página web profesional San Juan",
    "desarrollo web PyMEs San Juan",
    "agencia web San Juan",
  ],
  authors: [{ name: "MCM Digital" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://landing24.com.ar",
    siteName: "Fábrica Digital",
    title: "Fábrica Digital — Sitio Web Profesional en 24hs",
    description:
      "Tu sitio web moderno, rápido y seguro sin que tengas que ocuparte de nada.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://landing24.com.ar" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1558673335806716');fbq('track','PageView');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:6692936,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Fábrica Digital",
              description:
                "Sitios web profesionales en 24hs para negocios de San Juan, Argentina",
              url: "https://landing24.com.ar",
              telephone: "+542646233326",
              address: {
                "@type": "PostalAddress",
                addressLocality: "San Juan",
                addressRegion: "San Juan",
                addressCountry: "AR",
              },
              areaServed: {
                "@type": "City",
                name: "San Juan",
              },
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body>{children}</body>
       <GoogleAnalytics gaId="G-MNJKRXT9TP" />
    </html>
  );
}
