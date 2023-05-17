
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_SITE_UTL,
  changefreq: 'daily',
  priority: 1.0,
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["force-login", "dashboard"],
  robotsTxtOptions: {
    // additionalSitemaps: [`${process.env.NEXT_SITE_UTL}server-sitemap.xml`],
    policies: [
      {
        userAgent: '*',
        allow: '/'
      },
      // {
      //   userAgent: 'AhrefsBot',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'PetalBot',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'SiteAuditBot',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'SemrushBot-BA',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'SemrushBot-SI',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'SemrushBot-SWA',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'SemrushBot-CT',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'SemrushBot-BM',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'SplitSignalBot',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'SemrushBot-COUB',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'Yandex',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'MJ12bot',
      //   disallow: '/'
      // },
      // {
      //   userAgent: 'Censys',
      //   Disallow: '/'
      // },
      // {
      //   userAgent: 'BLEXBot',
      //   disallow: '/'
      // }
    ]
  }
};
