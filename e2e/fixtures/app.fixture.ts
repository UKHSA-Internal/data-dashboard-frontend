import AxeBuilder from '@axe-core/playwright'
import { expect, Locator, Page, test as base } from '@playwright/test'
import * as fs from 'fs'
import { kebabCase } from 'lodash'

import { relatedLinksMock } from '@/mock-server/handlers/cms/pages/fixtures/elements'
import { downloadsCsvFixture } from '@/mock-server/handlers/downloads/fixtures/downloads-csv'

import {
  AboutPage,
  AccessibilityStatementPage,
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

  constructor(page: Page) {
    this.page = page
    this.header = this.page.getByRole('banner')
    this.phaseBanner = this.page.getByTestId('ukhsa-phase-banner')
    this.nav = this.page.getByRole('navigation', { name: 'Menu' })
    this.tableOfContents = this.page.getByRole('navigation', { name: 'Contents' })
    this.backToTop = this.page.getByRole('link', { name: 'Back to top' })
    this.footer = this.page.getByRole('contentinfo')
    this.cookieBanner = this.page.getByRole('region', { name: 'Cookies on the UKHSA data dashboard' })
  }

  async reload() {
    await this.page.reload()
  }

  async hasNoAccessibilityDefects(additionalDisabledRules?: string[]) {
    const accessibilityScanResults = await new AxeBuilder({ page: this.page }).disableRules(['region', ...additionalDisabledRules]).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  }

  async hasLayout() {
    // Header
    await expect(this.header.getByRole('link', { name: 'GOV.UK' })).toBeVisible()
    await expect(this.header.getByRole('link', { name: 'UKHSA data dashboard' })).toBeVisible()

    // Phase Banner
    await expect(this.phaseBanner.getByText(/Alpha/)).toBeVisible()
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

  async canDownloadChartAsCsv(cards: string[]) {
    for (const name of cards) {
      const card = this.page.getByTestId(`chart-row-card-${name}`)

      await card.getByRole('tab', { name: 'Download' }).click()

      const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        await card.getByRole('button', { name: 'Download (csv)' }).click(),
      ])

      const fileName = download.suggestedFilename()
      expect(fileName).toBe('data.csv')

      const path = await download.path()

      if (path) {
        const file = fs.readFileSync(path)
        expect(file.toString()).toEqual(downloadsCsvFixture)
      }
    }
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
})

export { expect } from '@playwright/test'
