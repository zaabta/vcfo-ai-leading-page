import { redirect } from "@/i18n/navigation";

/**
 * `/` → default language (Arabic). The middleware performs the actual
 * redirect; this server action is the App Router fallback.
 */
export default function RootPage() {
  redirect({ href: "/", locale: "ar" });
}
