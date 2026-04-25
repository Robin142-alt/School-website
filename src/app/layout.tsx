import type { Metadata } from "next";
import { Fraunces, Manrope, Space_Mono } from "next/font/google";

import { MobileQuickActions } from "@/components/mobile-quick-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/metadata";

import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const displayFont = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const monoFont = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = buildMetadata({
  title: "St. Clare's Maragoli Girls School | Grounded girls. Courageous futures.",
  description:
    "A modern, parent-friendly school website for St. Clare's Maragoli Girls School in Vihiga County, Kenya.",
});

export const revalidate = 300;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileQuickActions />
      </body>
    </html>
  );
}
