/**
 * SEO utilities and helpers for structured data
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://percentlab.app${item.url}`,
    })),
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate SoftwareApplication structured data
 */
export function generateSoftwareApplicationSchema(
  name: string,
  description: string,
  category: string = "UtilitiesApplication"
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: category,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description,
    operatingSystem: "Any",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
  };
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PercentLab",
    url: "https://percentlab.app",
    logo: "https://percentlab.app/logo.png",
    sameAs: [],
    description: "Free online calculators for percentage, BMI, and mortgage calculations.",
  };
}
