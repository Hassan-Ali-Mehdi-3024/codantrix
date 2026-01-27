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
  icons: {
    icon: '/Logo_Favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased selection:bg-brand-orange selection:text-white bg-background-deep bg-[radial-gradient(circle_at_20%_20%,rgba(241,90,47,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(241,90,47,0.06),transparent_30%)]`}
      >
        <JsonLd data={generateOrganizationSchema()} />
        <Navbar />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
