import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** Web app manifest — preserved from the original site.webmanifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VCFO | ذكاء مالي | Financial Intelligence Platform",
    short_name: "VCFO",
    description: siteConfig.description.ar,
    start_url: "/ar",
    display: "standalone",
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
