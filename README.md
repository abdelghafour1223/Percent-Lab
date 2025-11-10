# PercentLab - Professional Calculator Tools

A production-ready Next.js 15 application providing free online calculators for percentage, BMI, and mortgage calculations. Built with TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Three Professional Calculators:**
  - Percentage Calculator with step-by-step explanations and visual charts
  - BMI & Body Fat Calculator with Navy method estimation
  - Mortgage Calculator with amortization schedules

- **Programmatic SEO:**
  - ~100 pre-generated pages for common percentage queries
  - Dynamic routing for "what is X% of Y" queries
  - Optimized for search engines

- **Performance & SEO:**
  - Next.js 15 App Router with Edge Runtime
  - Automatic sitemap generation
  - Structured data (Schema.org)
  - Fast page loads (target LCP < 2.0s)

- **Geo-blocking:**
  - Edge middleware blocking 23 Arabic country codes
  - Always allows search engine bots
  - Returns 451 status with noindex headers

- **User Experience:**
  - Dark/Light mode toggle
  - Fully responsive design
  - Client-side calculations (privacy-first)
  - Framer Motion animations

- **Analytics & Monetization:**
  - Vercel Analytics integration
  - Google Analytics 4 support
  - Google AdSense placeholder components

## 📋 Prerequisites

- Node.js 18.17.0 or higher
- npm, yarn, or pnpm
- A Vercel account (for deployment)

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Percent-Lab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Edit `.env.local` with your values:**
   ```env
   # Google Analytics (optional)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

   # Google AdSense (optional)
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX

   # Site URL (required for sitemap)
   SITE_URL=https://percentlab.app
   ```

## 🏃 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## 📦 Build

Build the application for production:

```bash
npm run build
```

This will:
1. Build the Next.js application
2. Generate static pages for pSEO routes
3. Run the `postbuild` script to generate sitemap

## 🌐 Deployment to Vercel

### Method 1: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Method 2: GitHub Integration

1. Push your code to GitHub
2. Import the project in Vercel dashboard
3. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_ADSENSE_CLIENT`
   - `SITE_URL`
4. Deploy

### Method 3: Git Push (Current Setup)

Since you're on the `claude/percentlab-nextjs-app-*` branch:

```bash
# Commit your changes
git add .
git commit -m "feat: complete percentlab application"

# Push to remote
git push -u origin claude/percentlab-nextjs-app-011CUzxxJFBxkp4Q39tvTka4
```

Then create a pull request to merge into main/master branch.

## 🔒 Environment Variables

Create a `.env.local` file with the following variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID | Optional |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense Publisher ID | Optional |
| `SITE_URL` | Your production domain URL | Yes |

### Setting up Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Setting up Google AdSense

1. Sign up for [Google AdSense](https://www.google.com/adsense/)
2. Get approved for your domain
3. Get your Publisher ID (format: `ca-pub-XXXXXXXXXX`)
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX
   ```
5. **Add AdSense script to your site:**

   In production, add this script to `app/layout.tsx` in the `<head>` section:
   ```html
   <script
     async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"
   ></script>
   ```

   Replace `XXXXXXXXXX` with your actual AdSense Publisher ID.

6. **Configure Ad Units:**
   - Log into your AdSense account
   - Create ad units for each placement (top, bottom)
   - Update the `slot` props in `<AdsSlot />` components with your actual slot IDs

## 🗂️ Project Structure

```
Percent-Lab/
├── app/
│   ├── (pages)
│   │   ├── page.tsx              # Home page
│   │   ├── percentage/page.tsx   # Percentage calculator
│   │   ├── bmi/page.tsx          # BMI calculator
│   │   ├── mortgage/page.tsx     # Mortgage calculator
│   │   ├── about/page.tsx        # About page
│   │   ├── privacy/page.tsx      # Privacy policy
│   │   └── terms/page.tsx        # Terms of service
│   ├── pseo/[slug]/page.tsx      # pSEO dynamic route
│   ├── layout.tsx                # Root layout
│   ├── providers.tsx             # App providers
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── ads-slot.tsx              # AdSense component
│   ├── calculator-shell.tsx      # Calculator wrapper
│   ├── result-card.tsx           # Result display
│   ├── header.tsx                # Site header
│   ├── footer.tsx                # Site footer
│   └── theme-toggle.tsx          # Dark mode toggle
├── lib/
│   ├── utils.ts                  # Utility functions
│   ├── pseo-generator.ts         # pSEO slug generator
│   └── seo.ts                    # SEO helpers
├── middleware.ts                 # Edge middleware (geo-blocking)
├── next.config.js                # Next.js configuration
├── next-sitemap.config.js        # Sitemap configuration
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🎨 Customization

### Changing Theme Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Change primary color */
  /* ... other colors */
}
```

### Adding More pSEO Pages

Edit `lib/pseo-generator.ts`:

```typescript
// Add more percentage/number combinations
const popularPercentages = [5, 10, 15, 20, 25, /* add more */];
const popularNumbers = [50, 100, 200, /* add more */];
```

Then rebuild to regenerate static pages.

### Modifying Geo-blocking

Edit `middleware.ts` to change blocked countries:

```typescript
const BLOCKED_COUNTRIES = new Set([
  "MA", "DZ", // Add or remove country codes
]);
```

## 🔍 SEO Optimization

### Sitemap

The sitemap is automatically generated after each build. It will be available at:
- `/sitemap.xml` - Main sitemap
- `/sitemap-0.xml` - Pages sitemap

### Robots.txt

Generated automatically at `/robots.txt`

### Structured Data

Structured data (Schema.org) is included on:
- Home page (WebApplication, FAQPage)
- Calculator pages (SoftwareApplication)
- pSEO pages (FAQPage, Article)

## 🧪 Testing

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Build Test

```bash
npm run build
npm run start
```

Then test the production build at `http://localhost:3000`

## 📊 Performance Optimization

The application is optimized for performance:

- **Edge Runtime** for middleware and suitable routes
- **Static Generation** for pSEO pages
- **Client-side calculations** to reduce server load
- **No images** on initial load for faster LCP
- **Code splitting** with Next.js automatic optimization
- **Minimal JavaScript** for core functionality

Target metrics:
- LCP (Largest Contentful Paint): < 2.0s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## 🛡️ Security Features

- **CSP Headers** configured in `next.config.js`
- **Geo-blocking** via Edge middleware
- **No data storage** - all calculations client-side
- **XSS Protection** headers
- **Frame protection** headers

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary. All rights reserved.

## 📧 Contact

For questions or support, contact: hello@percentlab.app

## 🙏 Acknowledgments

- Built with [Next.js 15](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts from [Recharts](https://recharts.org/)
- Animations from [Framer Motion](https://www.framer.com/motion/)

---

**Built with ❤️ for the community**
