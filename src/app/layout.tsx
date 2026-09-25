import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { ThemeScript } from "@/components/navigation/ThemeScript";
import { JsonLd } from "@/components/seo/JsonLd";
import { SkipLink } from "@/components/ui/SkipLink";
import { siteConfig, siteUrl } from "@/config/site";
import { personSchema, webSiteSchema } from "@/lib/seo/schema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.siteName} — ${siteConfig.jobTitle}`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.siteName,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.siteName,
  category: "technology",
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#121010" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.htmlLang}
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="bg-canvas text-fg flex min-h-dvh flex-col">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={[personSchema(), webSiteSchema()]} />
      </body>
    </html>
  );
}
