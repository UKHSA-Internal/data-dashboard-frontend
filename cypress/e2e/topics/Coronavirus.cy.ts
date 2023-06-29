import 'cypress-axe'

describe('Coronavirus topic page', () => {
  beforeEach(() => {
    cy.visit('/choose-topic/coronavirus')
    cy.injectAxe()
  })

  it('has no detectable a11y violations', () => {
    cy.checkA11y('html', {
      rules: {
        'document-title': { enabled: false },
        'html-has-lang': { enabled: false },
        region: { enabled: false },
      },
    })
  })

  it('displays an accordion with additional virus information', () => {
    cy.checkAccordionExists()
  })

  it('displays related links', () => {
    cy.checkRelatedLinksExist()
  })

  it('displays a title, description and last updated date', () => {
    cy.title().should('eq', 'Coronavirus')
    cy.findByRole('heading', { name: 'Coronavirus', level: 1 })
    cy.findByText(/Last updated on Tuesday, 21 March 2023/)
    cy.findByText('Data and insights from the UKHSA on Coronavirus.')
    cy.findByRole('link', { name: 'See the simple summary for England (opens in a new tab).' })
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', 'https://www.gov.uk/government/organisations/uk-health-security-agency')
    cy.findByRole('link', { name: 'Back' }).should('have.attr', 'href', '/choose-topic')
  })

  it('displays all sections correctly', () => {
    // Contents
    cy.findByRole('navigation', {
      name: 'Contents',
    }).as('contents')

    cy.get('@contents').within(() => {
      cy.findByRole('link', { name: 'Cases' })
      cy.findByRole('link', { name: 'Deaths' })
      cy.findByRole('link', { name: 'Healthcare' })
      cy.findByRole('link', { name: 'Testing' })
      cy.findByRole('link', { name: 'Vaccinations' })
    })

    // Go to Cases section
    cy.get('@contents').within(() => {
      cy.findByRole('link', { name: 'Cases' }).click()
    })

    cy.findByRole('heading', { name: 'Cases', level: 2 }).parent().should('have.focus')
    cy.url().should('eql', `${Cypress.config().baseUrl}/viruses/coronavirus#cases`)

    // Cases
    cy.findByRole('region', { name: 'Cases' }).within(() => {
      // Cases by specimen date
      cy.findByTestId('cases-by-specimen-date-section').within(() => {
        cy.findByRole('heading', { name: 'Cases by specimen date', level: 3 })
        cy.findByText(
          'Number of cases by specimen date. Data for the last 5 days, highlighted in grey, are incomplete.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // 7-day case rates by specimen date
      cy.findByTestId('7-day-case-rates-by-specimen-date-section').within(() => {
        cy.findByRole('heading', { name: '7-day case rates by specimen date', level: 3 })
        cy.findByText('Rate of cases per 100,000 people in the rolling 7-day period ending on the dates shown.')
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })
    })

    // Deaths
    cy.findByRole('region', { name: 'Deaths' }).within(() => {
      // Daily deaths with COVID-19 on the death certificate by date of death
      cy.findByTestId('daily-deaths-with-covid-19-on-the-death-certificate-by-date-of-death-section').within(() => {
        cy.findByRole('heading', {
          name: 'Daily deaths with COVID-19 on the death certificate by date of death',
          level: 3,
        })
        cy.findByText(
          'Daily numbers of deaths of people whose death certificate mentioned COVID-19 as one of the causes, and 7-day rolling average. Because of the time it takes for deaths to be registered, there is a lag in reporting of at least 11 days, and data are not shown for the 14 days before the most recent reported date as they are considered incomplete. Data are shown by date of death.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })
    })

    // Heathcare
    cy.findByRole('region', { name: 'Healthcare' }).within(() => {
      // Bar chart with overlaying line comparing patients admitted to hospital with COVID-19
      cy.findByTestId(
        'column-bar-chart-with-overlaying-line-comparing-patients-admitted-to-hospital-with-covid-19'
      ).within(() => {
        cy.findByRole('heading', {
          name: 'Bar chart with overlaying line comparing patients admitted to hospital with COVID-19',
          level: 3,
        })
        cy.findByText(
          'Daily and total numbers of COVID-19 patients admitted to hospital. The overlaying line shows the 7-day average.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Patients in hospital
      cy.findByTestId('column-patients-in-hospital').within(() => {
        cy.findByRole('heading', { name: 'Patients in hospital', level: 3 })
        cy.findByText(
          'Daily count of confirmed COVID-19 patients in hospital at 8am. The overlaying line shows the 7-day average.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Patients in mechanical ventilation beds
      cy.findByTestId('patients-in-mechanical-ventilation-beds-section').within(() => {
        cy.findByRole('heading', { name: 'Patients in mechanical ventilation beds', level: 3 })
        cy.findByText(
          'Daily count of COVID-19 patients in mechanical ventilation beds, and 7-day rolling average. Data are not updated every day.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })
    })

    // Testing
    cy.findByRole('region', { name: 'Testing' }).within(() => {
      // Total daily number of PCR tests reported
      cy.findByTestId('column-total-daily-number-of-pcr-tests-reported').within(() => {
        cy.findByRole('heading', {
          name: 'Total daily number of PCR tests reported',
          level: 3,
        })
        cy.findByText(
          'The daily number of new polymerase chain reaction (PCR) tests reported. Data is shown by specimen date (the date the sample was collected from the person).'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Weekly positivity of people receiving a PCR test
      cy.findByTestId('column-weekly-positivity-of-people-receiving-a-pcr-test').within(() => {
        cy.findByRole('heading', { name: 'Weekly positivity of people receiving a PCR test', level: 3 })
        cy.findByText(
          'The percentage positivity of people who received a polymerase chain reaction (PCR) and had at least one positive COVID-19 PCR test result in the same 7 days. Data is shown by specimen date (the date the sample was collected). People tested more than once in the period are only counted once in the denominator. People with more than one positive result in the period are only included once in the numerator.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })
    })

    // Vaccinations
    cy.findByRole('region', { name: 'Vaccinations' }).within(() => {
      // People aged 50 and over who have received autumn booster vaccinations, by vaccination date
      cy.findByTestId(
        'column-people-aged-50-and-over-who-have-received-autumn-booster-vaccinations-by-vaccination-date'
      ).within(() => {
        cy.findByRole('heading', {
          name: 'People aged 50 and over who have received autumn booster vaccinations, by vaccination date',
          level: 3,
        })
        cy.findByText(
          'The number of people aged 50 and over who have received an autumn booster COVID-19 vaccination. Data for the latest 2 days, marked in grey, are incomplete. Data are shown by date of vaccination.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Autumn booster vaccination uptake (50+), by vaccination date
      cy.findByTestId('column-autumn-booster-vaccination-uptake-50-by-vaccination-date').within(() => {
        cy.findByRole('heading', {
          name: 'Autumn booster vaccination uptake (50+), by vaccination date',
          level: 3,
        })
        cy.findByText(
          'The percentage of people aged 50 and over who have received an autumn booster COVID-19 vaccination. The denominator is the number of people aged 50 and over on the National Immunisation Management Service (NIMS) database.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // People aged 75 and over who have received spring booster vaccinations, by vaccination date
      cy.findByTestId(
        'people-aged-75-and-over-who-have-received-spring-booster-vaccinations-by-vaccination-date-section'
      ).within(() => {
        cy.findByRole('heading', {
          name: 'People aged 75 and over who have received spring booster vaccinations, by vaccination date',
          level: 3,
        })
        cy.findByText(
          'The number of people aged 75 and over who have received a spring booster COVID-19 vaccination. Data for the latest 2 days, marked in grey, are incomplete. Data are shown by date of vaccination.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Spring booster vaccination uptake (75+), by vaccination date
      cy.findByTestId('spring-booster-vaccination-uptake-75-by-vaccination-date-section').within(() => {
        cy.findByRole('heading', {
          name: 'Spring booster vaccination uptake (75+), by vaccination date',
          level: 3,
        })
        cy.findByText(
          'The percentage of people aged 75 and over who have received a spring booster COVID-19 vaccination. The denominator is the number of people aged 75 and over on the National Immunisation Management Service (NIMS) database.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })
    })
  })
})
