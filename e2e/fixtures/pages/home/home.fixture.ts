import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

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
    await expect(this.page).toHaveTitle(/UKHSA data dashboard/)
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
    await expect(col1.getByText('24,298')).toBeVisible()
    await expect(col1.getByText('Last 7 days')).toBeVisible()
    await expect(col1.getByText('-592 (-3%)')).toBeVisible()

    await expect(col2.getByRole('heading', { name: 'Deaths', level: 3 })).toBeVisible()
    await expect(col2.getByText('Weekly')).toBeVisible()
    await expect(col2.getByText('379')).toBeVisible()
    await expect(col2.getByText('Last 7 days')).toBeVisible()
    await expect(col2.getByText('21 (-5%)')).toBeVisible()

    await expect(col3.getByRole('heading', { name: 'Healthcare', level: 3 })).toBeVisible()
    await expect(col3.getByText('Patients admitted')).toBeVisible()
    await expect(col3.getByText('6,288')).toBeVisible()
    await expect(col3.getByText('Last 7 days')).toBeVisible()
    await expect(col3.getByText('377 (6%)')).toBeVisible()

    await expect(col4.getByRole('heading', { name: 'Vaccines', level: 3 })).toBeVisible()
    await expect(col4.getByText('Autumn booster')).toBeVisible()
    await expect(col4.getByText('4,095,083')).toBeVisible()

    await expect(col5.getByRole('heading', { name: 'Testing', level: 3 })).toBeVisible()
    await expect(col5.getByText('Virus tests positivity')).toBeVisible()
    await expect(col5.getByText('10.4%')).toBeVisible()
  }

  async hasCovid19CasesChartRowCard() {
    const card = this.covidCasesChartRowCard
    await expect(card.getByRole('heading', { name: 'Cases', level: 3 })).toBeVisible()
    await expect(card.getByText(/Positive tests reported in England/)).toBeVisible()
    await expect(card.getByText(/Up to and including 10 May 2023/)).toBeVisible()
    await expect(card.getByText('Last 7 days')).toBeVisible()
    await expect(card.getByText('722')).toBeVisible()
    await expect(card.getByText('-592 (-3%)')).toBeVisible()
    await expect(card.getByAltText('')).toBeVisible()
    await expect(card.getByRole('button', { name: 'Download' })).toBeVisible()
  }

  async hasCovid19CasesTabularData() {
    const card = this.covidCasesChartRowCard
    const name = 'Cases data for positive tests reported in England up to and including 10 May 2023'
    await expect(card.getByRole('table', { name })).toBeHidden()
    await card.getByText('View data in a tabular format').click()
    await expect(card.getByRole('table', { name })).toBeVisible()
  }

  async hasCovid19DeathsChartRowCard() {
    const card = this.covidDeathsChartRowCard
    await expect(card.getByRole('heading', { name: 'Deaths', level: 3 })).toBeVisible()
    await expect(card.getByText(/Deaths with COVID-19 on the death certificate in England/)).toBeVisible()
    await expect(card.getByText(/Up to and including 10 May 2023/)).toBeVisible()
    await expect(card.getByText('Last 7 days')).toBeVisible()
    await expect(card.getByText('379')).toBeVisible()
    await expect(card.getByText('21 (-5%)')).toBeVisible()
    await expect(card.getByAltText('')).toBeVisible()
    await expect(card.getByRole('button', { name: 'Download' })).toBeVisible()
  }

  async hasCovid19DeathsTabularData() {
    const card = this.covidDeathsChartRowCard
    const name =
      'Deaths data for deaths with COVID-19 on the death certificate in England up to and including 10 May 2023'
    await expect(card.getByRole('table', { name })).toBeHidden()
    await card.getByText('View data in a tabular format').click()
    await expect(card.getByRole('table', { name })).toBeVisible()
  }

  async hasInfluenzaHeadlineNumbersRowCard() {
    const col1 = this.influenzaHealthcareColumn
    const col2 = this.influenzaTestingColumn
    await expect(col1.getByRole('heading', { name: 'Healthcare', level: 3 })).toBeVisible()
    await expect(col1.getByText('Hospital admission rate (per 100,000)')).toBeVisible()
    await expect(col1.getByText('981,596')).toBeVisible()
    await expect(col2.getByRole('heading', { name: 'Testing', level: 3 })).toBeVisible()
    await expect(col2.getByText('Virus tests positivity')).toBeVisible()
    await expect(col2.getByText('0.26%')).toBeVisible()
  }

  async hasInfluenzaHealthareChartRowCard() {
    const card = this.influenzaHealthcareChartRowCard
    await expect(card.getByRole('heading', { name: 'Healthcare', level: 3 })).toBeVisible()
    await expect(card.getByText(/Weekly hospital admission rates for Influenza/)).toBeVisible()
    await expect(card.getByText(/Up to and including 10 May 2023/)).toBeVisible()
    await expect(card.getByText('Last 7 days')).toBeVisible()
    await expect(card.getByText('0.26')).toBeVisible()
    await expect(card.getByAltText('')).toBeVisible()
    await expect(card.getByRole('button', { name: 'Download' })).toBeVisible()
  }

  async hasInfluenzaHealthcareTabularData() {
    const card = this.influenzaHealthcareChartRowCard
    const name = 'Healthcare data for weekly hospital admission rates for Influenza up to and including 10 May 2023'
    await expect(card.getByRole('table', { name })).toBeHidden()
    await card.getByText('View data in a tabular format').click()
    await expect(card.getByRole('table', { name })).toBeVisible()
  }

  async hasInfluenzaTestingChartRowCard() {
    const card = this.influenzaTestingChartRowCard
    await expect(card.getByRole('heading', { name: 'Testing', level: 3 })).toBeVisible()
    await expect(card.getByText(/Weekly positivity/)).toBeVisible()
    await expect(card.getByText(/Up to and including 10 May 2023/)).toBeVisible()
    await expect(card.getByAltText('')).toBeVisible()
    await expect(card.getByRole('button', { name: 'Download' })).toBeVisible()
  }

  async hasInfluenzaTestingTabularData() {
    const card = this.influenzaTestingChartRowCard
    const name = 'Testing data for weekly positivity up to and including 10 May 2023'
    await expect(card.getByRole('table', { name })).toBeHidden()
    await card.getByText('View data in a tabular format').click()
    await expect(card.getByRole('table', { name })).toBeVisible()
  }
}
