import AxeBuilder from '@axe-core/playwright'
import { expect, Locator, Page, test as base } from '@playwright/test'
import * as fs from 'fs'
import { kebabCase } from 'lodash'

import { relatedLinksMock } from '@/mock-server/handlers/cms/pages/fixtures/elements'
import { downloadsCsvFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-csv'
import { downloadsJsonFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-json'

import {
  AboutPage,
  AccessibilityStatementPage,
  AccessOurDataPage,
  BrowsePage,
  BulkDownloadsPage,
  CompliancePage,
  Covid19Page,
  ErrorPage,
  FeedbackConfirmationPage,
  FeedbackPage,
  HomePage,
  InfluenzaPage,
  MetricsChildPage,
  MetricsParentPage,
  NotFoundPage,
  OtherRespiratoryVirusesPage,
  WhatsNewChildPage,
  WhatsNewParentPage,
} from './index'

type Fixtures = {
  app: App
  homePage: HomePage
  aboutPage: AboutPage
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
}

export class App {
  readonly page: Page
  readonly header: Locator
  readonly phaseBanner: Locator
  readonly nav: Locator
  readonly tableOfContents: Locator
  readonly backToTop: Locator
  readonly footer: Locator
  readonly cookieBanner: Locator
  readonly areaSelector: Locator

  constructor(page: Page) {
    this.page = page
    this.header = this.page.getByRole('banner')
    this.phaseBanner = this.page.getByTestId('ukhsa-phase-banner')
    this.nav = this.page.getByRole('navigation', { name: 'Menu' })
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

  async waitForUrl(url: string) {
    await this.page.waitForURL(url, { timeout: 10000 })
    await expect(this.page.url()).toEqual(url)
  }

  async hasDocumentTitle(title: string) {
    await expect(await this.page.title()).toBe(title)
  }

  async hasNoAccessibilityDefects(additionalDisabledRules: string[] = []) {
    const accessibilityScanResults = await new AxeBuilder({ page: this.page })
      .disableRules(['region', ...additionalDisabledRules])
      .analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  }

  async hasLayout() {
    // Header
    await expect(this.header.getByRole('link', { name: 'GOV.UK' })).toBeVisible()
    await expect(this.header.getByRole('link', { name: 'UKHSA data dashboard' })).toBeVisible()

    // Phase Banner
    await expect(this.phaseBanner.getByText(/Beta/)).toBeVisible()
    await expect(
      this.phaseBanner.getByText(/This is a new service - your feedback will help us to improve it./)
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

  async hasMobileNav() {
    await expect(this.page.getByRole('link', { name: 'Menu', expanded: false })).toBeVisible()

    // Open menu
    await this.page.getByRole('link', { name: 'Show navigation menu', expanded: false }).click()

    // Expect visible items
    await expect(this.nav.getByRole('link', { name: 'Homepage' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'COVID-19' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'Influenza' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'Other respiratory viruses' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'API' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: "What's new" })).toBeVisible()

    // Close menu
    await this.page.getByRole('link', { name: 'Hide navigation menu', expanded: true }).click()

    // Expect no visible menu items
    await expect(this.nav.getByRole('link', { name: 'Homepage' })).toBeHidden()
    await expect(this.nav.getByRole('link', { name: 'COVID-19' })).toBeHidden()
    await expect(this.nav.getByRole('link', { name: 'Influenza' })).toBeHidden()
    await expect(this.nav.getByRole('link', { name: 'Other respiratory viruses' })).toBeHidden()
    await expect(this.nav.getByRole('link', { name: 'API' })).toBeHidden()
    await expect(this.nav.getByRole('link', { name: 'About' })).toBeHidden()
    await expect(this.nav.getByRole('link', { name: "What's new" })).toBeHidden()
  }

  async hasDesktopNav() {
    await expect(this.nav.getByRole('link', { name: 'Homepage' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'COVID-19' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'Influenza' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'Other respiratory viruses' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'API' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: "What's new" })).toBeVisible()
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
    await expect(card.getByAltText('')).toBeVisible()
    card.getByText('View data in a tabular format')
  }

  async hasRelatedLinks() {
    await expect(this.page.getByRole('heading', { name: 'Related Links', level: 2 })).toBeVisible()

    for (const link of relatedLinksMock) {
      await expect(this.page.getByRole('link', { name: link.title })).toHaveAttribute('href', link.url)
      await expect(this.page.getByText(link.body.replace('<p>', '').replace('</p>', ''))).toBeVisible()
    }
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

  async canDownloadChart(cards: string[], format: 'csv' | 'json') {
    for (const name of cards) {
      const card = this.page.getByTestId(`chart-row-card-${name}`)

      await card.getByRole('tab', { name: 'Download' }).click()

      await card.getByLabel(format.toUpperCase()).click()

      const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        await card.getByRole('button', { name: 'Download' }).click(),
      ])

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

  // Pagination

  async hasPagination() {
    await expect(this.page.getByRole('navigation', { name: 'results' })).toBeVisible()
  }

  async checkPaginationLinkIsActive(activeLink: number) {
    await expect(
      this.page.getByRole('navigation', { name: 'results' }).getByRole('link', { name: `Page ${activeLink}` })
    ).toHaveAttribute('aria-current', 'page')
  }

  async clickPaginationNumberLink(number: number) {
    await this.page
      .getByRole('navigation', { name: 'results' })
      .getByRole('link', { name: `Page ${number}` })
      .click()
  }

  async clickPaginationNextLink() {
    await this.page
      .getByRole('navigation', { name: 'results' })
      .getByRole('link', { name: 'Next', exact: true })
      .click()
  }

  async clickPaginationPreviousLink() {
    await this.page
      .getByRole('navigation', { name: 'results' })
      .getByRole('link', { name: 'Previous', exact: true })
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
      await expect(this.areaSelector).toBeVisible()
    } else {
      await expect(this.areaSelector).toBeHidden()
    }
  }

  async checkAreaSelectorInputMatchesValue(label: 'Area type' | 'Area name', expectedValue: string) {
    await expect(this.areaSelector.getByLabel(label)).toHaveValue(expectedValue)
  }

  async checkAreaSelectorDropdownOptions(label: 'Area type' | 'Area name', expectedOptions: Array<string>) {
    const input = this.areaSelector.getByLabel(label)

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
    await expect(this.areaSelector.getByLabel('Area name')).toBeDisabled()
  }

  async selectAreaSelectorDropdownOption(label: 'Area type' | 'Area name', selectedOption: string) {
    await this.areaSelector.getByLabel(label).selectOption(selectedOption)
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
    await this.areaSelector.getByRole('link', { name: 'Reset' }).click()
  }

  async submitAreaSelectorForm() {
    await this.areaSelector.getByRole('button', { name: 'Update' }).click()
  }
}

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use(new App(page))
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page))
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
})

export { expect } from '@playwright/test'
