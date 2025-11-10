import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://percentlab.app"),
  title: {
    default: "PercentLab - Professional Calculator Tools",
    template: "%s | PercentLab",
  },
  description:
    "Free online calculators for percentage, BMI, and mortgage calculations. Fast, accurate, and easy to use.",
  keywords: [
    "percentage calculator",
    "BMI calculator",
    "mortgage calculator",
    "online calculator",
    "math tools",
  ],
  authors: [{ name: "PercentLab" }],
  creator: "PercentLab",
  publisher: "PercentLab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://percentlab.app",
    title: "PercentLab - Professional Calculator Tools",
    description:
      "Free online calculators for percentage, BMI, and mortgage calculations. Fast, accurate, and easy to use.",
    siteName: "PercentLab",
  },
  twitter: {
    card: "summary_large_image",
    title: "PercentLab - Professional Calculator Tools",
    description:
      "Free online calculators for percentage, BMI, and mortgage calculations. Fast, accurate, and easy to use.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics - Replace GA_MEASUREMENT_ID with your actual ID */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
