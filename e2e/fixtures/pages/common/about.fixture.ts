import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class AboutPage {
  readonly page: Page
  readonly isMobile: boolean
  readonly nav: Locator

  constructor(page: Page, isMobile: boolean) {
    this.page = page
    this.isMobile = isMobile
    this.nav = this.page.getByRole('navigation', { name: 'Menu' })
  }

  async goto() {
    await this.page.goto('/about')
  }

  async goToThroughNav() {
    if (this.isMobile) await this.page.getByRole('link', { name: 'Show navigation menu', expanded: false }).click()
    await this.nav.getByRole('link', { name: /About/ }).click()
  }

  async hasMetadata() {
    await expect(this.page).toHaveTitle(/About | UKHSA data dashboard/)
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'The UKHSA data dashboard provides presents a wide range of public health data in an easily accessible format.'
    )
  }

  async hasHeading() {
    await expect(this.page.getByRole('heading', { name: /About/, level: 1 })).toBeVisible()
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Friday, 12 May 2023 at 02:40pm/)).toBeVisible()
  }

  async hasPageContent() {
    await expect(this.page.getByRole('heading', { name: 'About the UKHSA data dashboard', level: 2 })).toBeVisible()
    await expect(
      this.page.getByText(
        'The UKHSA data dashboard provides presents a wide range of public health data in an easily accessible format. It’s produced by the UK Health Security Agency. At the moment, the dashboard is focused on respiratory viruses.'
      )
    ).toBeVisible()

    await expect(this.page.getByRole('heading', { name: 'Using the dashboard', level: 2 })).toBeVisible()
    await expect(
      this.page.getByText('The UKHSA data dashboard is for anyone interested in UK health data.')
    ).toBeVisible()

    await expect(this.page.getByRole('heading', { name: 'Respiratory viruses', level: 2 })).toBeVisible()
    await expect(
      this.page.getByText(
        'Respiratory viruses can infect any age group. Some people (including children and the elderly) are more likely to become seriously ill or have other complications because of respiratory viruses. In the UK many of these viruses are seasonal and tend to circulate at higher levels during the winter months.'
      )
    ).toBeVisible()

    await expect(this.page.getByRole('heading', { name: 'Metrics', level: 2 })).toBeVisible()
    await expect(
      this.page.getByText(
        'The UKHSA data dashboard reports on different data (metrics) for each virus. This is because not all metrics are available for each virus. See more in data availability.'
      )
    ).toBeVisible()

    await expect(this.page.getByRole('heading', { name: 'Data availability', level: 2 })).toBeVisible()
    await expect(
      this.page.getByText(
        'Data for the UKHSA data dashboard is updated in-line with the data source. It will be clearly signposted on each page the frequency of the upload and when the data was last updated.'
      )
    ).toBeVisible()

    await expect(this.page.getByRole('heading', { name: 'Data sources', level: 2 })).toBeVisible()
    await expect(this.page.getByText('The data on the UKHSA data dashboard is from a number of sources.')).toBeVisible()
  }
}
