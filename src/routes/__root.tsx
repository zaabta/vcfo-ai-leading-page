import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { GoogleAnalytics } from "@/components/vcfo/analytics";
import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from "@/lib/analytics";
import { LangProvider } from "@/components/vcfo/lang";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          تعذّر تحميل الصفحة
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          حدث خطأ من جهتنا. يمكنك المحاولة مرة أخرى أو العودة للرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            حاول مرة أخرى
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            العودة للرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VCFO | ذكاء مالي | Financial Intelligence Platform" },
      { name: "description", content: "VCFO منصة ذكاء مالي للشركات تساعد على تنظيف البيانات المالية وتحويلها إلى قوائم مالية موثوقة ومؤشرات واضحة." },
      { name: "keywords", content: "VCFO, ذكاء مالي, Financial Intelligence, Financial Truth, تقارير مالية, مؤشرات مالية, business intelligence, financial reporting, accounting automation" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "VCFO" },
      { name: "application-name", content: "VCFO" },
      { name: "theme-color", content: "#0b1110" },
      { name: "color-scheme", content: "light dark" },
      { property: "og:title", content: "VCFO | ذكاء مالي | Financial Intelligence Platform" },
      { property: "og:description", content: "VCFO منصة ذكاء مالي للشركات تساعد على تنظيف البيانات المالية وتحويلها إلى قوائم مالية موثوقة ومؤشرات واضحة." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "VCFO" },
      { property: "og:image", content: "/og-image.svg" },
      { property: "og:locale", content: "ar_SA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@VCFO" },
      { name: "twitter:title", content: "VCFO | ذكاء مالي | Financial Intelligence Platform" },
      { name: "twitter:description", content: "VCFO منصة ذكاء مالي للشركات تساعد على تنظيف البيانات المالية وتحويلها إلى قوائم مالية موثوقة ومؤشرات واضحة." },
      { name: "twitter:image", content: "/og-image.svg" },
    ],
    links: [
      { rel: "canonical", href: "https://vcfo-ai.com" },
      { rel: "alternate", hrefLang: "ar-SA", href: "https://vcfo-ai.com/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://vcfo-ai.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      ...(isAnalyticsEnabled
        ? [
            { rel: "preconnect" as const, href: "https://www.googletagmanager.com" },
            { rel: "dns-prefetch" as const, href: "https://www.google-analytics.com" },
          ]
        : []),
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "mask-icon", href: "/favicon.svg", color: "#1f8578" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "sitemap", href: "/sitemap.xml" },
    ],
    scripts: isAnalyticsEnabled
      ? [
          {
            src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
            async: true,
          },
          {
            children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true,send_page_view:false});`,
          },
        ]
      : [],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <LangProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleAnalytics />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </QueryClientProvider>
    </LangProvider>
  );
}
