import AxeBuilder from '@axe-core/playwright'
import { expect, Locator, Page } from '@playwright/test'
import * as fs from 'fs'
import { kebabCase, lowerCase } from 'lodash'

import { relatedLinksMock } from '@/mock-server/handlers/cms/pages/fixtures/elements'
import { downloadsCsvFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-csv'
import { downloadsJsonFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-json'

import { AuthFixtures } from './auth.fixture'
import {
  AboutPage,
  AccessibilityStatementPage,
  AccessOurDataPage,
  ArchiveDataPage,
  BrowsePage,
  BulkDownloadsPage,
  CompliancePage,
  Covid19Page,
  ErrorPage,
  FeedbackConfirmationPage,
  FeedbackPage,
  InfluenzaPage,
  LandingPage,
  MetricsChildPage,
  MetricsParentPage,
  NotFoundPage,
  OtherRespiratoryVirusesPage,
  SitemapPage,
  SwitchboardPage,
  WeatherHealthAlertsChildPage,
  WeatherHealthAlertsMapPage,
  WeatherHealthAlertsParentPage,
  WeatherHealthAlertsRegionPage,
  WhatsNewChildPage,
  WhatsNewParentPage,
} from './index'

export type Fixtures = {
  app: App
  switchboardPage: SwitchboardPage
  sitemapPage: SitemapPage
  landingPage: LandingPage
  aboutPage: AboutPage
  archiveDataPage: ArchiveDataPage
  bulkDownloadsPage: BulkDownloadsPage
  whatsNewParentPage: WhatsNewParentPage
  whatsNewChildPage: WhatsNewChildPage
  metricsParentPage: MetricsParentPage
  metricsChildPage: MetricsChildPage
  covid19Page: Covid19Page
  errorPage: ErrorPage
  influenzaPage: InfluenzaPage
  otherRespiratoryVirusesPage: OtherRespiratoryVirusesPage
  feedbackPage: FeedbackPage
  feedbackConfirmationPage: FeedbackConfirmationPage
  browsePage: BrowsePage
  notFoundPage: NotFoundPage
  accessibilityStatementPage: AccessibilityStatementPage
  compliancePage: CompliancePage
  accessOurDataPage: AccessOurDataPage
  weatherHealthAlertsParentPage: WeatherHealthAlertsParentPage
  weatherHealthAlertsChildPage: WeatherHealthAlertsChildPage
  weatherHealthAlertsRegionPage: WeatherHealthAlertsRegionPage
  weatherHealthAlertsMapPage: WeatherHealthAlertsMapPage
}

export class App {
  readonly page: Page
  readonly header: Locator
  readonly phaseBanner: Locator
  readonly heroBanner: Locator
  readonly nav: Locator
  readonly sideNav: Locator
  readonly tableOfContents: Locator
  readonly backToTop: Locator
  readonly footer: Locator
  readonly cookieBanner: Locator
  readonly areaSelector: Locator

  constructor(page: Page) {
    this.page = page
    this.header = this.page.getByRole('banner')
    this.phaseBanner = this.page.getByTestId('ukhsa-phase-banner')
    this.heroBanner = this.page.getByTestId('ukhsa-hero-banner')
    this.nav = this.page.getByRole('navigation', { name: 'Menu' })
    this.sideNav = this.page.getByRole('navigation', { name: 'Side navigation' })
    this.tableOfContents = this.page.getByRole('navigation', { name: 'Contents' })
    this.backToTop = this.page.getByRole('link', { name: 'Back to top' })
    this.footer = this.page.getByRole('contentinfo')
    this.cookieBanner = this.page.getByRole('region', { name: 'Cookies on the UKHSA data dashboard' })
    this.areaSelector = this.page.getByRole('form', { name: 'Area selector' })
  }

  async goto(path: string) {
    await this.page.goto(path)
  }

  async reload() {
    await this.page.reload()
  }

  async waitForPageLoaded() {
    // Wait for our JS bundle to be fully loaded as sometimes the tests will try to interact with the UI before the JS is loaded
    await this.page.waitForFunction(() => document.body.className.includes('js-enabled'), undefined, { timeout: 5000 })
  }

  async waitForUrl(url: string) {
    await this.page.waitForURL(url, { timeout: 10000 })
  }

  async hasMetadata({ title, description }: { title: string; description: string }) {
    const pageTitle = await this.page.title()
    await expect(pageTitle).toBe(title)
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute('content', description)
  }

  async hasDocumentTitle(title: string) {
    await expect(await this.page.title()).toBe(title)
  }

  async hasNoAccessibilityDefects(additionalDisabledRules: string[] = []) {
    const accessibilityScanResults = await new AxeBuilder({ page: this.page })
      .disableRules(['region', ...additionalDisabledRules])
      .analyze()

    const filteredViolations = accessibilityScanResults.violations.filter((violation) => {
      if (violation.id === 'color-contrast') {
        violation.nodes = violation.nodes.filter((node) => node.html.includes('.govuk-tag'))
        return violation.nodes.length > 0
      }
      return true
    })

    expect(filteredViolations).toEqual([])
  }

  async hasLayout() {
    // Header
    await expect(this.page.getByRole('banner').getByRole('link', { name: 'GOV.UK' })).toBeVisible()
    await expect(this.page.getByRole('banner').getByRole('link', { name: 'UKHSA data dashboard' })).toBeVisible()

    // Phase Banner
    await expect(this.phaseBanner.getByText(/Beta/)).toBeVisible()
    await expect(
      this.phaseBanner.getByText(/This is a new service - your feedback will help us to improve it./)
    ).toBeVisible()

    // Announcement
    const infoBanner = this.page.getByRole('status')
    await expect(infoBanner.getByText('Information', { exact: true })).toBeVisible()
    await expect(infoBanner.getByText('This is an information level site wide banner. Puppies are cute')).toBeVisible()
    await expect(
      infoBanner.getByText(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.'
      )
    ).toBeVisible()

    // Footer
    await expect(this.footer.getByText(/All content is available under the/)).toBeVisible()
    await expect(this.footer.getByText(/Open Government Licence v3.0/)).toBeVisible()
    await expect(this.footer.getByText(/, except where otherwise stated/)).toBeVisible()
    await expect(this.footer.getByText(/© Crown copyright/)).toHaveAttribute(
      'href',
      'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/'
    )
    await expect(this.footer.getByRole('link', { name: 'Cookies' })).toBeVisible()
    await expect(this.footer.getByRole('link', { name: 'Accessibility statement' })).toBeVisible()
    await expect(this.footer.getByRole('link', { name: 'Compliance' })).toBeVisible()
  }

  async hasHeroBannerLayout() {
    await expect(this.page.getByRole('banner').getByRole('link', { name: 'GOV.UK' })).toBeVisible()

    await expect(this.heroBanner.getByRole('heading', { level: 1, name: 'UKHSA data dashboard' })).toBeVisible()
    await expect(
      this.heroBanner.getByRole('heading', { level: 2, name: 'Showing public health data across England' })
    ).toBeVisible()
    await expect(this.heroBanner.getByRole('link', { name: 'What is the UKHSA data dashboard?' })).toHaveAttribute(
      'href',
      '/about'
    )

    // Phase Banner
    await expect(this.phaseBanner.getByText(/Beta/)).toBeVisible()
    await expect(
      this.phaseBanner.getByText(/This is a new service - your feedback will help us to improve it./)
    ).toBeVisible()

    // Announcement
    const infoBanner = this.page.getByRole('status')
    await expect(infoBanner.getByText('Information', { exact: true })).toBeVisible()
    await expect(infoBanner.getByText('This is an information level site wide banner. Puppies are cute')).toBeVisible()
    await expect(
      infoBanner.getByText(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.'
      )
    ).toBeVisible()
  }

  // TODO: Rename once above test removed in CDD-2154
  async hasNav() {
    await this.waitForPageLoaded()

    await expect(this.page.getByRole('link', { name: 'Menu', expanded: false })).toBeVisible()

    // Open menu
    await this.page.getByRole('link', { name: 'Show navigation menu', expanded: false }).click()

    await expect(this.page.getByRole('link', { name: 'Menu', expanded: true })).toBeVisible()

    let nav = this.page.getByRole('navigation', { name: 'Menu' })

    // Expect visible items
    await expect(nav.getByRole('heading', { name: 'Respiratory viruses' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'COVID-19' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Influenza' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Other respiratory viruses' })).toBeVisible()

    await expect(nav.getByRole('heading', { name: 'Services and information' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Homepage' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Metrics documentation' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Weather health alerts' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Access our data' })).toBeVisible()

    await expect(nav.getByRole('link', { name: "What's new" })).toBeVisible()
    await expect(nav.getByRole('link', { name: "What's coming" })).toBeVisible()

    // Close menu
    await this.page.getByRole('link', { name: 'Hide navigation menu', expanded: true }).click()

    nav = this.page.getByRole('navigation', { name: 'Menu' })

    // Expect no visible menu items
    await expect(nav.getByRole('heading', { name: 'Respiratory viruses' })).toBeHidden()
    await expect(nav.getByRole('link', { name: 'COVID-19' })).toBeHidden()
    await expect(nav.getByRole('link', { name: 'Influenza' })).toBeHidden()
    await expect(nav.getByRole('link', { name: 'Other respiratory viruses' })).toBeHidden()
    await expect(nav.getByRole('heading', { name: 'Services and information' })).toBeHidden()
    await expect(nav.getByRole('link', { name: 'Homepage' })).toBeHidden()
    await expect(nav.getByRole('link', { name: 'Access our data' })).toBeHidden()
    await expect(nav.getByRole('link', { name: 'About' })).toBeHidden()
    await expect(nav.getByRole('link', { name: "What's new" })).toBeHidden()
    await expect(nav.getByRole('link', { name: "What's coming" })).toBeHidden()
  }

  async hasNotNav() {
    await expect(this.sideNav).toBeHidden()
  }

  async clickNav(name: string) {
    await expect(this.page.getByRole('link', { name: 'Menu', expanded: false })).toBeVisible()
    await this.page.getByRole('link', { name: 'Show navigation menu', expanded: false }).click()

    await expect(this.page.getByRole('link', { name: 'Menu', expanded: true })).toBeVisible()

    const nav = this.page.getByRole('navigation', { name: 'Menu' })

    await nav.getByRole('link', { name }).click()
  }

  async clickBrowseNav(name: string) {
    await this.page.getByRole('link', { name: 'Show navigation menu', expanded: false }).click()
    await expect(this.page.getByRole('heading', { name: 'Browse', level: 1 })).toBeVisible()

    await this.page.getByRole('link', { name }).click()
  }

  async hasHeading(name: string) {
    await expect(this.page.getByRole('heading', { name, level: 1 })).toBeVisible()
  }

  async hasTableOfContents(links: string[]) {
    await expect(this.tableOfContents).toBeVisible()

    for (const name of links) {
      const link = this.tableOfContents.getByRole('link', { name })
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', `#${kebabCase(name)}`)
    }
  }

  async hasSectionHeadings(headings: string[], level = 2) {
    for (const name of headings) {
      this.page.getByRole('heading', { name, level })
    }
  }

  async hasTopicCard({ name, description }: { name: string; description: string }) {
    const card = this.page.getByRole('article', { name, exact: true })
    await expect(card.getByRole('paragraph')).toContainText(description)
    await expect(card.getByAltText(`Mocked alt text - Refer to tabular data.`)).toBeVisible()
  }

  async hasRelatedLinks() {
    await expect(this.page.getByRole('heading', { name: 'Related content', level: 2 })).toBeVisible()

    for (const link of relatedLinksMock) {
      await expect(this.page.getByRole('link', { name: link.title })).toHaveAttribute('href', link.url)
      await expect(this.page.getByText(link.body.replace('<p>', '').replace('</p>', ''))).toBeVisible()
    }
  }

  async hasNotRelatedLinks() {
    await expect(this.page.getByRole('heading', { name: 'Related content', level: 2 })).toBeHidden()
  }

  async hasBackToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0))
    await expect(this.backToTop).not.toBeInViewport()
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(this.backToTop).toBeInViewport()
    await expect(this.backToTop).toHaveAttribute('href', '#main-content')
    await expect(this.header).not.toBeInViewport()
    await this.backToTop.click()
    await expect(this.header).toBeInViewport()
    await expect(this.backToTop).not.toBeInViewport()
  }

  async hasNotBackToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0))
    await expect(this.backToTop).not.toBeInViewport()
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(this.backToTop).not.toBeInViewport()
  }

  // Cookie Banner

  async gotoCookieBanner() {
    await this.page.goto('/?change-settings=1')
  }

  async hasCookieBanner() {
    const banner = this.cookieBanner
    await expect(banner).toBeVisible()
    await expect(banner.getByRole('heading', { name: 'Cookies on UKHSA data dashboard', level: 2 })).toBeVisible()
    await expect(banner.getByText(/We use some essential cookies to make this service work./)).toBeVisible()
    await expect(
      banner.getByText(
        /We'd like to set additional cookies so we can remember your settings, understand how people use the service and make improvements./
      )
    ).toBeVisible()
    await expect(banner.getByRole('button', { name: 'Accept additional cookies' })).toBeVisible()
    await expect(banner.getByRole('button', { name: 'Reject additional cookies' })).toBeVisible()
    await expect(banner.getByRole('link', { name: 'View cookies' })).toHaveAttribute('href', '/cookies')
  }

  async hasNotCookieBanner() {
    await expect(this.cookieBanner).toBeHidden()
  }

  async hasCookieBannerConfirmation() {
    await expect(
      this.cookieBanner.getByText(
        /You’ve accepted additional cookies. You can view the cookie policy or change your cookie settings at any time./
      )
    ).toBeVisible()
    await expect(this.cookieBanner.getByRole('button', { name: 'Hide cookie message' })).toBeVisible()
  }

  async acceptCookies() {
    await this.cookieBanner.getByRole('button', { name: 'Accept additional cookies' }).click()
  }

  async hideCookies() {
    await this.cookieBanner.getByRole('button', { name: 'Hide cookie message' }).click()
  }

  // Chart downloads

  async canDownloadChart(cards: string[], format: 'csv' | 'json', device: 'desktop' | 'mobile' | 'tablet') {
    for (const name of cards) {
      const card = this.page.getByTestId(`chart-row-card-${name}`)

      if (device === 'mobile') {
        await card
          .getByRole('combobox', { name: `Choose display option for '${lowerCase(name)}' data` })
          .selectOption('Download')
      } else {
        await card.getByRole('tab', { name: 'Download' }).click()
      }

      await card.getByLabel(format.toUpperCase()).click()

      const downloadPromise = this.page.waitForEvent('download')

      await card.getByRole('button', { name: 'Download' }).click()

      const download = await downloadPromise

      const fileName = download.suggestedFilename()
      expect(fileName).toBe(`ukhsa-chart-download.${format}`)

      const path = await download.path()

      if (path) {
        const file = fs.readFileSync(path)

        if (format === 'csv') {
          expect(file.toString()).toEqual(downloadsCsvFixture)
        }

        if (format === 'json') {
          expect(file.toString()).toEqual(JSON.stringify(downloadsJsonFixture))
        }
      }
    }
  }

  async navigateChartTabsByKeyboardAndSelectWithEnterKey(cards: string[]) {
    for (const name of cards) {
      const card = this.page.getByTestId(`chart-row-card-${name}`)

      await card.getByRole('tab', { name: 'Chart' }).click()

      await this.page.keyboard.press('Tab')
      await this.page.keyboard.press('Tab')
      await this.page.keyboard.press('Enter')

      await expect(card.getByText(/Download data/)).toBeVisible()
    }
  }

  async navigateChartTabsByKeyboardAndSelectWithSpaceKey(cards: string[]) {
    for (const name of cards) {
      const card = this.page.getByTestId(`chart-row-card-${name}`)

      await card.getByRole('tab', { name: 'Chart' }).click()

      await this.page.keyboard.press('Tab')
      await this.page.keyboard.press('Tab')
      await this.page.keyboard.press('Space')

      await expect(card.getByText(/Download data/)).toBeVisible()
    }
  }

  // Pagination

  async hasPagination() {
    await expect(this.page.getByRole('navigation', { name: 'Pagination' })).toBeVisible()
  }

  async checkPaginationLinkIsActive(activeLink: number) {
    await expect(
      this.page.getByRole('navigation', { name: 'Pagination' }).getByRole('link', { name: `Page ${activeLink}` })
    ).toHaveAttribute('aria-current', 'page')
  }

  async clickPaginationNumberLink(number: number) {
    await this.page
      .getByRole('navigation', { name: 'Pagination' })
      .getByRole('link', { name: `Page ${number}` })
      .click()
  }

  async clickPaginationNextLink() {
    await this.page
      .getByRole('navigation', { name: 'Pagination' })
      .getByRole('link', { name: 'Next page', exact: true })
      .click()
  }

  async clickPaginationPreviousLink() {
    await this.page
      .getByRole('navigation', { name: 'Pagination' })
      .getByRole('link', { name: 'Previous page', exact: true })
      .click()
  }

  // Area Selector
  async hasAreaSelector() {
    await expect(this.page.getByText('Filter results by location')).toBeVisible()
  }

  async hasNotAreaSelector() {
    await expect(this.page.getByText('Filter results by location')).toBeHidden()
  }

  async clickAreaSelectorToggle() {
    await this.page.getByText('Filter results by location').click()
  }

  async checkAreaSelectorFormIsActive(isActive = true) {
    if (isActive) {
      await expect(this.page.getByRole('form', { name: 'Area selector' })).toBeVisible({ timeout: 10000 })
    } else {
      await expect(this.page.getByRole('form', { name: 'Area selector' })).toBeHidden({ timeout: 10000 })
    }
  }

  async checkAreaSelectorInputMatchesValue(label: 'Area type' | 'Area name', expectedValue: string) {
    await expect(this.page.getByRole('form', { name: 'Area selector' }).getByLabel(label)).toHaveValue(expectedValue)
  }

  async checkAreaSelectorDropdownOptions(label: 'Area type' | 'Area name', expectedOptions: Array<string>) {
    const input = this.page.getByRole('form', { name: 'Area selector' }).getByLabel(label)

    // Placeholder option
    await expect(input.getByRole('option', { name: `Select ${label}` })).toHaveAttribute('disabled')
    await expect(input.getByRole('option', { name: `Select ${label}` })).toHaveAttribute('selected')
    await expect(input.getByRole('option', { name: `Select ${label}` })).toHaveAttribute('value', '')

    // Selectable options
    for (const name of expectedOptions) {
      await expect(input.getByRole('option', { name })).toHaveAttribute('value', name)
    }
  }

  async checkAreaSelectorAreaNameIsDisabled() {
    await expect(this.page.getByRole('form', { name: 'Area selector' }).getByLabel('Area name')).toBeDisabled()
  }

  async selectAreaSelectorDropdownOption(label: 'Area type' | 'Area name', selectedOption: string) {
    await this.page.getByRole('form', { name: 'Area selector' }).getByLabel(label).selectOption(selectedOption)
  }

  async checkAreaSelectorChartsRefreshedForLocation(location: string) {
    for (const img of await this.page.getByTestId('chart').all()) {
      if (!location) {
        await expect(img).not.toHaveAttribute('data-location')
      } else {
        await expect(img).toHaveAttribute('data-location', location)
      }
    }
  }

  async clickAreaSelectorResetLink() {
    await this.page.getByRole('form', { name: 'Area selector' }).getByRole('link', { name: 'Reset' }).click()
  }

  async submitAreaSelectorForm() {
    await this.page.getByRole('form', { name: 'Area selector' }).getByRole('button', { name: 'Update' }).click()
  }
}

export const test = AuthFixtures.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use(new App(page))
  },
  sitemapPage: async ({ page }, use) => {
    await use(new SitemapPage(page))
  },
  switchboardPage: async ({ page }, use) => {
    await use(new SwitchboardPage(page))
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page))
  },
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page))
  },
  archiveDataPage: async ({ page }, use) => {
    await use(new ArchiveDataPage(page))
  },
  bulkDownloadsPage: async ({ page }, use) => {
    await use(new BulkDownloadsPage(page))
  },
  whatsNewParentPage: async ({ page }, use) => {
    await use(new WhatsNewParentPage(page))
  },
  whatsNewChildPage: async ({ page }, use) => {
    await use(new WhatsNewChildPage(page))
  },
  metricsParentPage: async ({ page }, use) => {
    await use(new MetricsParentPage(page))
  },
  metricsChildPage: async ({ page }, use) => {
    await use(new MetricsChildPage(page))
  },
  covid19Page: async ({ page }, use) => {
    await use(new Covid19Page(page))
  },
  influenzaPage: async ({ page }, use) => {
    await use(new InfluenzaPage(page))
  },
  otherRespiratoryVirusesPage: async ({ page }, use) => {
    await use(new OtherRespiratoryVirusesPage(page))
  },
  feedbackPage: async ({ page }, use) => {
    await use(new FeedbackPage(page))
  },
  feedbackConfirmationPage: async ({ page }, use) => {
    await use(new FeedbackConfirmationPage(page))
  },
  browsePage: async ({ page }, use) => {
    await use(new BrowsePage(page))
  },
  notFoundPage: async ({ page }, use) => {
    await use(new NotFoundPage(page))
  },
  accessibilityStatementPage: async ({ page }, use) => {
    await use(new AccessibilityStatementPage(page))
  },
  compliancePage: async ({ page }, use) => {
    await use(new CompliancePage(page))
  },
  errorPage: async ({ page }, use) => {
    await use(new ErrorPage(page))
  },
  accessOurDataPage: async ({ page }, use) => {
    await use(new AccessOurDataPage(page))
  },
  weatherHealthAlertsParentPage: async ({ page }, use) => {
    await use(new WeatherHealthAlertsParentPage(page))
  },
  weatherHealthAlertsChildPage: async ({ page, isMobile }, use) => {
    await use(new WeatherHealthAlertsChildPage(page, isMobile))
  },
  weatherHealthAlertsRegionPage: async ({ page }, use) => {
    await use(new WeatherHealthAlertsRegionPage(page))
  },
  weatherHealthAlertsMapPage: async ({ page }, use) => {
    await use(new WeatherHealthAlertsMapPage(page))
  },
})

export { expect } from '@playwright/test'
