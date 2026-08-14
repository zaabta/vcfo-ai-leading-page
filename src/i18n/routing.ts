import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  /** A list of all locales that are supported. */
  locales: ["ar", "en"],

  /** Arabic is the default language of the VCFO website. */
  defaultLocale: "ar",

  /** Localized URLs: /ar, /en, /ar/blog/... */
  localePrefix: "always",
});
