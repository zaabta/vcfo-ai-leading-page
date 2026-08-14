import Link from "next/link";

/**
 * Root 404 — rendered for invalid locales (e.g. /fr/...), outside the
 * [locale] layout, so it must be a complete standalone document.
 */
export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <title>404 | VCFO</title>
      </head>
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#fafafa",
          color: "#111",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          margin: 0,
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
          <h2 style={{ fontSize: "1.25rem", margin: "0.5rem 0" }}>
            الصفحة غير موجودة · Page not found
          </h2>
          <p style={{ color: "#4b5563", margin: 0 }}>
            الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
            <br />
            The page you are looking for does not exist or has been moved.
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link
              href="/"
              style={{
                background: "#111",
                color: "#fff",
                padding: "0.6rem 1.2rem",
                borderRadius: "0.4rem",
                textDecoration: "none",
              }}
            >
              VCFO
            </Link>
          </p>
        </div>
      </body>
    </html>
  );
}
