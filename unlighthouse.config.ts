export default {
  scanner: {
    exclude: ['/healthcare-associated-infections-hcai/healthcare-associated-infections/'],
  },
  puppeteerOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 0,
  },
  ci: {
    budget: {
      performance: 70,
      accessibility: 90,
      'best-practices': 90,
      seo: 90,
    },
  },
}
