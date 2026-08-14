import type { ReactNode } from "react";
import { Navbar } from "./nav";
import { Footer } from "./sections-e";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
