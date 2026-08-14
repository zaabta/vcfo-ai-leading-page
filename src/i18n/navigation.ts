import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives. Always use these instead of the
 * plain `next/link`/`next/navigation` exports so links keep the /ar, /en
 * prefix automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
