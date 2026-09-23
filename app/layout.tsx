import { site } from "@/lib/site";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.client}, ${site.proposalLabel} | ${site.agency}`,
  description:
    "A digital platform proposal from Pragmatic Digital for Client Name, recommending Vendure Core and comparing Shopify Plus and a Magento improvement programme.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/pragmatic-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${figtree.variable} ${newsreader.variable}`}>
      <GoogleTagManager gtmId="GTM-KZ4QZP7L" />
      <body className="min-h-screen antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KZ4QZP7L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <a
          href="#overview"
          className="no-print sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to the proposal
        </a>
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
