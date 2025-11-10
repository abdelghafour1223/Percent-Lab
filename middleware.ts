import { NextRequest, NextResponse } from "next/server";

/**
 * Edge middleware for geo-blocking
 * Blocks access from Arabic countries with 451 status
 * Always allows known search engine bots
 */

// ISO country codes to block (Arabic countries)
const BLOCKED_COUNTRIES = new Set([
  "MA", // Morocco
  "DZ", // Algeria
  "TN", // Tunisia
  "LY", // Libya
  "EG", // Egypt
  "SD", // Sudan
  "SO", // Somalia
  "MR", // Mauritania
  "EH", // Western Sahara
  "SA", // Saudi Arabia
  "AE", // United Arab Emirates
  "QA", // Qatar
  "KW", // Kuwait
  "BH", // Bahrain
  "OM", // Oman
  "YE", // Yemen
  "IQ", // Iraq
  "SY", // Syria
  "JO", // Jordan
  "LB", // Lebanon
  "PS", // Palestine
  "DJ", // Djibouti
  "KM", // Comoros
]);

// Known bot user agents (case-insensitive patterns)
const BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i, // Yahoo
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /rogerbot/i, // Moz
  /linkedinbot/i,
  /embedly/i,
  /quora link preview/i,
  /showyoubot/i,
  /outbrain/i,
  /pinterest/i,
  /slackbot/i,
  /vkshare/i,
  /w3c_validator/i,
  /redditbot/i,
  /applebot/i,
  /whatsapp/i,
  /flipboard/i,
  /tumblr/i,
  /bitlybot/i,
  /skypeuripreview/i,
  /nuzzel/i,
  /discordbot/i,
  /qwantify/i,
  /pinterestbot/i,
  /telegrambot/i,
];

/**
 * Check if the user agent is a known bot
 */
function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

export function middleware(request: NextRequest) {
  // Get country code from Vercel's geo headers
  // Note: request.geo is only available on Vercel Edge Runtime
  const country = (request as any).geo?.country || request.headers.get("x-vercel-ip-country");
  const userAgent = request.headers.get("user-agent");

  // Allow bots regardless of location
  if (isBot(userAgent)) {
    return NextResponse.next();
  }

  // Check if country is blocked
  if (country && BLOCKED_COUNTRIES.has(country.toUpperCase())) {
    // Return 451 Unavailable For Legal Reasons
    const response = new NextResponse(
      `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Service Unavailable</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .container {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      max-width: 500px;
    }
    h1 { color: #333; margin-bottom: 1rem; }
    p { color: #666; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Service Unavailable</h1>
    <p>We're sorry, but this service is not available in your region.</p>
    <p>Error Code: 451</p>
  </div>
</body>
</html>
      `.trim(),
      {
        status: 451,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow",
        },
      }
    );

    return response;
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (robots.txt, sitemap.xml, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|robots.txt|sitemap).*)",
  ],
};
