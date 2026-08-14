import { notFound } from "next/navigation";

/**
 * Catch-all guard inside the locale segment: any unknown path under a valid
 * locale (e.g. /ar/nonexistent) renders the localized 404 page.
 * This does NOT create new routes — it only guards against unknown ones.
 */
export default function CatchAllPage() {
  notFound();
}
