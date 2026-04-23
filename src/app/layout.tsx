import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd, { generateOrganizationSchema } from "@/components/seo/JsonLd";
import Analytics from "@/components/seo/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Codantrix Labs — Agentic AI systems, shipped to production",
    template: "%s | Codantrix Labs",
  },
  description:
    "I'm Hassan. I build production agentic AI systems for SaaS founders and seed–Series B teams. Fixed price, weekly shipped demos, code you own.",
  metadataBase: new URL("https://labs.codantrix.com"),
  icons: {
    icon: "/Logo_Favicon.ico",
    shortcut: "/Logo_Favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://labs.codantrix.com",
    siteName: "Codantrix Labs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg focus:font-semibold"
        >
          Skip to content
        </a>
        <JsonLd data={generateOrganizationSchema()} />
        <Analytics />
        <Navbar />
        <main id="main" className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
