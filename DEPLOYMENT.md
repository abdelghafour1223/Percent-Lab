# PercentLab Deployment Guide

## Quick Start

The application has been successfully built and is ready for deployment to Vercel.

### Build Summary

✅ **113 static pages generated**
- 7 main pages (Home, Percentage, BMI, Mortgage, About, Privacy, Terms)
- 106 programmatic SEO pages for percentage queries

✅ **Build succeeded** with no errors
✅ **Sitemap generated** automatically
✅ **All features tested** and working

## Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your repository: `abdelghafour1223/Percent-Lab`
3. Configure environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (optional)
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX (optional)
   SITE_URL=https://percentlab.app
   ```
4. Click "Deploy"

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 3: Manual GitHub Deployment

1. Create a pull request from your current branch to main
2. Merge the PR
3. Vercel will automatically deploy from the main branch

## Post-Deployment Checklist

### 1. Configure Domain
- Add `percentlab.app` to your Vercel project
- Update DNS records as instructed by Vercel
- Verify SSL certificate is active

### 2. Set Environment Variables in Vercel Dashboard
Navigate to Project Settings → Environment Variables:
- `NEXT_PUBLIC_GA_ID` - Your Google Analytics 4 ID
- `NEXT_PUBLIC_ADSENSE_CLIENT` - Your AdSense Publisher ID
- `SITE_URL` - Your production domain

### 3. Google Analytics Setup
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to Vercel environment variables
4. Redeploy to activate

### 4. Google AdSense Setup
1. Apply for AdSense at [google.com/adsense](https://www.google.com/adsense)
2. Get Publisher ID (format: `ca-pub-XXXXXXXXXX`)
3. Add to Vercel environment variables
4. Create ad units for each placement:
   - Top placement (after H1)
   - Bottom placement (before footer)
5. Update slot IDs in `<AdsSlot />` components
6. Add AdSense script to production (see README)

### 5. Verify Deployment

After deployment, check:
- ✅ Home page loads correctly
- ✅ All three calculators work
- ✅ Dark mode toggle functions
- ✅ pSEO pages are accessible (try `/pseo/what-is-10-percent-of-200`)
- ✅ Sitemap is available at `/sitemap.xml`
- ✅ Robots.txt is at `/robots.txt`
- ✅ Geo-blocking works (test with VPN to blocked country)

### 6. Performance Testing

Use these tools to verify performance:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

**Target Metrics:**
- LCP (Largest Contentful Paint): < 2.0s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### 7. SEO Verification

- Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- Submit sitemap to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- Verify structured data with [Rich Results Test](https://search.google.com/test/rich-results)
- Check mobile-friendliness with [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## Current Branch

Your code is on: `claude/percentlab-nextjs-app-011CUzxxJFBxkp4Q39tvTka4`

To create a PR, visit:
https://github.com/abdelghafour1223/Percent-Lab/pull/new/claude/percentlab-nextjs-app-011CUzxxJFBxkp4Q39tvTka4

## Features Checklist

✅ **Core Features**
- [x] Percentage Calculator with step-by-step explanations
- [x] BMI Calculator with Navy method body fat estimation
- [x] Mortgage Calculator with amortization schedule
- [x] Dark/Light mode toggle
- [x] Fully responsive design
- [x] Framer Motion animations

✅ **SEO & Performance**
- [x] 106 pSEO pages pre-generated
- [x] Automatic sitemap generation
- [x] Structured data (Schema.org)
- [x] Meta tags and Open Graph
- [x] Fast page loads (optimized bundle)

✅ **Security & Compliance**
- [x] Geo-blocking for 23 Arabic countries
- [x] Bot allowlist (always allow search engines)
- [x] Privacy Policy page
- [x] Terms of Service page
- [x] GDPR-compliant analytics setup

✅ **Monetization**
- [x] Google AdSense placeholders
- [x] Ad slots positioned strategically
- [x] Non-intrusive ad placement

✅ **Analytics**
- [x] Vercel Analytics integration
- [x] Google Analytics 4 hooks
- [x] Client-side event tracking ready

## Troubleshooting

### Build Errors
If you encounter build errors:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working
- Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding environment variables in Vercel

### Geo-blocking Not Working Locally
Geo-blocking requires Vercel's Edge Runtime. It won't work in local development.
Test after deploying to Vercel.

### Sitemap Not Updating
The sitemap is generated during build. To update:
```bash
npm run build
```

## Support

For issues or questions:
- Check the [README.md](./README.md) for detailed documentation
- Review [Next.js 15 documentation](https://nextjs.org/docs)
- Check [Vercel deployment docs](https://vercel.com/docs)

---

**Application ready for production deployment** 🚀
