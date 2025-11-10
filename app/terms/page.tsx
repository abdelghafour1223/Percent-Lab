export const metadata = {
  title: "Terms of Service",
  description: "PercentLab Terms of Service - Rules and guidelines for using our calculators.",
};

export default function TermsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using PercentLab ("Service"), you accept and agree to be bound by the
            terms and provisions of this agreement. If you do not agree to these Terms of Service,
            please do not use the Service.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to use the Service for personal and commercial purposes, subject to
            the following restrictions:
          </p>
          <ul>
            <li>You must not misuse or abuse the Service</li>
            <li>You must not attempt to reverse engineer or scrape the Service</li>
            <li>You must not use the Service for any illegal purpose</li>
            <li>You must not overload our servers with automated requests</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            <strong>The Service is provided "as is" without warranties of any kind.</strong>
          </p>
          <ul>
            <li>
              <strong>Accuracy:</strong> While we strive for accuracy, we do not guarantee that all
              calculations are error-free. Always verify important calculations independently.
            </li>
            <li>
              <strong>Medical Information:</strong> The BMI calculator provides estimates for
              informational purposes only and should not be used for medical diagnosis or treatment.
              Always consult with qualified healthcare professionals.
            </li>
            <li>
              <strong>Financial Information:</strong> The mortgage calculator provides estimates
              only. Actual loan terms may vary. Consult with financial professionals before making
              financial decisions.
            </li>
          </ul>

          <h2>4. Limitations of Liability</h2>
          <p>
            PercentLab shall not be liable for any damages arising from the use or inability to use
            the Service, including but not limited to:
          </p>
          <ul>
            <li>Direct, indirect, incidental, or consequential damages</li>
            <li>Loss of profits or data</li>
            <li>Business interruption</li>
            <li>Financial losses based on calculator results</li>
          </ul>

          <h2>5. User Responsibilities</h2>
          <p>
            You are responsible for:
          </p>
          <ul>
            <li>Verifying the accuracy of calculator results for your specific use case</li>
            <li>Consulting professionals for important financial or health decisions</li>
            <li>Understanding that calculators provide estimates, not guarantees</li>
            <li>Using the Service in compliance with all applicable laws</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>
            The Service, including all content, features, and functionality, is owned by PercentLab
            and is protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h2>7. Third-Party Services</h2>
          <p>
            Our Service may contain links to third-party websites or services (such as advertising
            networks) that are not owned or controlled by PercentLab. We have no control over and
            assume no responsibility for the content, privacy policies, or practices of any third-party
            websites or services.
          </p>

          <h2>8. Modifications to Service</h2>
          <p>
            We reserve the right to:
          </p>
          <ul>
            <li>Modify or discontinue the Service at any time without notice</li>
            <li>Update these Terms of Service at any time</li>
            <li>Change features, functionality, or pricing (if applicable in the future)</li>
          </ul>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United
            States, without regard to its conflict of law provisions.
          </p>

          <h2>10. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision
            shall be limited or eliminated to the minimum extent necessary so that these Terms shall
            otherwise remain in full force and effect.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to us at{" "}
            <a href="mailto:legal@percentlab.app">legal@percentlab.app</a>
          </p>

          <h2>12. Entire Agreement</h2>
          <p>
            These Terms constitute the entire agreement between you and PercentLab regarding the use
            of the Service, superseding any prior agreements.
          </p>
        </div>
      </div>
    </div>
  );
}
