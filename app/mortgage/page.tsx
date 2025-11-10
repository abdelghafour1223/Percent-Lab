"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/calculator-shell";
import { ResultCard } from "@/components/result-card";
import { AdsSlot } from "@/components/ads-slot";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortization: AmortizationRow[];
}

export default function MortgageCalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const calculateMortgage = () => {
    const P = parseFloat(principal);
    const annualInterestRate = parseFloat(annualRate);
    const n = parseFloat(years);

    if (isNaN(P) || isNaN(annualInterestRate) || isNaN(n) || P <= 0 || n <= 0) return;

    const r = annualInterestRate / 100 / 12; // Monthly interest rate
    const totalPayments = n * 12; // Total number of payments

    // Calculate monthly payment using mortgage formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = r === 0
      ? P / totalPayments
      : (P * r * Math.pow(1 + r, totalPayments)) / (Math.pow(1 + r, totalPayments) - 1);

    // Generate amortization schedule
    const amortization: AmortizationRow[] = [];
    let remainingBalance = P;

    for (let month = 1; month <= totalPayments; month++) {
      const interestPayment = remainingBalance * r;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      // Prevent negative balance due to floating point errors
      if (remainingBalance < 0.01) remainingBalance = 0;

      amortization.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance,
      });
    }

    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - P;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      amortization,
    });
    setShowFullSchedule(false);
  };

  const displayedSchedule = result
    ? showFullSchedule
      ? result.amortization
      : result.amortization.slice(0, 12)
    : [];

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Mortgage Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Calculate your monthly mortgage payment and view a detailed amortization schedule.
          </p>
        </div>

        <AdsSlot placement="top" slot="top-mortgage" />

        <CalculatorShell
          title="Calculate Your Mortgage"
          description="Enter your loan details below"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="principal">Loan Amount ($)</Label>
              <Input
                id="principal"
                type="number"
                placeholder="e.g., 300000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                placeholder="e.g., 6.5"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="years">Loan Term (years)</Label>
              <Input
                id="years"
                type="number"
                placeholder="e.g., 30"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>

            <Button onClick={calculateMortgage} className="w-full">
              Calculate Monthly Payment
            </Button>
          </div>
        </CalculatorShell>

        {result && (
          <div className="mt-8 space-y-6">
            <ResultCard title="Your Monthly Payment">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Monthly Payment
                  </h3>
                  <div className="text-3xl font-bold text-primary">
                    ${formatNumber(result.monthlyPayment)}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Total Payment
                  </h3>
                  <div className="text-2xl font-bold">
                    ${formatNumber(result.totalPayment)}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Total Interest
                  </h3>
                  <div className="text-2xl font-bold text-orange-600">
                    ${formatNumber(result.totalInterest)}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Breakdown:</h3>
                <p className="text-sm text-muted-foreground">
                  Over {years} years, you'll pay a total of ${formatNumber(result.totalPayment)},
                  which includes ${formatNumber(parseFloat(principal))} in principal and ${formatNumber(result.totalInterest)} in interest.
                </p>
              </div>
            </ResultCard>

            <ResultCard title="Amortization Schedule" animate={false}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Month</th>
                      <th className="text-right py-2 px-2">Payment</th>
                      <th className="text-right py-2 px-2">Principal</th>
                      <th className="text-right py-2 px-2">Interest</th>
                      <th className="text-right py-2 px-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedSchedule.map((row) => (
                      <tr key={row.month} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-2">{row.month}</td>
                        <td className="text-right py-2 px-2">
                          ${formatNumber(row.payment)}
                        </td>
                        <td className="text-right py-2 px-2 text-green-600">
                          ${formatNumber(row.principal)}
                        </td>
                        <td className="text-right py-2 px-2 text-orange-600">
                          ${formatNumber(row.interest)}
                        </td>
                        <td className="text-right py-2 px-2 font-semibold">
                          ${formatNumber(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {result.amortization.length > 12 && (
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowFullSchedule(!showFullSchedule)}
                  >
                    {showFullSchedule
                      ? "Show First Year Only"
                      : `Show All ${result.amortization.length} Months`}
                  </Button>
                </div>
              )}

              <div className="mt-4 text-xs text-muted-foreground">
                <p>
                  This amortization schedule shows how each monthly payment is split between principal
                  and interest, along with the remaining loan balance.
                </p>
              </div>
            </ResultCard>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Understanding Your Mortgage</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              A mortgage is a loan used to purchase real estate, typically a home. The loan is secured
              by the property itself, meaning if you fail to make payments, the lender can foreclose
              and take possession of the property.
            </p>

            <h3>How Mortgage Payments Work</h3>
            <p>
              Your monthly mortgage payment is calculated using the loan amount (principal), interest rate,
              and loan term. Each payment includes both principal and interest. Early in the loan, most of
              your payment goes toward interest. Over time, more goes toward paying down the principal.
            </p>

            <h3>Key Terms:</h3>
            <ul>
              <li><strong>Principal:</strong> The amount you borrow</li>
              <li><strong>Interest Rate:</strong> The annual cost of borrowing, expressed as a percentage</li>
              <li><strong>Loan Term:</strong> The number of years to repay the loan (typically 15 or 30 years)</li>
              <li><strong>Amortization:</strong> The process of gradually paying off the loan through regular payments</li>
            </ul>

            <h3>Tips for Mortgage Shoppers:</h3>
            <ul>
              <li>A larger down payment reduces your monthly payment and total interest paid</li>
              <li>Shorter loan terms mean higher monthly payments but much less interest over time</li>
              <li>Even a small difference in interest rate can save thousands over the life of the loan</li>
              <li>Consider property taxes, insurance, and HOA fees in your total housing budget</li>
            </ul>
          </div>
        </div>

        <AdsSlot placement="bottom" slot="bottom-mortgage" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Mortgage Calculator",
              applicationCategory: "FinanceApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description: "Calculate monthly mortgage payments and view detailed amortization schedules. Free mortgage calculator with step-by-step breakdown.",
            }),
          }}
        />
      </div>
    </div>
  );
}
