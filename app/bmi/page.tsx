"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/calculator-shell";
import { ResultCard } from "@/components/result-card";
import { AdsSlot } from "@/components/ads-slot";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNumber } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";

interface BMIResult {
  bmi: number;
  category: string;
  bodyFat?: number;
  healthyWeightRange: { min: number; max: number };
}

export default function BMICalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [gender, setGender] = useState<Gender>("male");

  // BMI inputs
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  // Body fat inputs (Navy method)
  const [age, setAge] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const [result, setResult] = useState<BMIResult | null>(null);

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "Underweight": return "text-blue-600";
      case "Normal weight": return "text-green-600";
      case "Overweight": return "text-yellow-600";
      case "Obese": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const calculateBMI = () => {
    let weightKg: number;
    let heightM: number;

    if (unitSystem === "metric") {
      weightKg = parseFloat(weight);
      heightM = parseFloat(height) / 100;
    } else {
      weightKg = parseFloat(weight) * 0.453592;
      const totalInches = parseFloat(feet) * 12 + parseFloat(inches);
      heightM = totalInches * 0.0254;
    }

    if (isNaN(weightKg) || isNaN(heightM) || heightM === 0) return;

    const bmi = weightKg / (heightM * heightM);
    const category = getBMICategory(bmi);

    // Calculate healthy weight range
    const minHealthyBMI = 18.5;
    const maxHealthyBMI = 24.9;
    const minWeight = minHealthyBMI * heightM * heightM;
    const maxWeight = maxHealthyBMI * heightM * heightM;

    let bodyFat: number | undefined;

    // Calculate body fat using Navy method if all measurements provided
    if (neck && waist && (gender === "male" || hip)) {
      const neckCm = unitSystem === "metric" ? parseFloat(neck) : parseFloat(neck) * 2.54;
      const waistCm = unitSystem === "metric" ? parseFloat(waist) : parseFloat(waist) * 2.54;
      const heightCm = heightM * 100;

      if (gender === "male") {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
      } else {
        const hipCm = unitSystem === "metric" ? parseFloat(hip) : parseFloat(hip) * 2.54;
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
      }
    }

    setResult({
      bmi,
      category,
      bodyFat,
      healthyWeightRange: {
        min: unitSystem === "metric" ? minWeight : minWeight / 0.453592,
        max: unitSystem === "metric" ? maxWeight : maxWeight / 0.453592,
      },
    });
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">BMI & Body Fat Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Calculate your Body Mass Index (BMI) and estimate body fat percentage using the U.S. Navy method.
          </p>

          {/* Medical Disclaimer */}
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Medical Disclaimer</p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  This calculator provides estimates for informational purposes only and should not be used for medical diagnosis or treatment.
                  BMI and body fat calculations have limitations and may not accurately reflect health status for athletes, pregnant women,
                  elderly individuals, or people with certain medical conditions. Always consult with a qualified healthcare professional
                  for personalized medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdsSlot placement="top" slot="top-bmi" />

        <CalculatorShell title="Calculate Your BMI" description="Enter your measurements below">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Unit System</Label>
                <Select value={unitSystem} onValueChange={(v) => setUnitSystem(v as UnitSystem)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="imperial">Imperial (lb, in)</SelectItem>
                    <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Gender (for body fat)</Label>
                <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="weight">Weight ({unitSystem === "metric" ? "kg" : "lb"})</Label>
              <Input
                id="weight"
                type="number"
                placeholder={unitSystem === "metric" ? "e.g., 70" : "e.g., 154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            {unitSystem === "metric" ? (
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="feet">Feet</Label>
                  <Input
                    id="feet"
                    type="number"
                    placeholder="e.g., 5"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="inches">Inches</Label>
                  <Input
                    id="inches"
                    type="number"
                    placeholder="e.g., 9"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Body Fat Estimation (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For body fat percentage using the Navy method, provide the following measurements:
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="neck">Neck ({unitSystem === "metric" ? "cm" : "in"})</Label>
                  <Input
                    id="neck"
                    type="number"
                    placeholder={unitSystem === "metric" ? "e.g., 37" : "e.g., 15"}
                    value={neck}
                    onChange={(e) => setNeck(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="waist">Waist ({unitSystem === "metric" ? "cm" : "in"})</Label>
                  <Input
                    id="waist"
                    type="number"
                    placeholder={unitSystem === "metric" ? "e.g., 80" : "e.g., 32"}
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                  />
                </div>
                {gender === "female" && (
                  <div>
                    <Label htmlFor="hip">Hip ({unitSystem === "metric" ? "cm" : "in"})</Label>
                    <Input
                      id="hip"
                      type="number"
                      placeholder={unitSystem === "metric" ? "e.g., 95" : "e.g., 37"}
                      value={hip}
                      onChange={(e) => setHip(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <Button onClick={calculateBMI} className="w-full">
              Calculate BMI & Body Fat
            </Button>
          </div>
        </CalculatorShell>

        {result && (
          <div className="mt-8 space-y-6">
            <ResultCard title="Your Results">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Body Mass Index (BMI)</h3>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {formatNumber(result.bmi)}
                  </div>
                  <div className={`text-xl font-semibold ${getCategoryColor(result.category)}`}>
                    {result.category}
                  </div>
                </div>

                {result.bodyFat !== undefined && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Estimated Body Fat %</h3>
                    <div className="text-3xl font-bold text-primary">
                      {formatNumber(result.bodyFat)}%
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Healthy Weight Range</h3>
                  <p className="text-lg">
                    {formatNumber(result.healthyWeightRange.min)} - {formatNumber(result.healthyWeightRange.max)}{" "}
                    {unitSystem === "metric" ? "kg" : "lb"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on a healthy BMI range of 18.5 - 24.9
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">BMI Categories:</h3>
                  <ul className="space-y-1 text-sm">
                    <li><span className="text-blue-600">Underweight:</span> BMI less than 18.5</li>
                    <li><span className="text-green-600">Normal weight:</span> BMI 18.5 - 24.9</li>
                    <li><span className="text-yellow-600">Overweight:</span> BMI 25 - 29.9</li>
                    <li><span className="text-red-600">Obese:</span> BMI 30 or greater</li>
                  </ul>
                </div>
              </div>
            </ResultCard>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Understanding BMI and Body Fat</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              <strong>Body Mass Index (BMI)</strong> is a screening tool that uses your height and weight
              to estimate body fat. While widely used, it has limitations and doesn't account for muscle mass,
              bone density, or fat distribution.
            </p>
            <p>
              <strong>Body Fat Percentage</strong> provides a more accurate assessment of body composition.
              The U.S. Navy method uses circumference measurements to estimate body fat percentage. This method
              is more accurate than BMI for athletes and individuals with higher muscle mass.
            </p>
            <h3>How to Measure for Body Fat Calculation:</h3>
            <ul>
              <li><strong>Neck:</strong> Measure at the smallest circumference, just below the Adam's apple</li>
              <li><strong>Waist (Men):</strong> Measure at the navel level</li>
              <li><strong>Waist (Women):</strong> Measure at the narrowest point</li>
              <li><strong>Hip (Women only):</strong> Measure at the widest point</li>
            </ul>
          </div>
        </div>

        <AdsSlot placement="bottom" slot="bottom-bmi" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "BMI & Body Fat Calculator",
              applicationCategory: "HealthApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description: "Calculate your Body Mass Index (BMI) and body fat percentage using the U.S. Navy method. Supports both metric and imperial units.",
            }),
          }}
        />
      </div>
    </div>
  );
}
