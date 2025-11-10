/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://percentlab.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://percentlab.app/sitemap-0.xml',
    ],
  },
  transform: async (config, path) => {
    // Set priority and change frequency for different page types
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/percentage') || path.startsWith('/bmi') || path.startsWith('/mortgage')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/pseo/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
