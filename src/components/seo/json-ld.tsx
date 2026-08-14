import type { Thing, WithContext } from "schema-dts";

/**
 * Renders a JSON-LD structured-data script tag for inclusion in a page or
 * layout. Content is server-rendered, so search engines and AI crawlers see
 * it without executing any JavaScript.
 */
export function JsonLd<T extends Thing>({ data }: { data: WithContext<T> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
