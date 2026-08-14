import type { ReactNode } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: { url: "/favicon.svg", type: "image/svg+xml" },
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: { title: siteConfig.name },
};

/**
 * Root layout — deliberately minimal. Every route lives under `[locale]`,
 * whose layout renders <html lang dir> per language (ar=rtl, en=ltr) with
 * the self-hosted fonts attached.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
