import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

type ChartRowCardTestOptions = Partial<{
  javaScriptEnabled: boolean
}>

export class HomePage {
  readonly page: Page

  readonly covidSection: Locator
  readonly covidHeadlineRow: Locator
  readonly covidCasesColumn: Locator
  readonly covidDeathsColumn: Locator
  readonly covidHealthcareColumn: Locator
  readonly covidVaccinesColumn: Locator
  readonly covidTestingColumn: Locator
  readonly covidCasesChartRowCard: Locator
  readonly covidDeathsChartRowCard: Locator

  readonly influenzaSection: Locator
  readonly influenzaHeadlineRow: Locator
  readonly influenzaHealthcareColumn: Locator
  readonly influenzaTestingColumn: Locator
  readonly influenzaHealthcareChartRowCard: Locator
  readonly influenzaTestingChartRowCard: Locator

  constructor(page: Page) {
    this.page = page

    this.covidSection = page.getByTestId('section-covid-19')
    this.covidHeadlineRow = this.covidSection.getByTestId('headline-row')
    this.covidCasesColumn = this.covidHeadlineRow.getByTestId('headline-column-cases')
    this.covidDeathsColumn = this.covidHeadlineRow.getByTestId('headline-column-deaths')
    this.covidHealthcareColumn = this.covidHeadlineRow.getByTestId('headline-column-healthcare')
    this.covidVaccinesColumn = this.covidHeadlineRow.getByTestId('headline-column-vaccines')
    this.covidTestingColumn = this.covidHeadlineRow.getByTestId('headline-column-testing')
    this.covidCasesChartRowCard = this.covidSection.getByTestId('chart-row-card-cases')
    this.covidDeathsChartRowCard = this.covidSection.getByTestId('chart-row-card-deaths')

    this.influenzaSection = page.getByTestId('section-influenza')
    this.influenzaHeadlineRow = this.influenzaSection.getByTestId('headline-row')
    this.influenzaHealthcareColumn = this.influenzaHeadlineRow.getByTestId('headline-column-healthcare')
    this.influenzaTestingColumn = this.influenzaHeadlineRow.getByTestId('headline-column-testing')
    this.influenzaHealthcareChartRowCard = this.influenzaSection.getByTestId('chart-row-card-healthcare')
    this.influenzaTestingChartRowCard = this.influenzaSection.getByTestId('chart-row-card-testing')
  }

  async goto() {
    await this.page.goto('/')
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
    await expect(this.page.getByRole('heading', { name: /UKHSA data dashboard/, level: 1 })).toBeVisible()
  }

  async hasNotLastUpdated() {
    await expect(this.page.getByText(/Last updated/)).toBeHidden()
  }

  async hasWelcomeText() {
    await expect(this.page.getByText(/Welcome/)).toBeVisible()
  }

  async hasPageDescription() {
    await expect(
      this.page.getByText(
        'The UKHSA data dashboard shows public health data across England. It builds on the success and is an iteration of the COVID-19 in the UK dashboard.'
      )
    ).toBeVisible()
  }

  async hasSectionHeadingsAndDescription() {
    const covid19Heading = this.page.getByRole('heading', { name: /COVID-19/, level: 2 })
    await expect(covid19Heading).toBeVisible()
    await expect(covid19Heading.getByRole('link', { name: /COVID-19/ })).toHaveAttribute('href', '/topics/covid-19')
    await expect(
      this.page.getByText(/Summary of COVID-19 data. For more detailed data, go to the COVID-19 page./)
    ).toBeVisible()

    const influnzaHeading = this.page.getByRole('heading', { name: /Influenza/, level: 2 })
    await expect(influnzaHeading).toBeVisible()
    await expect(influnzaHeading.getByRole('link', { name: /Influenza/ })).toHaveAttribute('href', '/topics/influenza')
    await expect(
      this.page.getByText(/Summary of influenza data. For more detailed data, go to the influenza page./)
    ).toBeVisible()
  }

  async hasCovid19HeadlineNumbersRowCard() {
    const col1 = this.covidCasesColumn
    const col2 = this.covidDeathsColumn
    const col3 = this.covidHealthcareColumn
    const col4 = this.covidVaccinesColumn
    const col5 = this.covidTestingColumn

    await expect(col1.getByRole('heading', { name: 'Cases', level: 3 })).toBeVisible()
    await expect(col1.getByText('Weekly')).toBeVisible()
    await expect(col1.getByText('Up to 3 Nov 2023')).toBeVisible()
    await expect(col1.getByText('24,298')).toBeVisible()
    await expect(col1.getByText('Last 7 days')).toBeVisible()
    await expect(col1.getByText('Up to 4 Nov 2023')).toBeVisible()
    await expect(col1.getByText('-592 (-3%)')).toBeVisible()

    await expect(col2.getByRole('heading', { name: 'Deaths', level: 3 })).toBeVisible()
    await expect(col2.getByText('Weekly')).toBeVisible()
    await expect(col2.getByText('Up to 3 Nov 2023')).toBeVisible()
    await expect(col2.getByText('379')).toBeVisible()
    await expect(col2.getByText('Last 7 days')).toBeVisible()
    await expect(col2.getByText('Up to 4 Nov 2023')).toBeVisible()
    await expect(col2.getByText('21 (-5%)')).toBeVisible()

    await expect(col3.getByRole('heading', { name: 'Healthcare', level: 3 })).toBeVisible()
    await expect(col3.getByText('Patients admitted')).toBeVisible()
    await expect(col3.getByText('Up to 3 Nov 2023')).toBeVisible()
    await expect(col3.getByText('6,288')).toBeVisible()
    await expect(col3.getByText('Last 7 days')).toBeVisible()
    await expect(col2.getByText('Up to 4 Nov 2023')).toBeVisible()
    await expect(col3.getByText('377 (6%)')).toBeVisible()

    await expect(col4.getByRole('heading', { name: 'Vaccines', level: 3 })).toBeVisible()
    await expect(col4.getByText('Autumn booster')).toBeVisible()
    await expect(col4.getByText('Up to 3 Nov 2023')).toBeVisible()
    await expect(col4.getByText('4,095,083')).toBeVisible()

    await expect(col5.getByRole('heading', { name: 'Testing', level: 3 })).toBeVisible()
    await expect(col5.getByText('Virus tests positivity')).toBeVisible()
    await expect(col5.getByText('Up to 3 Nov 2023')).toBeVisible()
    await expect(col5.getByText('10.4%')).toBeVisible()
  }

  async hasCovid19CasesChartRowCard({ javaScriptEnabled }: ChartRowCardTestOptions = { javaScriptEnabled: true }) {
    const card = this.covidCasesChartRowCard
    await expect(card.getByRole('heading', { name: 'Cases', level: 3 })).toBeVisible()
    await expect(card.getByText(/Positive tests reported in England/)).toBeVisible()
    await expect(card.getByRole('heading', { level: 4, name: /Up to and including 10 May 2023/ })).toBeVisible()
    await expect(card.getByRole('tablist')).toBeVisible()
    await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'true')
    await expect(card.getByText('Last 7 days')).toBeVisible()
    await expect(card.getByText('Up to 3 Nov 2023')).toBeHidden()
    await expect(card.getByText('722')).toBeVisible()
    await expect(card.getByText('Up to 4 Nov 2023')).toBeHidden()
    await expect(card.getByText('-592 (-3%)')).toBeVisible()
    await expect(card.getByAltText('Mocked alt text - Refer to tabular data.')).toBeVisible()

    if (javaScriptEnabled) {
      await card.getByRole('tab', { name: 'Tabular data' }).click()
      await expect(card.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'true')
      await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'false')
    }

    const name = 'Cases data for positive tests reported in England Up to and including 10 May 2023'
    await expect(card.getByRole('table', { name })).toBeVisible()

    if (javaScriptEnabled) {
      await card.getByRole('tab', { name: 'Download' }).click()
      await expect(card.getByRole('tab', { name: 'Download' })).toHaveAttribute('aria-selected', 'true')
      await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'false')
      await expect(card.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'false')
    }

    await expect(card.getByRole('heading', { name: 'Download data', level: 3 })).toBeVisible()
    await expect(card.getByText('Select format')).toBeVisible()
    await expect(card.getByLabel('CSV')).toBeChecked()
    await expect(card.getByLabel('JSON')).toBeVisible()
    await expect(card.getByRole('button', { name: 'Download' })).toBeVisible()
  }

  async hasCovid19DeathsChartRowCard({ javaScriptEnabled }: ChartRowCardTestOptions = { javaScriptEnabled: true }) {
    const card = this.covidDeathsChartRowCard
    await expect(card.getByRole('heading', { name: 'Deaths', level: 3 })).toBeVisible()
    await expect(card.getByText(/Deaths with COVID-19 on the death certificate in England/)).toBeVisible()
    await expect(card.getByRole('heading', { level: 4, name: /Up to and including 10 May 2023/ })).toBeVisible()
    await expect(card.getByRole('tablist')).toBeVisible()
    await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'true')
    await expect(card.getByText('Last 7 days')).toBeVisible()
    await expect(card.getByText('Up to 3 Nov 2023')).toBeHidden()
    await expect(card.getByText('379')).toBeVisible()
    await expect(card.getByText('Up to 4 Nov 2023')).toBeHidden()
    await expect(card.getByText('21 (-5%)')).toBeVisible()
    await expect(card.getByAltText('Mocked alt text - Refer to tabular data.')).toBeVisible()

    if (javaScriptEnabled) {
      await card.getByRole('tab', { name: 'Tabular data' }).click()
      await expect(card.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'true')
      await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'false')
    }

    const name =
      'Deaths data for deaths with COVID-19 on the death certificate in England Up to and including 10 May 2023'
    await expect(card.getByRole('table', { name })).toBeVisible()

    if (javaScriptEnabled) {
      await card.getByRole('tab', { name: 'Download' }).click()
      await expect(card.getByRole('tab', { name: 'Download' })).toHaveAttribute('aria-selected', 'true')
      await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'false')
      await expect(card.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'false')
    }

    await expect(card.getByRole('heading', { name: 'Download data', level: 3 })).toBeVisible()
    await expect(card.getByText('Select format')).toBeVisible()
    await expect(card.getByLabel('CSV')).toBeChecked()
    await expect(card.getByLabel('JSON')).toBeVisible()
    await expect(card.getByRole('button', { name: 'Download' })).toBeVisible()
  }

  async hasInfluenzaHeadlineNumbersRowCard() {
    const col1 = this.influenzaHealthcareColumn
    const col2 = this.influenzaTestingColumn
    await expect(col1.getByRole('heading', { name: 'Healthcare', level: 3 })).toBeVisible()
    await expect(col1.getByText('Hospital admission rate (per 100,000)')).toBeVisible()
    await expect(col1.getByText('Up to 3 Nov 2023')).toBeVisible()
    await expect(col1.getByText('981,596')).toBeVisible()
    await expect(col2.getByRole('heading', { name: 'Testing', level: 3 })).toBeVisible()
    await expect(col2.getByText('Virus tests positivity')).toBeVisible()
    await expect(col2.getByText('Up to 3 Nov 2023')).toBeVisible()
    await expect(col2.getByText('0.26%')).toBeVisible()
  }

  async hasInfluenzaHealthareChartRowCard(
    { javaScriptEnabled }: ChartRowCardTestOptions = { javaScriptEnabled: true }
  ) {
    const card = this.influenzaHealthcareChartRowCard
    await expect(card.getByRole('heading', { name: 'Healthcare', level: 3 })).toBeVisible()
    await expect(card.getByText(/Weekly hospital admission rates for Influenza/)).toBeVisible()
    await expect(card.getByRole('heading', { level: 4, name: /Up to and including 10 May 2023/ })).toBeVisible()
    await expect(card.getByRole('tablist')).toBeVisible()
    await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'true')
    await expect(card.getByText('Last 7 days')).toBeVisible()
    await expect(card.getByText('Up to 3 Nov 2023')).toBeHidden()
    await expect(card.getByText('0.26')).toBeVisible()
    await expect(card.getByAltText('Mocked alt text - Refer to tabular data.')).toBeVisible()

    if (javaScriptEnabled) {
      await card.getByRole('tab', { name: 'Tabular data' }).click()
      await expect(card.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'true')
      await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'false')
    }

    const name = 'Healthcare data for weekly hospital admission rates for Influenza Up to and including 10 May 2023'
    await expect(card.getByRole('table', { name })).toBeVisible()

    if (javaScriptEnabled) {
      await card.getByRole('tab', { name: 'Download' }).click()
      await expect(card.getByRole('tab', { name: 'Download' })).toHaveAttribute('aria-selected', 'true')
      await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'false')
      await expect(card.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'false')
    }

    await expect(card.getByRole('heading', { name: 'Download data', level: 3 })).toBeVisible()
    await expect(card.getByText('Select format')).toBeVisible()
    await expect(card.getByLabel('CSV')).toBeChecked()
    await expect(card.getByLabel('JSON')).toBeVisible()
    await expect(card.getByRole('button', { name: 'Download' })).toBeVisible()
  }

  async hasInfluenzaTestingChartRowCard({ javaScriptEnabled }: ChartRowCardTestOptions = { javaScriptEnabled: true }) {
    const card = this.influenzaTestingChartRowCard
    await expect(card.getByRole('heading', { name: 'Testing', level: 3 })).toBeVisible()
    await expect(card.getByText(/Weekly positivity/)).toBeVisible()
    await expect(card.getByRole('heading', { level: 4, name: /Up to and including 10 May 2023/ })).toBeVisible()
    await expect(card.getByRole('tablist')).toBeVisible()
    await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'true')
    await expect(card.getByAltText('Mocked alt text - Refer to tabular data.')).toBeVisible()

    if (javaScriptEnabled) {
      await card.getByRole('tab', { name: 'Tabular data' }).click()
      await expect(card.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'true')
      await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'false')
    }

    const name = 'Testing data for weekly positivity Up to and including 10 May 2023'
    await expect(card.getByRole('table', { name })).toBeVisible()

    if (javaScriptEnabled) {
      await card.getByRole('tab', { name: 'Download' }).click()
      await expect(card.getByRole('tab', { name: 'Download' })).toHaveAttribute('aria-selected', 'true')
      await expect(card.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'false')
      await expect(card.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'false')
    }

    await expect(card.getByRole('heading', { name: 'Download data', level: 3 })).toBeVisible()
    await expect(card.getByText('Select format')).toBeVisible()
    await expect(card.getByLabel('CSV')).toBeChecked()
    await expect(card.getByLabel('JSON')).toBeVisible()
    await expect(card.getByRole('button', { name: 'Download' })).toBeVisible()
  }

  async hasCategories(categories: string[]) {
    for (const name of categories) {
      await expect(this.page.getByRole('region', { name })).toBeVisible()
    }
  }

  async hasHealthTopicColumns(columns: string[]) {
    const section = this.page.getByRole('region', { name: 'Health topics' })

    await expect(await section.getByTestId('chart-row-cards').getByRole('heading', { level: 3 }).count()).toEqual(
      columns.length
    )

    for (const name of columns) {
      await expect(
        section.getByTestId('chart-row-cards').getByRole('heading', { level: 3, name }).isVisible
      ).toBeTruthy()
    }
  }

  async hasHealthTopicCard(
    name: string,
    { tagline, trendPercent, trendDescription }: { tagline: string; trendPercent: string; trendDescription: string }
  ) {
    const section = this.page.getByRole('region', { name: 'Health topics' })
    const card = section.getByRole('link', { name })

    await expect(card.getByRole('heading', { name })).toBeVisible()
    await expect(card.getByText(tagline)).toBeVisible()
    await expect(card.getByTestId('chart-image')).toBeVisible()
    await expect(card.getByText(trendPercent, { exact: true })).toBeVisible()
    await expect(card.getByText(trendDescription, { exact: true })).toBeVisible()
  }

  async hasWeatherHealthAlertsCard(name: string, { tagline, map = true }: { tagline: string; map?: boolean }) {
    const section = this.page.getByRole('region', { name: 'Weather health alerts' })
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
    await expect(await regions.getByRole('listitem').all()).toHaveLength(9)
    await expect(card.getByRole('button', { name: 'Enter fullscreen' })).toBeVisible()
  }

  async clickMinimapCard(name: string) {
    const section = this.page.getByRole('region', { name: 'Weather health alerts' })
    const card = section.getByRole('link', { name })
    await card.click()
  }

  async clickMinimapCardRegionByMap(name: string, regionId: string) {
    const section = this.page.getByRole('region', { name: 'Weather health alerts' })
    const card = section.getByRole('link', { name })
    const map = card.getByRole('application', { name: 'Map of weather health alerts' })
    await expect(map).toBeVisible()
    const region = map.getByTestId(`feature-${regionId}`)
    await expect(region).toBeVisible()
    await region.click()
  }
}
