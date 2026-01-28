import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd, { generateOrganizationSchema } from "@/components/seo/JsonLd";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Codantrix Labs | Real Solutions for Real Problems",
  description: "B2B AI/ML partner for enterprises. Pragmatic intelligence built for measurable industrial and enterprise ROI.",
  metadataBase: new URL("https://codantrix.com"),
  icons: {
    icon: "/Logo_Favicon.ico",
    shortcut: "/Logo_Favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} antialiased selection:bg-brand-orange selection:text-nm-accent-text`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-orange focus:px-4 focus:py-2 focus:text-black focus:font-semibold"
        >
          Skip to content
        </a>
        <JsonLd data={generateOrganizationSchema()} />
        <Navbar />
        <main id="main-content" className="min-h-[80vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
