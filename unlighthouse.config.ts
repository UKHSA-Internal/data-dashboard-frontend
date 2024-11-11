export default {
  site: 'https://ukhsa-dashboard.data.gov.uk',
  scanner: {
    exclude: ['/healthcare-associated-infections-hcai/healthcare-associated-infections/'],
  },
  puppeteerOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 0,
  },
}
