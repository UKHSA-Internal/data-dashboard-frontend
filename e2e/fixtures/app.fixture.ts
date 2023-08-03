import AxeBuilder from '@axe-core/playwright'
import { expect, Locator, Page, test as base } from '@playwright/test'
import { kebabCase } from 'lodash'

import { relatedLinksMock } from '@/mock-server/handlers/cms/pages/fixtures/elements'

import {
  AboutPage,
  Covid19Page,
  FeedbackConfirmationPage,
  FeedbackPage,
  HomePage,
  InfluenzaPage,
  OtherRespiratoryVirusesPage,
  WhatsNewPage,
} from './index'

type Fixtures = {
  app: App
  homePage: HomePage
  aboutPage: AboutPage
  whatsNewPage: WhatsNewPage
  covid19Page: Covid19Page
  influenzaPage: InfluenzaPage
  otherRespiratoryVirusesPage: OtherRespiratoryVirusesPage
  feedbackPage: FeedbackPage
  feedbackConfirmationPage: FeedbackConfirmationPage
}

export class App {
  readonly page: Page
  readonly header: Locator
  readonly phaseBanner: Locator
  readonly nav: Locator
  readonly tableOfContents: Locator
  readonly backToTop: Locator
  readonly footer: Locator

  constructor(page: Page) {
    this.page = page
    this.header = this.page.getByRole('banner')
    this.phaseBanner = this.page.getByTestId('ukhsa-phase-banner')
    this.nav = this.page.getByRole('navigation', { name: 'Menu' })
    this.tableOfContents = this.page.getByRole('navigation', { name: 'Contents' })
    this.backToTop = this.page.getByRole('link', { name: 'Back to top' })
    this.footer = this.page.getByRole('contentinfo')
  }

  async hasNoAccessibilityDefects() {
    const accessibilityScanResults = await new AxeBuilder({ page: this.page }).disableRules('region').analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  }

  async hasLayout() {
    // Header
    await expect(this.header.getByRole('link', { name: 'GOV.UK' })).toBeVisible()
    await expect(this.header.getByRole('link', { name: 'UKHSA data dashboard' })).toBeVisible()

    // Phase Banner
    await expect(this.phaseBanner.getByText(/Alpha/)).toBeVisible()
    await expect(
      this.phaseBanner.getByText(/This is a new service – your feedback will help us to improve it./)
    ).toBeVisible()

    // Nav
    await expect(this.nav.getByRole('link', { name: 'Dashboard' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'COVID-19' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'Influenza' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'Other respiratory viruses' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'API' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(this.nav.getByRole('link', { name: "What's new" })).toBeVisible()

    // Footer
    await expect(this.footer.getByText(/All content is available under the/)).toBeVisible()
    await expect(this.footer.getByText(/Open Government Licence v3.0/)).toBeVisible()
    await expect(this.footer.getByText(/, except where otherwise stated/)).toBeVisible()
    await expect(this.footer.getByText(/© Crown copyright/)).toHaveAttribute(
      'href',
      'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/'
    )
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
    await expect(this.backToTop).not.toBeInViewport()
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(this.backToTop).toBeInViewport()
    await expect(this.backToTop).toHaveAttribute('href', '#main-content')
    await expect(this.header).not.toBeInViewport()
    await this.backToTop.click()
    await expect(this.header).toBeInViewport()
    await expect(this.backToTop).not.toBeInViewport()
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
  whatsNewPage: async ({ page }, use) => {
    await use(new WhatsNewPage(page))
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
})

export { expect } from '@playwright/test'
