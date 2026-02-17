import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class LandingPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/')
  }

  private async getSection(sectionName: string) {
    return this.page.getByRole('region', { name: sectionName })
  }

  private async getButtonInSection(sectionName: string, linkName: string) {
    const section = await this.getSection(sectionName)

    return section.getByRole('link', { name: linkName })
  }

  async hasMetadata() {
    const title = await this.page.title()
    await expect(title).toBe('UKHSA data dashboard')
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Overall summary of the respiratory viruses in circulation within the UK'
    )
  }

  async hasHeading() {
    // Landing page no longer has hero banner h1, assert main content section is visible
    await expect(this.page.getByRole('heading', { name: 'Respiratory viruses', level: 2 })).toBeVisible()
  }

  async hasNotLastUpdated() {
    await expect(this.page.getByText(/Last updated/)).toBeHidden()
  }

  async hasPageDescription() {
    await expect(
      this.page.getByText(
        'The UKHSA data dashboard shows public health data across England. It builds on the success and is an iteration of the COVID-19 in the UK dashboard.'
      )
    ).toBeVisible()
  }

  async hasSection(sections: string[]) {
    for (const name of sections) {
      await expect(this.page.getByRole('heading', { level: 2, name })).toBeVisible()
    }
  }

  async hasCategories(categories: string[]) {
    for (const name of categories) {
      await expect(this.page.getByRole('region', { name })).toBeVisible()
    }
  }

  async hasHealthTopicColumns(columns: string[]) {
    const section = await this.getSection('Respiratory viruses')

    await expect(await section.getByRole('heading', { level: 3 }).count()).toEqual(columns.length)

    for (const name of columns) {
      await expect(
        section.getByTestId('chart-row-cards').getByRole('heading', { level: 3, name }).isVisible
      ).toBeTruthy()
    }
  }

  async hasLandingPageCard({ title, sub_title }: { title: string; sub_title: string }) {
    const card = await this.getButtonInSection('Respiratory viruses', title)

    await expect(card.getByRole('heading', { level: 3, name: title, exact: true })).toBeVisible()
    await expect(card.getByText(sub_title)).toBeVisible()
  }

  async hasNoLandingPageCard({ title, sub_title }: { title: string; sub_title: string }) {
    const card = await this.getButtonInSection('Respiratory viruses', title)

    await expect(card.getByRole('heading', { level: 3, name: title, exact: true })).toBeHidden()
    await expect(card.getByText(sub_title)).toBeHidden()
  }

  async hasXCardsInSection(section: string, expectedNumberOfCards: number) {
    const selectedSection = await this.getSection('Respiratory viruses')
    const cardCount = await selectedSection.getByTestId('card-wrapper').count()

    expect(cardCount).toBe(expectedNumberOfCards)
  }

  async hasShowMoreButton() {
    const showMoreButton = await this.getButtonInSection('Respiratory viruses', 'Show More')
    await expect(showMoreButton).toBeVisible()
  }

  async hasNoShowMoreButton() {
    const showMoreButton = await this.getButtonInSection('Outbreaks', 'Show More')
    await expect(showMoreButton).toBeHidden()
  }
  async hasShowLessButton() {
    const showLessButton = await this.getButtonInSection('Respiratory viruses', 'Show Less')
    await expect(showLessButton).toBeVisible()
  }

  async clickShowMoreButton() {
    const showMoreButton = await this.getButtonInSection('Respiratory viruses', 'Show More')

    await showMoreButton.click()
  }

  async clickShowLessButton() {
    const showLessButton = await this.getButtonInSection('Respiratory viruses', 'Show Less')
    await showLessButton.click()
  }

  async hasHealthTopicCard(
    name: string,
    { tagline, trendPercent, trendDescription }: { tagline: string; trendPercent: string; trendDescription: string }
  ) {
    const card = await this.getButtonInSection('Respiratory viruses', name)

    await expect(card.getByRole('heading', { name })).toBeVisible()
    await expect(card.getByText(tagline)).toBeVisible()
    await expect(card.getByTestId('chart-image')).toBeVisible()
    await expect(card.getByText(trendPercent, { exact: true })).toBeVisible()
    await expect(card.getByText(trendDescription, { exact: true })).toBeVisible()
  }

  async hasWeatherHealthAlertsCard(name: string, { tagline, map = true }: { tagline: string; map?: boolean }) {
    const section = this.page.getByRole('region', { name: 'Weather and climate risks' })
    const card = section.getByRole('link', { name })

    await expect(section).toBeVisible()
    await expect(card).toBeVisible()
    await expect(card.getByRole('heading', { name, level: 3 })).toBeVisible()
    await expect(card.getByText(tagline)).toBeVisible()

    if (map) {
      await expect(card.getByRole('application', { name: 'Map of weather health alerts' })).toBeVisible()
    } else {
      await expect(card.getByRole('application', { name: 'Map of weather health alerts' })).toBeHidden()
    }

    const regions = this.page.getByRole('list', { name: 'Weather health alerts by region' })
    await expect(regions).toBeVisible()
    await expect(await regions.getByRole('listitem').all()).toHaveLength(13)
    await expect(card.getByRole('button', { name: 'Enter fullscreen' })).toBeVisible()
  }

  async navigatesToWeatherHealthAlertsPageOnClick(
    name: string,
    { tagline, map = true }: { tagline: string; map?: boolean }
  ) {
    const section = this.page.getByRole('link', { name: 'Weather and climate risks' })
    const card = this.page.getByRole('link', { name })

    await expect(section).toBeVisible()
    await expect(card).toBeVisible()
    await expect(card.getByRole('heading', { name, level: 3 })).toBeVisible()
    await expect(card.getByText(tagline)).toBeVisible()

    if (map) {
      await expect(card.getByRole('application', { name: 'Map of weather health alerts' })).toBeVisible()
    } else {
      await expect(card.getByRole('application', { name: 'Map of weather health alerts' })).toBeHidden()
    }

    await section.click()
  }

  async clickMinimapCard(name: string) {
    const card = await this.getButtonInSection('Weather and climate risks', name)
    await card.click()
  }

  async clickMinimapCardRegionByMap(name: string, regionId: string) {
    const card = await this.getButtonInSection('Weather and climate risks', name)

    const map = card.getByRole('application', { name: 'Map of weather health alerts' })
    await expect(map).toBeVisible()
    const region = map.getByTestId(`feature-${regionId}`)
    await expect(region).toBeVisible()
    await region.click()
  }
}
