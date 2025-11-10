import Link from "next/link";
import { Calculator } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Site header with navigation and theme toggle
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 font-bold">
            <Calculator className="h-6 w-6 text-primary" />
            <span className="text-xl">PercentLab</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/percentage"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Percentage
            </Link>
            <Link href="/bmi" className="text-sm font-medium transition-colors hover:text-primary">
              BMI
            </Link>
            <Link
              href="/mortgage"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Mortgage
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
