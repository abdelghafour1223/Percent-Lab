import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AdsSlot } from "@/components/ads-slot";
import {
  parsePercentageSlug,
  generatePopularQueries,
  generateSolutionSteps,
} from "@/lib/pseo-generator";
import { formatNumber } from "@/lib/utils";
import { Calculator } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for popular percentage queries
 */
export async function generateStaticParams() {
  const queries = generatePopularQueries();
  return queries.map((query) => ({
    slug: query.slug,
  }));
}

/**
 * Generate metadata for each pSEO page
 */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const query = parsePercentageSlug(slug);

  if (!query) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `What is ${query.percentage}% of ${query.number}? (${formatNumber(query.result, 2)})`;
  const description = `Calculate ${query.percentage}% of ${query.number}. The answer is ${formatNumber(query.result, 2)}. Free percentage calculator with step-by-step solution.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    alternates: {
      canonical: `/pseo/${slug}`,
    },
  };
}

export default async function PercentagePSEOPage({ params }: PageProps) {
  const { slug } = await params;
  const query = parsePercentageSlug(slug);

  if (!query) {
    notFound();
  }

  const steps = generateSolutionSteps(query.percentage, query.number, query.result);

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Main Question */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            What is {query.percentage}% of {query.number}?
          </h1>
          <div className="text-6xl font-bold text-primary mb-4">
            {formatNumber(query.result, 2)}
          </div>
          <p className="text-xl text-muted-foreground">
            The answer is {formatNumber(query.result, 2)}. Learn how to calculate this below.
          </p>
        </div>

        <AdsSlot placement="top" slot="top-pseo" />

        {/* Step-by-Step Solution */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Step-by-Step Solution</h2>
            <ol className="space-y-3">
              {steps.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {idx + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Quick Reference */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Quick Reference</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Percentage</div>
                <div className="text-2xl font-bold">{query.percentage}%</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Of Number</div>
                <div className="text-2xl font-bold">{query.number}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Result</div>
                <div className="text-2xl font-bold text-primary">{formatNumber(query.result, 2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formula Explanation */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">The Formula</h2>
            <div className="p-6 bg-muted rounded-lg mb-4">
              <div className="text-center text-xl font-mono">
                Result = (Percentage ÷ 100) × Number
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              To calculate any percentage of a number, divide the percentage by 100 to convert it to
              a decimal, then multiply by the number.
            </p>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <p className="font-mono text-sm">
                {query.percentage}% of {query.number} = ({query.percentage} ÷ 100) × {query.number} ={" "}
                {formatNumber(query.result, 2)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Calculations */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Related Calculations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  p: query.percentage / 2,
                  n: query.number,
                },
                {
                  p: query.percentage * 2,
                  n: query.number,
                },
                {
                  p: query.percentage,
                  n: query.number * 2,
                },
                {
                  p: query.percentage,
                  n: query.number / 2,
                },
              ].map((rel, idx) => {
                const relResult = (rel.p / 100) * rel.n;
                return (
                  <Link
                    key={idx}
                    href={`/pseo/what-is-${rel.p}-percent-of-${rel.n}`}
                    className="p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="text-sm text-muted-foreground">What is</div>
                    <div className="font-semibold">
                      {rel.p}% of {rel.n}?
                    </div>
                    <div className="text-primary font-bold">= {formatNumber(relResult, 2)}</div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* CTA to Main Calculator */}
        <Card className="border-2 border-primary">
          <CardContent className="pt-6">
            <div className="text-center">
              <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Need More Calculations?</h2>
              <p className="text-muted-foreground mb-6">
                Use our full-featured percentage calculator for any percentage calculation, including
                percentage increase, decrease, and reverse percentages.
              </p>
              <Button asChild size="lg">
                <Link href="/percentage">Open Percentage Calculator</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <AdsSlot placement="bottom" slot="bottom-pseo" />

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                How do you calculate {query.percentage}% of {query.number}?
              </h3>
              <p className="text-muted-foreground">
                To calculate {query.percentage}% of {query.number}, convert {query.percentage}% to a
                decimal ({query.percentage / 100}) and multiply by {query.number}. This gives you{" "}
                {formatNumber(query.result, 2)}.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What is the formula for percentage?</h3>
              <p className="text-muted-foreground">
                The formula is: (Percentage ÷ 100) × Number = Result. For percentages, you always
                divide by 100 to convert to a decimal first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What are other percentages of {query.number}?
              </h3>
              <p className="text-muted-foreground">
                10% of {query.number} = {formatNumber((10 / 100) * query.number, 2)}, 20% of{" "}
                {query.number} = {formatNumber((20 / 100) * query.number, 2)}, 50% of {query.number}{" "}
                = {formatNumber((50 / 100) * query.number, 2)}, and 100% of {query.number} ={" "}
                {query.number}.
              </p>
            </div>
          </div>
        </div>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `What is ${query.percentage}% of ${query.number}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `${query.percentage}% of ${query.number} equals ${formatNumber(query.result, 2)}. To calculate this, convert ${query.percentage}% to a decimal (${query.percentage / 100}) and multiply by ${query.number}.`,
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the formula for percentage?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The formula is: (Percentage ÷ 100) × Number = Result. For percentages, you always divide by 100 to convert to a decimal first.",
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: `What is ${query.percentage}% of ${query.number}?`,
              description: `Calculate ${query.percentage}% of ${query.number}. The answer is ${formatNumber(query.result, 2)}.`,
              author: {
                "@type": "Organization",
                name: "PercentLab",
              },
              publisher: {
                "@type": "Organization",
                name: "PercentLab",
                logo: {
                  "@type": "ImageObject",
                  url: "https://percentlab.app/logo.png",
                },
              },
            }),
          }}
        />
      </div>
    </div>
  );
}
