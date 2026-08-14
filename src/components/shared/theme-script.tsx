/**
 * Inline beforeInteractive script:
 *  1. sets <html class="js"> so reveal animations only run with JS available
 *     (without it, all content stays visible),
 *  2. removes any theme flash by pinning the scheme early.
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.classList.add("js");`,
      }}
    />
  );
}
