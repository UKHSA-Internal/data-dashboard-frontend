import { expect, Page } from '@playwright/test'

export class WeatherHealthAlertsParentPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async hasBreadcrumbs() {
    const breadbrumbs = await this.page.getByRole('list', { name: 'breadcrumbs' }).getByRole('listitem').all()
    expect(breadbrumbs).toHaveLength(1)

    await expect(this.page.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/')
  }

  async hasPageDescription() {
    await expect(
      this.page.getByText(
        'Summary of weather health alerts data in England. For more detailed data, go to the individual event pages. The Weather-Health Alerting System is provided by the UK Health Security Agency (UKHSA) in partnership with the Met Office.'
      )
    ).toBeVisible()
  }

  async hasMapLink() {
    await expect(this.page.getByRole('link', { name: 'View map of weather health alerts' })).toHaveAttribute(
      'href',
      '?v=map&type=heat'
    )
  }

  async opensMapLink() {
    await this.page.getByRole('link', { name: 'View map of weather health alerts' }).click()

    await expect(this.page.getByRole('button', { name: 'Exit map' })).toBeVisible()

    await this.page.getByRole('button', { name: 'Exit map' }).click()
  }

  async hasAlertsList() {
    await expect(
      await this.page.getByRole('list', { name: `weather health alerts` }).getByRole('listitem').all()
    ).toHaveLength(2)

    await expect(
      this.page
        .getByRole('heading', { level: 2, name: 'Cold health alerts' })
        .getByRole('link', { name: 'Cold health alerts' })
    ).toHaveAttribute('href', '/weather-health-alerts/cold')
    await expect(this.page.getByText('View all cold health alerts currently in place in England')).toBeVisible()

    await expect(
      this.page
        .getByRole('heading', { level: 2, name: 'Heat health alerts' })
        .getByRole('link', { name: 'Heat health alerts' })
    ).toHaveAttribute('href', '/weather-health-alerts/heat')
    await expect(this.page.getByText('View all heat health alerts currently in place in England')).toBeVisible()
  }

  async hasRelatedLinks() {
    await expect(this.page.getByRole('heading', { name: /Related content/, level: 2 })).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'Cold weather and Health: supporting vulnerable people' })
    ).toHaveAttribute(
      'href',
      'https://www.gov.uk/government/publications/cold-weather-and-health-supporting-vulnerable-people'
    )
    await expect(
      this.page.getByRole('link', { name: 'User guide to use the impact based Weather-Health Alerts' })
    ).toHaveAttribute(
      'href',
      'https://assets.publishing.service.gov.uk/media/653f84ff80884d0013f71d1b/User-guide-impact-based-weather-and-health-alerting-system.pdf'
    )
  }
}
