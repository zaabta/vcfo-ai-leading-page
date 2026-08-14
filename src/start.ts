import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

// Middleware to redirect www to non-www
const wwwRedirectMiddleware = createMiddleware().server(async ({ request, next }) => {
  const url = new URL(request.url);
  
  // Redirect www to non-www
  if (url.hostname.startsWith("www.")) {
    const newUrl = new URL(request.url);
    newUrl.hostname = url.hostname.substring(4); // Remove 'www.'
    return new Response(null, {
      status: 301,
      headers: { Location: newUrl.toString() },
    });
  }
  
  return await next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [wwwRedirectMiddleware, errorMiddleware, csrfMiddleware],
}));
