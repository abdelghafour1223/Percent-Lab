export const metadata = {
  title: "Privacy Policy",
  description: "PercentLab Privacy Policy - Learn how we protect your privacy and handle data.",
};

export default function PrivacyPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            At PercentLab ("we", "our", or "us"), we take your privacy seriously. This Privacy Policy
            explains how we collect, use, and protect information when you use our website and services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Calculation Data</h3>
          <p>
            All calculations you perform using our calculators (percentage, BMI, mortgage) are processed
            entirely in your web browser. We do not collect, store, or transmit any of your calculation
            data to our servers.
          </p>

          <h3>Analytics Data</h3>
          <p>
            We use Vercel Analytics and Google Analytics to understand how visitors use our site. This
            includes:
          </p>
          <ul>
            <li>Pages you visit</li>
            <li>Time spent on the site</li>
            <li>Browser type and version</li>
            <li>Device type</li>
            <li>Geographic location (country/city level)</li>
            <li>Referring websites</li>
          </ul>
          <p>
            This data is anonymized and used solely to improve our services.
          </p>

          <h3>Cookies</h3>
          <p>
            We use cookies for:
          </p>
          <ul>
            <li>Analytics (Google Analytics, Vercel Analytics)</li>
            <li>Theme preferences (dark/light mode)</li>
            <li>Advertising (Google AdSense)</li>
          </ul>
          <p>
            You can disable cookies in your browser settings, though this may affect site functionality.
          </p>

          <h2>Third-Party Services</h2>
          <h3>Google Analytics</h3>
          <p>
            We use Google Analytics to analyze website traffic. Google Analytics may collect information
            about your use of our site. For more information, see{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google's Privacy Policy
            </a>
            .
          </p>

          <h3>Google AdSense</h3>
          <p>
            We display advertisements through Google AdSense. Google may use cookies to serve ads based
            on your prior visits to our website or other websites. For more information, see{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              Google's Advertising Privacy Policy
            </a>
            .
          </p>

          <h3>Vercel Analytics</h3>
          <p>
            We use Vercel Analytics for privacy-friendly analytics. Vercel does not use cookies and
            respects Do Not Track settings. For more information, see{" "}
            <a href="https://vercel.com/docs/concepts/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
              Vercel's Privacy Policy
            </a>
            .
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information.
            However, no method of transmission over the internet is 100% secure, and we cannot guarantee
            absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of analytics tracking using browser settings or extensions</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our service is not directed to children under 13. We do not knowingly collect personal
            information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@percentlab.app">privacy@percentlab.app</a>
          </p>
        </div>
      </div>
    </div>
  );
}
