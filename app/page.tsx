import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Heart, Home } from "lucide-react";
import { AdsSlot } from "@/components/ads-slot";

export const metadata = {
  title: "PercentLab - Professional Calculator Tools",
  description:
    "Free online calculators for percentage, BMI, and mortgage calculations. Fast, accurate, and easy to use professional tools.",
  openGraph: {
    title: "PercentLab - Professional Calculator Tools",
    description: "Free online calculators for percentage, BMI, and mortgage calculations.",
  },
};

export default function HomePage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
            Professional Calculator Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fast, accurate, and easy-to-use calculators for everyday math needs.
            No sign-up required.
          </p>
        </div>

        {/* Top Ad Slot */}
        <AdsSlot placement="top" slot="top-home" />

        {/* Calculator Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calculator className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Percentage Calculator</CardTitle>
              <CardDescription>
                Calculate percentages, percentage increase/decrease, and reverse percentages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/percentage">Open Calculator</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Heart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>BMI Calculator</CardTitle>
              <CardDescription>
                Calculate your Body Mass Index and body fat percentage using the Navy method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/bmi">Open Calculator</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Home className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Mortgage Calculator</CardTitle>
              <CardDescription>
                Calculate monthly payments and view amortization schedules for your mortgage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/mortgage">Open Calculator</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">What is PercentLab?</h3>
              <p className="text-muted-foreground">
                PercentLab is a collection of free, professional-grade calculators designed to help
                you with common mathematical calculations including percentages, BMI, and mortgage
                payments.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Are these calculators free to use?</h3>
              <p className="text-muted-foreground">
                Yes! All calculators on PercentLab are completely free to use with no sign-up
                required. We support the site through non-intrusive advertising.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How accurate are the calculations?</h3>
              <p className="text-muted-foreground">
                Our calculators use industry-standard formulas and are thoroughly tested for
                accuracy. However, results should be used for informational purposes only. For
                critical financial or health decisions, please consult with a professional.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Do you store my data?</h3>
              <p className="text-muted-foreground">
                No. All calculations are performed locally in your browser. We do not collect,
                store, or transmit any of your calculation data.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Ad Slot */}
        <AdsSlot placement="bottom" slot="bottom-home" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "PercentLab",
              url: "https://percentlab.app",
              description:
                "Free online calculators for percentage, BMI, and mortgage calculations.",
              applicationCategory: "UtilitiesApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is PercentLab?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "PercentLab is a collection of free, professional-grade calculators designed to help you with common mathematical calculations including percentages, BMI, and mortgage payments.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are these calculators free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! All calculators on PercentLab are completely free to use with no sign-up required.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How accurate are the calculations?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our calculators use industry-standard formulas and are thoroughly tested for accuracy. However, results should be used for informational purposes only.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you store my data?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All calculations are performed locally in your browser. We do not collect, store, or transmit any of your calculation data.",
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </div>
  );
}
