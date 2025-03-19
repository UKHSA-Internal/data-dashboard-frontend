import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../../fixtures/app.fixture'

test.describe('Influenza page', () => {
  test('Page layout', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await influenzaPage.hasMetadata()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
    await test.step('displays heading & description', async () => {
      await influenzaPage.hasHeading()
      await influenzaPage.hasDescription()
    })
    await test.step('displays area selector', async () => {
      await app.hasAreaSelector()
    })
    await test.step('displays last updated date', async () => {
      await influenzaPage.hasLastUpdated()
    })
    await test.step('displays table of contents', async () => {
      await app.hasTableOfContents(['Healthcare', 'Testing'])
    })
    await test.step('displays section headings', async () => {
      await app.hasSectionHeadings(['Healthcare', 'Testing'])
    })
    await test.step('displays chart cards for "Healthcare"', async () => {
      await app.hasTopicCard({
        name: 'Line chart with overlaying line comparing hospital admission rates of patients admitted to hospital with Influenza',
        description:
          'Weekly admissions rates of patients admitted to hospital with Influenza as a weekly time series, shown as the rate per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing Influenza hospital admission rates by age',
        description: 'Age breakdown of people admitted to hospital, shown as the rate per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart with overlaying line comparing ICU admission rates of patients admitted to hospital with Influenza',
        description:
          'Weekly admissions rates of patients admitted to ICU with Influenza as a weekly time series, shown as the rate per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing Influenza ICU admission rates by age',
        description: 'Age breakdown of people admitted to ICU, shown as the rate per 100,000 people.',
      })
    })
    await test.step('displays chart cards for "Testing"', async () => {
      7
      await app.hasTopicCard({
        name: 'Bar chart with overlaying line comparing positivity for Influenza tests',
        description:
          'Weekly admissions rates of patients admitted to hospital with Influenza as a weekly time series, shown as the rate per 100,000 people.',
      })
      await app.hasTopicCard({
        name: 'Line chart comparing weekly positivity for Influenza tests by age',
        description: 'Weekly time series of positivity for people testing positive for Influenza broken down by age.',
      })
    })

    await test.step('displays related links', async () => {
      await app.hasRelatedLinks()
    })
    await test.step('displays back to top', async () => {
      await app.hasBackToTop()
    })
  })

  test('Area selection already chosen upon visiting the page', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/respiratory-viruses/influenza?areaType=Lower+Tier+Local+Authority&areaName=Southampton')
    })
    await test.step('check the area selector is open by default', async () => {
      await app.checkAreaSelectorFormIsActive()
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('Influenza in Southampton | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await influenzaPage.hasHeading('Influenza in Southampton')
    })
    await test.step('area selector inputs are filled with a default value', async () => {
      await app.checkAreaSelectorInputMatchesValue('Area type', 'Lower Tier Local Authority')
      await app.checkAreaSelectorInputMatchesValue('Area name', 'Southampton')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('Southampton')
    })
  })

  test('Area selection after choosing a location from the form', async ({ influenzaPage, app, baseURL }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
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
      await app.waitForUrl(`${baseURL}/respiratory-viruses/influenza?areaType=Nation`)
    })
    await test.step('area name dropdown list is populated', async () => {
      await app.checkAreaSelectorDropdownOptions('Area name', ['England'])
    })
    await test.step('choose an area name', async () => {
      await app.selectAreaSelectorDropdownOption('Area name', 'England')
      await app.checkAreaSelectorInputMatchesValue('Area name', 'England')
      await app.waitForUrl(`${baseURL}/respiratory-viruses/influenza?areaType=Nation&areaName=England`)
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('Influenza in England | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await influenzaPage.hasHeading('Influenza in England')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('England')
    })
  })

  test('Area selection is reset', async ({ influenzaPage, app, baseURL }) => {
    await test.step('loads the page', async () => {
      await app.goto('/respiratory-viruses/influenza?areaType=Lower+Tier+Local+Authority&areaName=Southampton')
    })
    await test.step('check the area selector is open by default', async () => {
      await app.checkAreaSelectorFormIsActive()
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('Influenza in Southampton | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await influenzaPage.hasHeading('Influenza in Southampton')
    })
    await test.step('click reset link', async () => {
      await app.clickAreaSelectorResetLink()
      await app.waitForUrl(`${baseURL}/respiratory-viruses/influenza`)
    })
    await test.step('check the area selector is closed', async () => {
      await app.checkAreaSelectorFormIsActive(false)
    })
    await test.step('document title is reset', async () => {
      await app.hasDocumentTitle('Influenza | UKHSA data dashboard')
    })
    await test.step('page heading is reset', async () => {
      await influenzaPage.hasHeading('Influenza')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('')
    })
  })
})

const chartIdentifiers = [
  'line-chart-with-overlaying-line-comparing-hospital-admission-rates-of-patients-admitted-to-hospital-with-influenza',
  'line-chart-comparing-influenza-hospital-admission-rates-by-age',
  'line-chart-with-overlaying-line-comparing-icu-admission-rates-of-patients-admitted-to-hospital-with-influenza',
  'line-chart-comparing-influenza-icu-admission-rates-by-age',
  'bar-chart-with-overlaying-line-comparing-positivity-for-influenza-tests',
  'line-chart-comparing-weekly-positivity-for-influenza-tests-by-age',
]

test.describe('Influenza page - mobile @mobileOnly', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ influenzaPage, app }) => {
    await influenzaPage.goto()
    await app.hasNav()
  })
  test('downloads a json version of each chart', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(chartIdentifiers, 'json', 'mobile')
    })
  })

  test('downloads a csv version of each chart', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(chartIdentifiers, 'csv', 'mobile')
    })
  })
})

test.describe('Influenza page - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ influenzaPage, app }) => {
    await influenzaPage.goto()
    await app.hasNav()
  })

  test('downloads a json version of each chart', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(chartIdentifiers, 'json', 'tablet')
    })
  })

  test('downloads a csv version of each chart', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(chartIdentifiers, 'csv', 'tablet')
    })
  })
})

test.describe('Influenza page - desktop @desktopOnly', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ influenzaPage, app }) => {
    await influenzaPage.goto()
    await app.hasNav()
  })

  test('downloads a json version of each chart', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(chartIdentifiers, 'json', 'desktop')
    })
  })

  test('downloads a csv version of each chart', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('downloads charts', async () => {
      await app.canDownloadChart(chartIdentifiers, 'csv', 'desktop')
    })
  })
  test('Navigates through the chart tabs using Enter Key on keyboard', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('tabs through the tabs and navigates to the download content with Enter Key on keyboard', async () => {
      await app.navigateChartTabsByKeyboardAndSelectWithEnterKey(chartIdentifiers)
    })
  })
  test('Navigates through the chart tabs using Space Key on keyboard', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('tabs through the tabs and navigates to the download content with Space Key on keyboard', async () => {
      await app.navigateChartTabsByKeyboardAndSelectWithSpaceKey(chartIdentifiers)
    })
  })
})

test.describe('Influenza page - no JS', () => {
  test.use({ javaScriptEnabled: false })

  test('Downloads csv charts', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('downloads a csv version of each chart', async () => {
      await app.canDownloadChart(chartIdentifiers, 'csv', 'desktop')
    })
  })

  test('Downloads json charts', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
    })
    await test.step('downloads a json version of each chart', async () => {
      await app.canDownloadChart(chartIdentifiers, 'json', 'desktop')
    })
  })

  test('Area selection already chosen upon visiting the page', async ({ influenzaPage, app }) => {
    await test.step('loads the page', async () => {
      await app.goto('/respiratory-viruses/influenza?areaType=Lower+Tier+Local+Authority&areaName=Southampton')
    })
    await test.step('check the area selector is open by default', async () => {
      await app.checkAreaSelectorFormIsActive()
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('Influenza in Southampton | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await influenzaPage.hasHeading('Influenza in Southampton')
    })
    await test.step('area selector inputs are filled with a default value', async () => {
      await app.checkAreaSelectorInputMatchesValue('Area type', 'Lower Tier Local Authority')
      await app.checkAreaSelectorInputMatchesValue('Area name', 'Southampton')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('Southampton')
    })
  })

  test('Area selection after choosing a location from the form', async ({ influenzaPage, app, baseURL }) => {
    await test.step('loads the page', async () => {
      await influenzaPage.goto()
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
      await app.waitForUrl(`${baseURL}/respiratory-viruses/influenza?areaType=Nation`)
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
      await app.waitForUrl(`${baseURL}/respiratory-viruses/influenza?areaType=Nation&areaName=England`)
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('Influenza in England | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await influenzaPage.hasHeading('Influenza in England')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('England')
    })
  })

  test('Area selection is reset', async ({ influenzaPage, app, baseURL }) => {
    await test.step('loads the page', async () => {
      await app.goto('/respiratory-viruses/influenza?areaType=Lower+Tier+Local+Authority&areaName=Southampton')
    })
    await test.step('check the area selector is open by default', async () => {
      await app.checkAreaSelectorFormIsActive()
    })
    await test.step('document title shows the selected location', async () => {
      await app.hasDocumentTitle('Influenza in Southampton | UKHSA data dashboard')
    })
    await test.step('page heading shows the selected location', async () => {
      await influenzaPage.hasHeading('Influenza in Southampton')
    })
    await test.step('click reset link', async () => {
      await app.clickAreaSelectorResetLink()
    })
    await test.step('resets the url', async () => {
      await app.waitForUrl(`${baseURL}/respiratory-viruses/influenza`)
    })
    await test.step('check the area selector is closed', async () => {
      await app.checkAreaSelectorFormIsActive(false)
    })
    await test.step('document title is reset', async () => {
      await app.hasDocumentTitle('Influenza | UKHSA data dashboard')
    })
    await test.step('page heading is reset', async () => {
      await influenzaPage.hasHeading('Influenza')
    })
    await test.step('chart card images are refreshed', async () => {
      await app.checkAreaSelectorChartsRefreshedForLocation('')
    })
  })
})
