import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Preview proxies in this workspace serve the dev server under arbitrary
  // origins (e.g. *.e2b.app); allow cross-origin dev requests.
  allowedDevOrigins: ["e2b.app"],
};

export default withNextIntl(nextConfig);
