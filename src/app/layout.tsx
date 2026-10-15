import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

// AdSense publisher ID — set NEXT_PUBLIC_ADSENSE_CLIENT on Replit once approved.
// When unset, the loader script is omitted entirely (no ads, no errors).
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tacohacker.com"),
  title: "TacoHacker - Cheapest Menu Hack Finder",
  description:
    "Find the cheapest way to build your perfect Taco Bell order using menu hacks and modifications.",
  openGraph: {
    title: "TacoHacker - Cheapest Menu Hack Finder",
    description:
      "Find the cheapest way to build your perfect Taco Bell order using menu hacks and modifications.",
    url: "https://tacohacker.com",
    siteName: "TacoHacker",
    images: [{ url: "/icon-512.png", width: 512, height: 512 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TacoHacker - Cheapest Menu Hack Finder",
    description:
      "Find the cheapest way to build your perfect Taco Bell order using menu hacks and modifications.",
    images: ["/icon-512.png"],
  },
  // AdSense site-ownership verification meta tag. Only emitted once the
  // publisher ID is configured, so it's dormant until then.
  ...(ADSENSE_CLIENT
    ? { other: { "google-adsense-account": ADSENSE_CLIENT } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {children}
        <footer className="py-4 text-center">
          <Link
            href="/privacy"
            className="text-xs text-zinc-400 hover:text-zinc-600 hover:underline"
          >
            Privacy Policy
          </Link>
        </footer>
      </body>
    </html>
  );
}
