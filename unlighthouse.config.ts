export default {
  scanner: {
    exclude: ['/healthcare-associated-infections-hcai/healthcare-associated-infections/', '/respiratory-viruses/*'],
  },
  puppeteerOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 0,
  },
  ci: {
    budget: {
      performance: 60,
      accessibility: 80,
      'best-practices': 80,
      seo: 80,
    },
  },
}
