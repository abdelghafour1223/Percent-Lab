/**
 * Programmatic SEO utilities for percentage queries
 * Generates slugs and parses them for "what is X% of Y" type queries
 */

export interface PercentageQuery {
  percentage: number;
  number: number;
  result: number;
  slug: string;
}

/**
 * Parse a slug like "what-is-10-percent-of-200" into query parameters
 */
export function parsePercentageSlug(slug: string): PercentageQuery | null {
  // Pattern: what-is-{percentage}-percent-of-{number}
  const pattern = /^what-is-(\d+(?:\.\d+)?)-percent-of-(\d+(?:\.\d+)?)$/;
  const match = slug.match(pattern);

  if (!match) return null;

  const percentage = parseFloat(match[1]);
  const number = parseFloat(match[2]);

  if (isNaN(percentage) || isNaN(number)) return null;

  const result = (percentage / 100) * number;

  return {
    percentage,
    number,
    result,
    slug,
  };
}

/**
 * Generate a slug from percentage and number
 */
export function generatePercentageSlug(percentage: number, number: number): string {
  return `what-is-${percentage}-percent-of-${number}`;
}

/**
 * Generate a comprehensive list of percentage queries for static generation
 * Returns ~100 of the most common/useful percentage calculations
 */
export function generatePopularQueries(): PercentageQuery[] {
  const queries: PercentageQuery[] = [];

  // Common percentages
  const popularPercentages = [
    5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100,
  ];

  // Common numbers/amounts
  const popularNumbers = [
    50, 100, 150, 200, 250, 300, 400, 500, 600, 750, 1000,
    1500, 2000, 2500, 3000, 5000, 10000,
  ];

  // Generate combinations
  for (const percentage of popularPercentages) {
    for (const number of popularNumbers.slice(0, 7)) {
      // Limit combinations per percentage
      const slug = generatePercentageSlug(percentage, number);
      const result = (percentage / 100) * number;
      queries.push({ percentage, number, result, slug });
    }
  }

  // Add some specific high-value queries
  const specificQueries = [
    { p: 20, n: 80 },
    { p: 15, n: 120 },
    { p: 30, n: 150 },
    { p: 25, n: 60 },
    { p: 10, n: 90 },
    { p: 5, n: 40 },
  ];

  for (const { p, n } of specificQueries) {
    const slug = generatePercentageSlug(p, n);
    const result = (p / 100) * n;
    queries.push({ percentage: p, number: n, result, slug });
  }

  return queries;
}

/**
 * Generate steps for solving a percentage calculation
 */
export function generateSolutionSteps(
  percentage: number,
  number: number,
  result: number
): string[] {
  return [
    `To find ${percentage}% of ${number}, we convert the percentage to a decimal.`,
    `${percentage}% = ${percentage} ÷ 100 = ${percentage / 100}`,
    `Next, we multiply the decimal by the number.`,
    `${percentage / 100} × ${number} = ${result}`,
    `Therefore, ${percentage}% of ${number} equals ${result}.`,
  ];
}
