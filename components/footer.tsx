import Link from "next/link";

/**
 * Site footer with links and copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold">Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/percentage" className="hover:text-primary transition-colors">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link href="/bmi" className="hover:text-primary transition-colors">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/mortgage" className="hover:text-primary transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">PercentLab</h3>
            <p className="text-sm text-muted-foreground">
              Professional calculators for percentage, BMI, and mortgage calculations.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} PercentLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
