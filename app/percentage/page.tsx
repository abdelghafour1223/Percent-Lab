"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/calculator-shell";
import { ResultCard } from "@/components/result-card";
import { AdsSlot } from "@/components/ads-slot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

type CalculationType = "basic" | "increase" | "decrease" | "reverse";

interface PercentageResult {
  result: number;
  steps: string[];
  chartData?: { name: string; value: number; color: string }[];
}

export default function PercentageCalculatorPage() {
  const [percentage, setPercentage] = useState("");
  const [number, setNumber] = useState("");
  const [originalValue, setOriginalValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [partValue, setPartValue] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [result, setResult] = useState<PercentageResult | null>(null);
  const [calculationType, setCalculationType] = useState<CalculationType>("basic");

  const calculateBasic = () => {
    const p = parseFloat(percentage);
    const n = parseFloat(number);
    if (isNaN(p) || isNaN(n)) return;

    const res = (p / 100) * n;
    setResult({
      result: res,
      steps: [
        `Convert percentage to decimal: ${p}% = ${p / 100}`,
        `Multiply by the number: ${p / 100} × ${n} = ${formatNumber(res)}`,
        `Therefore, ${p}% of ${n} is ${formatNumber(res)}`,
      ],
      chartData: [
        { name: `${p}%`, value: res, color: "#3b82f6" },
        { name: "Remaining", value: n - res, color: "#e5e7eb" },
      ],
    });
  };

  const calculateIncrease = () => {
    const orig = parseFloat(originalValue);
    const newVal = parseFloat(newValue);
    if (isNaN(orig) || isNaN(newVal)) return;

    const increase = newVal - orig;
    const percentIncrease = (increase / orig) * 100;
    setResult({
      result: percentIncrease,
      steps: [
        `Calculate the increase: ${newVal} - ${orig} = ${formatNumber(increase)}`,
        `Divide by original value: ${formatNumber(increase)} ÷ ${orig} = ${formatNumber(increase / orig)}`,
        `Multiply by 100: ${formatNumber(increase / orig)} × 100 = ${formatNumber(percentIncrease)}%`,
        `The percentage increase is ${formatNumber(percentIncrease)}%`,
      ],
      chartData: [
        { name: "Original", value: orig, color: "#3b82f6" },
        { name: "Increase", value: increase, color: "#10b981" },
      ],
    });
  };

  const calculateDecrease = () => {
    const orig = parseFloat(originalValue);
    const newVal = parseFloat(newValue);
    if (isNaN(orig) || isNaN(newVal)) return;

    const decrease = orig - newVal;
    const percentDecrease = (decrease / orig) * 100;
    setResult({
      result: percentDecrease,
      steps: [
        `Calculate the decrease: ${orig} - ${newVal} = ${formatNumber(decrease)}`,
        `Divide by original value: ${formatNumber(decrease)} ÷ ${orig} = ${formatNumber(decrease / orig)}`,
        `Multiply by 100: ${formatNumber(decrease / orig)} × 100 = ${formatNumber(percentDecrease)}%`,
        `The percentage decrease is ${formatNumber(percentDecrease)}%`,
      ],
      chartData: [
        { name: "New Value", value: newVal, color: "#3b82f6" },
        { name: "Decrease", value: decrease, color: "#ef4444" },
      ],
    });
  };

  const calculateReverse = () => {
    const part = parseFloat(partValue);
    const total = parseFloat(totalValue);
    if (isNaN(part) || isNaN(total) || total === 0) return;

    const percentResult = (part / total) * 100;
    setResult({
      result: percentResult,
      steps: [
        `Divide the part by the whole: ${part} ÷ ${total} = ${formatNumber(part / total)}`,
        `Multiply by 100: ${formatNumber(part / total)} × 100 = ${formatNumber(percentResult)}%`,
        `Therefore, ${part} is ${formatNumber(percentResult)}% of ${total}`,
      ],
      chartData: [
        { name: "Part", value: part, color: "#3b82f6" },
        { name: "Remaining", value: total - part, color: "#e5e7eb" },
      ],
    });
  };

  const handleCalculate = () => {
    setResult(null);
    setTimeout(() => {
      switch (calculationType) {
        case "basic":
          calculateBasic();
          break;
        case "increase":
          calculateIncrease();
          break;
        case "decrease":
          calculateDecrease();
          break;
        case "reverse":
          calculateReverse();
          break;
      }
    }, 50);
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Percentage Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Calculate percentages, percentage changes, and reverse percentages with step-by-step
            explanations.
          </p>
        </div>

        <AdsSlot placement="top" slot="top-percentage" />

        <CalculatorShell
          title="Calculate Percentages"
          description="Choose a calculation type and enter your values"
        >
          <Tabs
            value={calculationType}
            onValueChange={(v) => {
              setCalculationType(v as CalculationType);
              setResult(null);
            }}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="increase">Increase</TabsTrigger>
              <TabsTrigger value="decrease">Decrease</TabsTrigger>
              <TabsTrigger value="reverse">Reverse</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div>
                <Label htmlFor="percentage">Percentage (%)</Label>
                <Input
                  id="percentage"
                  type="number"
                  placeholder="e.g., 25"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="number">Of Number</Label>
                <Input
                  id="number"
                  type="number"
                  placeholder="e.g., 200"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <Button onClick={handleCalculate} className="w-full">
                Calculate
              </Button>
            </TabsContent>

            <TabsContent value="increase" className="space-y-4">
              <div>
                <Label htmlFor="originalInc">Original Value</Label>
                <Input
                  id="originalInc"
                  type="number"
                  placeholder="e.g., 100"
                  value={originalValue}
                  onChange={(e) => setOriginalValue(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="newInc">New Value</Label>
                <Input
                  id="newInc"
                  type="number"
                  placeholder="e.g., 125"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
              </div>
              <Button onClick={handleCalculate} className="w-full">
                Calculate % Increase
              </Button>
            </TabsContent>

            <TabsContent value="decrease" className="space-y-4">
              <div>
                <Label htmlFor="originalDec">Original Value</Label>
                <Input
                  id="originalDec"
                  type="number"
                  placeholder="e.g., 100"
                  value={originalValue}
                  onChange={(e) => setOriginalValue(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="newDec">New Value</Label>
                <Input
                  id="newDec"
                  type="number"
                  placeholder="e.g., 75"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
              </div>
              <Button onClick={handleCalculate} className="w-full">
                Calculate % Decrease
              </Button>
            </TabsContent>

            <TabsContent value="reverse" className="space-y-4">
              <div>
                <Label htmlFor="part">Part Value</Label>
                <Input
                  id="part"
                  type="number"
                  placeholder="e.g., 50"
                  value={partValue}
                  onChange={(e) => setPartValue(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="total">Total Value</Label>
                <Input
                  id="total"
                  type="number"
                  placeholder="e.g., 200"
                  value={totalValue}
                  onChange={(e) => setTotalValue(e.target.value)}
                />
              </div>
              <Button onClick={handleCalculate} className="w-full">
                Calculate Percentage
              </Button>
            </TabsContent>
          </Tabs>
        </CalculatorShell>

        {result && (
          <div className="mt-8 space-y-6">
            <ResultCard title="Result">
              <div className="text-4xl font-bold text-primary mb-4">
                {formatNumber(result.result)}
                {calculationType !== "basic" && "%"}
              </div>

              <div className="space-y-2 mb-6">
                <h3 className="font-semibold text-lg">Step-by-Step Solution:</h3>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  {result.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              {result.chartData && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-4">Visual Representation:</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={result.chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {result.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </ResultCard>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">How to Use the Percentage Calculator</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Our percentage calculator helps you solve four common types of percentage problems:
            </p>
            <ul>
              <li>
                <strong>Basic:</strong> Find what is X% of Y (e.g., What is 25% of 200?)
              </li>
              <li>
                <strong>Increase:</strong> Calculate percentage increase between two values
              </li>
              <li>
                <strong>Decrease:</strong> Calculate percentage decrease between two values
              </li>
              <li>
                <strong>Reverse:</strong> Find what percentage X is of Y (e.g., 50 is what % of
                200?)
              </li>
            </ul>
          </div>
        </div>

        <AdsSlot placement="bottom" slot="bottom-percentage" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Percentage Calculator",
              applicationCategory: "UtilitiesApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "Free percentage calculator with step-by-step explanations. Calculate percentages, percentage changes, and reverse percentages.",
            }),
          }}
        />
      </div>
    </div>
  );
}
