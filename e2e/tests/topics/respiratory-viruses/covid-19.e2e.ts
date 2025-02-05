import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../../fixtures/app.fixture'

test.describe('COVID-19 page', () => {
  test('Page layout', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await covid19Page.goto()
    })
    await test.step('metadata is correct', async () => {
      await covid19Page.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
    await test.step('displays heading & description', async () => {
      await covid19Page.hasHeading()
      await covid19Page.hasDescription()
    })
    await test.step('displays area selector', async () => {
      await app.hasAreaSelector()
    })
    await test.step('displays last updated date', async () => {
      await covid19Page.hasLastUpdated()
    })
    await test.step('displays table of contents', async () => {
      await app.hasTableOfContents(['Cases', 'Deaths', 'Healthcare', 'Testing', 'Vaccinations'])
    })
    await test.step('displays section headings', async () => {
      await app.hasSectionHeadings(['Cases', 'Deaths', 'Healthcare', 'Testing', 'Vaccinations'])
    })
    await test.step('displays chart cards for "Cases"', async () => {
      await app.hasTopicCard({
        name: 'Cases by specimen date',
      })
      await app.hasTopicCard({
        name: '7-day case rates by specimen date',
      })
      await app.hasTopicCard({
        name: 'Case rates by age',
      })
    })
    await test.step('displays chart cards for "Deaths"', async () => {
      await app.hasTopicCard({
        name: 'Daily deaths with COVID-19 on the death certificate by date of death',
      })
    })
    await test.step('displays chart cards for "Healthcare"', async () => {
      await app.hasTopicCard({
        name: 'Bar chart with overlaying line comparing patients admitted to hospital with COVID-19',
      })
      await app.hasTopicCard({
        name: 'Patients in hospital',
      })
      await app.hasTopicCard({
        name: 'Admissions rate by age',
      })
      await app.hasTopicCard({
        name: 'Patients in mechanical ventilation beds',
      })
    })
    await test.step('displays chart cards for "Testing"', async () => {
      await app.hasTopicCard({
        name: 'Total daily number of PCR tests reported',
      })
      await app.hasTopicCard({
        name: 'Weekly positivity of people receiving a PCR test',
      })
    })
    await test.step('displays chart cards for "Vaccinations"', async () => {
      await app.hasTopicCard({
        name: 'People aged 50 and over who have received autumn booster vaccinations, by vaccination date',
      })
      await app.hasTopicCard({
        name: 'Autumn booster vaccination uptake (50+), by vaccination date',
      })
      await app.hasTopicCard({
        name: 'People aged 75 and over who have received spring booster vaccinations, by vaccination date',
      })
      await app.hasTopicCard({
        name: 'Spring booster vaccination uptake (75+), by vaccination date',
      })
    })
    await test.step('displays related links', async () => {
      await app.hasRelatedLinks()
    })
    await test.step('displays back to top', async () => {
      await app.hasBackToTop()
    })
  })

  test('Area selection already chosen upon visiting the page', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/topics/covid-19?areaType=Lower+Tier+Local+Authority&areaName=Southampton')
    })
    await test.step('check the area selector is open by default', async () => {
      await app.checkAreaSelectorFormIsActive()
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('COVID-19 in Southampton | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await covid19Page.hasHeading('COVID-19 in Southampton')
    })
    await test.step('area selector inputs are filled with a default value', async () => {
      await app.checkAreaSelectorInputMatchesValue('Area type', 'Lower Tier Local Authority')
      await app.checkAreaSelectorInputMatchesValue('Area name', 'Southampton')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('Southampton')
    })
  })

  test('Area selection after choosing a location from the form', async ({ covid19Page, app, baseURL }) => {
    await test.step('loads the page', async () => {
      await covid19Page.goto()
    })
    await test.step('open the area selector', async () => {
      await app.clickAreaSelectorToggle()
    })
    await test.step('check the area selector is open', async () => {
      await app.checkAreaSelectorFormIsActive()
    })
    await test.step('area type dropdown defaults to unselected', async () => {
      await app.checkAreaSelectorInputMatchesValue('Area type', '')
    })
    await test.step('area type dropdown list is populated', async () => {
      await app.checkAreaSelectorDropdownOptions('Area type', ['Nation', 'Lower Tier Local Authority'])
    })
    await test.step('area name dropdown defaults to unselected', async () => {
      await app.checkAreaSelectorInputMatchesValue('Area name', '')
    })
    await test.step('area name dropdown list is disabled whilst no area type is selected', async () => {
      await app.checkAreaSelectorAreaNameIsDisabled()
    })
    await test.step('choose an area type', async () => {
      await app.selectAreaSelectorDropdownOption('Area type', 'Nation')
      await app.checkAreaSelectorInputMatchesValue('Area type', 'Nation')
      await app.waitForUrl(`${baseURL}/topics/covid-19?areaType=Nation`)
    })
    await test.step('area name dropdown list is populated', async () => {
      await app.checkAreaSelectorDropdownOptions('Area name', ['England'])
    })
    await test.step('choose an area name', async () => {
      await app.selectAreaSelectorDropdownOption('Area name', 'England')
      await app.checkAreaSelectorInputMatchesValue('Area name', 'England')
      await app.waitForUrl(`${baseURL}/topics/covid-19?areaType=Nation&areaName=England`)
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('COVID-19 in England | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await covid19Page.hasHeading('COVID-19 in England')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('England')
    })
  })

  test('Area selection is reset', async ({ covid19Page, app, baseURL }) => {
    await test.step('loads the page', async () => {
      await app.goto('/topics/covid-19?areaType=Lower+Tier+Local+Authority&areaName=Southampton')
    })
    await test.step('check the area selector is open by default', async () => {
      await app.checkAreaSelectorFormIsActive()
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('COVID-19 in Southampton | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await covid19Page.hasHeading('COVID-19 in Southampton')
    })
    await test.step('click reset link', async () => {
      await app.clickAreaSelectorResetLink()
      await app.waitForUrl(`${baseURL}/topics/covid-19`)
    })
    await test.step('check the area selector is closed', async () => {
      await app.checkAreaSelectorFormIsActive(false)
    })
    await test.step('document title is reset', async () => {
      await app.hasDocumentTitle('COVID-19 | UKHSA data dashboard')
    })
    await test.step('page heading is reset', async () => {
      await covid19Page.hasHeading('COVID-19')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('')
    })
  })

  test('Area selection for a location with special characters', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await app.goto(
        '/topics/covid-19?areaType=NHS+Trust&areaName=Birmingham+Women%27s+and+Children%27s+NHS+Foundation+Trust'
      )
    })
    await test.step('check the area selector is open by default', async () => {
      await app.checkAreaSelectorFormIsActive()
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle(
        "COVID-19 in Birmingham Women's and Children's NHS Foundation Trust | UKHSA data dashboard"
      )
    })
    await test.step('page heading shows the selected location', async () => {
      await covid19Page.hasHeading("COVID-19 in Birmingham Women's and Children's NHS Foundation Trust")
    })
  })
})

test.describe('COVID-19 page - mobile @mobileOnly', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ covid19Page, app }) => {
    await covid19Page.goto()
    await app.hasNav()
  })

  test('Downloads a csv version of each chart', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await covid19Page.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(
        [
          'cases-by-specimen-date',
          '7-day-case-rates-by-specimen-date',
          'case-rates-by-age',
          'daily-deaths-with-covid-19-on-the-death-certificate-by-date-of-death',
          'bar-chart-with-overlaying-line-comparing-patients-admitted-to-hospital-with-covid-19',
          'patients-in-hospital',
          'admissions-rate-by-age',
          'patients-in-mechanical-ventilation-beds',
          'total-daily-number-of-pcr-tests-reported',
          'weekly-positivity-of-people-receiving-a-pcr-test',
          'people-aged-50-and-over-who-have-received-autumn-booster-vaccinations-by-vaccination-date',
          'autumn-booster-vaccination-uptake-50-by-vaccination-date',
          'people-aged-75-and-over-who-have-received-spring-booster-vaccinations-by-vaccination-date',
          'spring-booster-vaccination-uptake-75-by-vaccination-date',
        ],
        'csv',
        'mobile'
      )
    })
  })

  test('Downloads a json version of each chart', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await covid19Page.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(
        [
          'cases-by-specimen-date',
          '7-day-case-rates-by-specimen-date',
          'case-rates-by-age',
          'daily-deaths-with-covid-19-on-the-death-certificate-by-date-of-death',
          'bar-chart-with-overlaying-line-comparing-patients-admitted-to-hospital-with-covid-19',
          'patients-in-hospital',
          'admissions-rate-by-age',
          'patients-in-mechanical-ventilation-beds',
          'total-daily-number-of-pcr-tests-reported',
          'weekly-positivity-of-people-receiving-a-pcr-test',
          'people-aged-50-and-over-who-have-received-autumn-booster-vaccinations-by-vaccination-date',
          'autumn-booster-vaccination-uptake-50-by-vaccination-date',
          'people-aged-75-and-over-who-have-received-spring-booster-vaccinations-by-vaccination-date',
          'spring-booster-vaccination-uptake-75-by-vaccination-date',
        ],
        'json',
        'mobile'
      )
    })
  })
})

test.describe('COVID-19 page - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ covid19Page, app }) => {
    await covid19Page.goto()
    await app.hasNav()
  })

  test('Downloads a csv version of each chart', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await covid19Page.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(
        [
          'cases-by-specimen-date',
          '7-day-case-rates-by-specimen-date',
          'case-rates-by-age',
          'daily-deaths-with-covid-19-on-the-death-certificate-by-date-of-death',
          'bar-chart-with-overlaying-line-comparing-patients-admitted-to-hospital-with-covid-19',
          'patients-in-hospital',
          'admissions-rate-by-age',
          'patients-in-mechanical-ventilation-beds',
          'total-daily-number-of-pcr-tests-reported',
          'weekly-positivity-of-people-receiving-a-pcr-test',
          'people-aged-50-and-over-who-have-received-autumn-booster-vaccinations-by-vaccination-date',
          'autumn-booster-vaccination-uptake-50-by-vaccination-date',
          'people-aged-75-and-over-who-have-received-spring-booster-vaccinations-by-vaccination-date',
          'spring-booster-vaccination-uptake-75-by-vaccination-date',
        ],
        'csv',
        'tablet'
      )
    })
  })

  test('Downloads a json version of each chart', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await covid19Page.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(
        [
          'cases-by-specimen-date',
          '7-day-case-rates-by-specimen-date',
          'case-rates-by-age',
          'daily-deaths-with-covid-19-on-the-death-certificate-by-date-of-death',
          'bar-chart-with-overlaying-line-comparing-patients-admitted-to-hospital-with-covid-19',
          'patients-in-hospital',
          'admissions-rate-by-age',
          'patients-in-mechanical-ventilation-beds',
          'total-daily-number-of-pcr-tests-reported',
          'weekly-positivity-of-people-receiving-a-pcr-test',
          'people-aged-50-and-over-who-have-received-autumn-booster-vaccinations-by-vaccination-date',
          'autumn-booster-vaccination-uptake-50-by-vaccination-date',
          'people-aged-75-and-over-who-have-received-spring-booster-vaccinations-by-vaccination-date',
          'spring-booster-vaccination-uptake-75-by-vaccination-date',
        ],
        'json',
        'tablet'
      )
    })
  })
})

test.describe('COVID-19 page - desktop @desktopOnly', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ covid19Page, app }) => {
    await covid19Page.goto()
    await app.hasNav()
  })

  test('Downloads a csv version of each chart', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await covid19Page.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(
        [
          'cases-by-specimen-date',
          '7-day-case-rates-by-specimen-date',
          'case-rates-by-age',
          'daily-deaths-with-covid-19-on-the-death-certificate-by-date-of-death',
          'bar-chart-with-overlaying-line-comparing-patients-admitted-to-hospital-with-covid-19',
          'patients-in-hospital',
          'admissions-rate-by-age',
          'patients-in-mechanical-ventilation-beds',
          'total-daily-number-of-pcr-tests-reported',
          'weekly-positivity-of-people-receiving-a-pcr-test',
          'people-aged-50-and-over-who-have-received-autumn-booster-vaccinations-by-vaccination-date',
          'autumn-booster-vaccination-uptake-50-by-vaccination-date',
          'people-aged-75-and-over-who-have-received-spring-booster-vaccinations-by-vaccination-date',
          'spring-booster-vaccination-uptake-75-by-vaccination-date',
        ],
        'csv',
        'desktop'
      )
    })
  })

  test('Downloads a json version of each chart', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await covid19Page.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(
        [
          'cases-by-specimen-date',
          '7-day-case-rates-by-specimen-date',
          'case-rates-by-age',
          'daily-deaths-with-covid-19-on-the-death-certificate-by-date-of-death',
          'bar-chart-with-overlaying-line-comparing-patients-admitted-to-hospital-with-covid-19',
          'patients-in-hospital',
          'admissions-rate-by-age',
          'patients-in-mechanical-ventilation-beds',
          'total-daily-number-of-pcr-tests-reported',
          'weekly-positivity-of-people-receiving-a-pcr-test',
          'people-aged-50-and-over-who-have-received-autumn-booster-vaccinations-by-vaccination-date',
          'autumn-booster-vaccination-uptake-50-by-vaccination-date',
          'people-aged-75-and-over-who-have-received-spring-booster-vaccinations-by-vaccination-date',
          'spring-booster-vaccination-uptake-75-by-vaccination-date',
        ],
        'json',
        'desktop'
      )
    })
  })
})

test.describe('COVID-19 page - no JS', () => {
  test.use({ javaScriptEnabled: false })

  test('Downloads csv charts', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await covid19Page.goto()
    })
    await test.step('downloads a csv version of each chart', async () => {
      await app.canDownloadChart(
        [
          'cases-by-specimen-date',
          '7-day-case-rates-by-specimen-date',
          'case-rates-by-age',
          'daily-deaths-with-covid-19-on-the-death-certificate-by-date-of-death',
          'bar-chart-with-overlaying-line-comparing-patients-admitted-to-hospital-with-covid-19',
          'patients-in-hospital',
          'admissions-rate-by-age',
          'patients-in-mechanical-ventilation-beds',
          'total-daily-number-of-pcr-tests-reported',
          'weekly-positivity-of-people-receiving-a-pcr-test',
          'people-aged-50-and-over-who-have-received-autumn-booster-vaccinations-by-vaccination-date',
          'autumn-booster-vaccination-uptake-50-by-vaccination-date',
          'people-aged-75-and-over-who-have-received-spring-booster-vaccinations-by-vaccination-date',
          'spring-booster-vaccination-uptake-75-by-vaccination-date',
        ],
        'csv',
        'desktop'
      )
    })
  })

  test('Downloads json charts', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await covid19Page.goto()
    })
    await test.step('downloads a csv version of each chart', async () => {
      await app.canDownloadChart(
        [
          'cases-by-specimen-date',
          '7-day-case-rates-by-specimen-date',
          'case-rates-by-age',
          'daily-deaths-with-covid-19-on-the-death-certificate-by-date-of-death',
          'bar-chart-with-overlaying-line-comparing-patients-admitted-to-hospital-with-covid-19',
          'patients-in-hospital',
          'admissions-rate-by-age',
          'patients-in-mechanical-ventilation-beds',
          'total-daily-number-of-pcr-tests-reported',
          'weekly-positivity-of-people-receiving-a-pcr-test',
          'people-aged-50-and-over-who-have-received-autumn-booster-vaccinations-by-vaccination-date',
          'autumn-booster-vaccination-uptake-50-by-vaccination-date',
          'people-aged-75-and-over-who-have-received-spring-booster-vaccinations-by-vaccination-date',
          'spring-booster-vaccination-uptake-75-by-vaccination-date',
        ],
        'json',
        'desktop'
      )
    })
  })

  test('Area selection already chosen upon visiting the page', async ({ covid19Page, app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/topics/covid-19?areaType=Lower+Tier+Local+Authority&areaName=Southampton')
    })
    await test.step('check the area selector is open by default', async () => {
      await app.checkAreaSelectorFormIsActive()
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('COVID-19 in Southampton | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await covid19Page.hasHeading('COVID-19 in Southampton')
    })
    await test.step('area selector inputs are filled with a default value', async () => {
      await app.checkAreaSelectorInputMatchesValue('Area type', 'Lower Tier Local Authority')
      await app.checkAreaSelectorInputMatchesValue('Area name', 'Southampton')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('Southampton')
    })
  })

  test('Area selection after choosing a location from the form', async ({ covid19Page, app, baseURL }) => {
    await test.step('loads the page', async () => {
      await covid19Page.goto()
    })
    await test.step('open the area selector', async () => {
      await app.clickAreaSelectorToggle()
    })
    await test.step('check the area selector is open', async () => {
      await app.checkAreaSelectorFormIsActive()
    })
    await test.step('area type dropdown defaults to unselected', async () => {
      await app.checkAreaSelectorInputMatchesValue('Area type', '')
    })
    await test.step('area type dropdown list is populated', async () => {
      await app.checkAreaSelectorDropdownOptions('Area type', ['Nation', 'Lower Tier Local Authority'])
    })
    await test.step('area name dropdown defaults to unselected', async () => {
      await app.checkAreaSelectorInputMatchesValue('Area name', '')
    })
    await test.step('area name dropdown list is disabled whilst no area type is selected', async () => {
      await app.checkAreaSelectorAreaNameIsDisabled()
    })
    await test.step('choose an area type', async () => {
      await app.selectAreaSelectorDropdownOption('Area type', 'Nation')
      await app.checkAreaSelectorInputMatchesValue('Area type', 'Nation')
    })
    await test.step('submit the form', async () => {
      await app.submitAreaSelectorForm()
    })
    await test.step('resets the url', async () => {
      await app.waitForUrl(`${baseURL}/topics/covid-19?areaType=Nation`)
    })
    await test.step('area name dropdown list is populated', async () => {
      await app.checkAreaSelectorDropdownOptions('Area name', ['England'])
    })
    await test.step('choose an area name', async () => {
      await app.selectAreaSelectorDropdownOption('Area name', 'England')
      await app.checkAreaSelectorInputMatchesValue('Area name', 'England')
    })
    await test.step('submit the form', async () => {
      await app.submitAreaSelectorForm()
    })
    await test.step('resets the url', async () => {
      await app.waitForUrl(`${baseURL}/topics/covid-19?areaType=Nation&areaName=England`)
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('COVID-19 in England | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await covid19Page.hasHeading('COVID-19 in England')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('England')
    })
  })

  test('Area selection is reset', async ({ covid19Page, app, baseURL }) => {
    await test.step('loads the page', async () => {
      await app.goto('/topics/covid-19?areaType=Lower+Tier+Local+Authority&areaName=Southampton')
    })
    await test.step('check the area selector is open by default', async () => {
      await app.checkAreaSelectorFormIsActive()
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('COVID-19 in Southampton | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await covid19Page.hasHeading('COVID-19 in Southampton')
    })
    await test.step('click reset link', async () => {
      await app.clickAreaSelectorResetLink()
    })
    await test.step('resets the url', async () => {
      await app.waitForUrl(`${baseURL}/topics/covid-19`)
    })
    await test.step('check the area selector is closed', async () => {
      await app.checkAreaSelectorFormIsActive(false)
    })
    await test.step('document title is reset', async () => {
      await app.hasDocumentTitle('COVID-19 | UKHSA data dashboard')
    })
    await test.step('page heading is reset', async () => {
      await covid19Page.hasHeading('COVID-19')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('')
    })
  })
})
