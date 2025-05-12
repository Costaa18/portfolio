/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://afonsoveloso.com',
  generateRobotsTxt: true,
  exclude: ['/_next/*', '/api/*'],
  transform: async (config, path) => {
    const locales = ['en', 'pt', 'de', 'fr', 'it', 'es'];

    // Página raiz
    if (path === '/') {
      return {
        loc: 'https://afonsoveloso.com',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 1,
        alternateRefs: [
          { hreflang: 'x-default', href: 'https://afonsoveloso.com' },
          ...locales.map(lang => ({
            hreflang: lang,
            href: `https://afonsoveloso.com/${lang}`
          }))
        ]
      };
    }

    // Páginas de idioma
    if (locales.includes(path.replace(/^\//, ''))) {
      const locale = path.replace(/^\//, '');
      return {
        loc: `https://afonsoveloso.com/${locale}`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 1,
        alternateRefs: [
          { hreflang: 'x-default', href: 'https://afonsoveloso.com' },
          { hreflang: locale, href: `https://afonsoveloso.com/${locale}` },
          ...locales.filter(l => l !== locale).map(lang => ({
            hreflang: lang,
            href: `https://afonsoveloso.com/${lang}`
          }))
        ]
      };
    }

    return null;
  }
};