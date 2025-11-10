"use client";

import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

/**
 * Root providers for the application
 * - Theme provider for dark mode
 * - Vercel Analytics for performance tracking
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <Analytics />
    </ThemeProvider>
  );
}
