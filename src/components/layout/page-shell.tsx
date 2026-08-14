import { Navbar } from "./navbar";
import { Footer } from "./footer";
import type { ReactNode } from "react";

/** Shared shell for content pages (about, privacy, terms, blog). */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
