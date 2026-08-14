import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Handles:
 *  - redirecting `/` (and any unprefixed path) to the default locale `/ar`,
 *  - validating the locale segment (unknown locales → 404),
 *  - making the locale available to the server components.
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - files that include a dot (e.g. favicon.ico, og/*.png)
  // - internal Next.js paths
  matcher: ["/", "/(ar|en)/:path*", "/((?!_next|_vercel|api|.*\\..*).*)"],
};
