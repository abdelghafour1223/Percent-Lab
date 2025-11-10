import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Heart, Shield } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn about PercentLab and our mission to provide free, accurate calculation tools for everyone.",
};

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">About PercentLab</h1>

        <div className="prose dark:prose-invert max-w-none mb-8">
          <p className="text-lg">
            PercentLab is a free online platform providing professional-grade calculators for everyday
            mathematical needs. Our mission is to make accurate calculations accessible to everyone,
            without requiring sign-ups, subscriptions, or downloads.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <Calculator className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Accurate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All our calculators use industry-standard formulas and are thoroughly tested for accuracy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Heart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Free Forever</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No hidden fees, no premium plans. All features are completely free to use.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Privacy First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All calculations happen in your browser. We don't collect or store your data.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Our Tools</h2>
          <p>
            We currently offer three main calculators:
          </p>
          <ul>
            <li>
              <strong>Percentage Calculator:</strong> Calculate percentages, percentage changes,
              and reverse percentages with step-by-step explanations.
            </li>
            <li>
              <strong>BMI Calculator:</strong> Calculate your Body Mass Index and estimate body fat
              percentage using the U.S. Navy method.
            </li>
            <li>
              <strong>Mortgage Calculator:</strong> Calculate monthly mortgage payments and view
              detailed amortization schedules.
            </li>
          </ul>

          <h2>Our Commitment</h2>
          <p>
            We're committed to providing tools that are:
          </p>
          <ul>
            <li>Fast and responsive on all devices</li>
            <li>Easy to understand with clear explanations</li>
            <li>Accessible to everyone, regardless of technical skill</li>
            <li>Continuously improved based on user feedback</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            Have feedback or suggestions? We'd love to hear from you. Contact us at{" "}
            <a href="mailto:hello@percentlab.app">hello@percentlab.app</a>
          </p>
        </div>
      </div>
    </div>
  );
}
