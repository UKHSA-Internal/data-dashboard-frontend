import { expect, Page } from '@playwright/test'

import { HealthAlertTypes } from '@/api/models/Alerts'

export class WeatherHealthAlertsChildPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async hasBreadcrumbs() {
    const breadbrumbs = await this.page.getByRole('list', { name: 'breadcrumbs' }).getByRole('listitem').all()
    expect(breadbrumbs).toHaveLength(2)

    await expect(this.page.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/')
    await expect(
      this.page.getByLabel('breadcrumbs').getByRole('link', { name: 'Weather health alerts', exact: true })
    ).toHaveAttribute('href', '/weather-health-alerts')
  }

  async hasPageContent(weather: HealthAlertTypes) {
    await expect(
      this.page.getByText(
        'The alerting system provides an early warning when adverse temperatures are likely to impact on the health and wellbeing of the population. The Weather-Health Alerting System is provided by the UK Health Security Agency (UKHSA) in partnership with the Met Office. It’s intended to provide early warning to the health and social care sector, the responder community, the voluntary and community sector and government departments when adverse temperatures are likely to impact on the health and wellbeing of the population. The Weather-Health Alerting System is made up of the Heat-Health Alerts (HHA) and the Cold-Health Alerts (CHA). The Weather-Health Alerting System underpins the Adverse Weather and Health Plan.'
      )
    ).toBeVisible()

    await expect(this.page.getByRole('link', { name: 'View map of weather health alerts' })).toHaveAttribute(
      'href',
      `?v=map&type=${weather}`
    )

    // TODO: Need to check list length, list needs unique label/name to best select
    // const regions = await this.page.getByRole('list').getByRole('listitem').all()
    // expect(regions).toHaveLength(9)

    await expect(this.page.getByRole('link', { name: 'North East' })).toHaveAttribute(
      'href',
      `/weather-health-alerts/${weather}/north-east`
    )
    await expect(this.page.getByRole('img', { name: `${weather} health alerts red` })).toBeVisible()
    // TODO: Check updated text within this item (getting all at the moment)
    // await expect(this.page.getByText('Updated 12:00pm on 7 May 2024')).toBeVisible()
    await expect(this.page.getByLabel(`There is currently a Red ${weather} alert status for North East`)).toBeVisible()
  }

  async hasFurtherAdviceSection() {
    await expect(this.page.getByRole('heading', { level: 3, name: 'Further advice and guidance' })).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'UKHSA Adverse Weather and Health Plan and supporting evidence' })
    ).toHaveAttribute('href', 'https://www.gov.uk/government/publications/adverse-weather-and-health-plan')
    await expect(
      this.page.getByRole('link', { name: 'Find the latest weather forecasts and warnings' })
    ).toHaveAttribute('href', 'https://www.metoffice.gov.uk/')
    await expect(
      this.page.getByRole('link', { name: 'Met Office National Severe Weather Warning Service' })
    ).toHaveAttribute('href', 'https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-warnings')
    await expect(this.page.getByRole('link', { name: 'Flood Alerts and Warnings' })).toHaveAttribute(
      'href',
      'https://check-for-flooding.service.gov.uk/alerts-and-warnings'
    )
    await expect(
      this.page.getByRole('link', { name: 'Local resilience forums: contact details guidance' })
    ).toHaveAttribute('href', 'https://www.gov.uk/guidance/local-resilience-forums-contact-details')
  }

  async hasRelatedLinks() {
    await expect(this.page.getByRole('heading', { name: /Related links/, level: 2 })).toBeVisible()
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

  // Goto from app
  // Has meta from app
  // Has breadcrumbs
  // Has title
  // Has body content
  // Has view map button
  // Has list item with 9 region items
  // Has further advice section
  // Has related links
}
