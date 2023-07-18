import 'cypress-axe'

describe('Influenza topic page', () => {
  beforeEach(() => {
    cy.visit('/choose-topic/influenza')
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

  it.skip('displays an accordion with additional virus information', () => {
    cy.checkAccordionExists()
  })

  it.skip('displays related links', () => {
    cy.checkRelatedLinksExist()
  })

  it('displays a title, description and last updated date', () => {
    cy.title().should('eq', 'Influenza')
    cy.findByRole('heading', { name: 'Influenza', level: 1 })
    cy.findByText(/Last updated on Monday, 15 May 2023/)
    cy.findByText(/Data and insights from the UKHSA on Influenza/)
    cy.findByRole('link', { name: 'Back' }).should('have.attr', 'href', '/choose-topic')
  })

  it('displays all sections correctly', () => {
    // Contents
    cy.findByRole('navigation', {
      name: 'Contents',
    }).as('contents')

    cy.get('@contents').within(() => {
      cy.findByRole('link', { name: 'Healthcare' })
      cy.findByRole('link', { name: 'Testing' })
    })

    // Go to Healthcare section
    cy.get('@contents').within(() => {
      cy.findByRole('link', { name: 'Healthcare' }).click()
    })

    cy.findByRole('heading', { name: 'Healthcare', level: 2 }).parent().should('have.focus')
    cy.url().should('eql', `${Cypress.config().baseUrl}/choose-topic/influenza#healthcare`)

    // Heathcare
    cy.findByRole('region', { name: 'Healthcare' }).within(() => {
      // Line chart with overlaying line comparing hospital admission rates of patients admitted to hospital with Influenza
      cy.findByTestId(
        'column-line-chart-with-overlaying-line-comparing-hospital-admission-rates-of-patients-admitted-to-hospital-with-influenza'
      ).within(() => {
        cy.findByRole('heading', {
          name: 'Line chart with overlaying line comparing hospital admission rates of patients admitted to hospital with Influenza',
          level: 3,
        })
        cy.findByText(
          'Weekly admissions rates of patients admitted to hospital with Influenza as a weekly time series, shown as the rate per 100,000 people.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Line chart comparing Influenza hospital admission rates by age
      cy.findByTestId('column-line-chart-comparing-influenza-hospital-admission-rates-by-age').within(() => {
        cy.findByRole('heading', { name: 'Line chart comparing Influenza hospital admission rates by age', level: 3 })
        cy.findByText('Age breakdown of people admitted to hospital, shown as the rate per 100,000 people.')
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Line chart with overlaying line comparing ICU admission rates of patients admitted to hospital with Influenza
      cy.findByTestId(
        'column-line-chart-with-overlaying-line-comparing-icu-admission-rates-of-patients-admitted-to-hospital-with-influenza'
      ).within(() => {
        cy.findByRole('heading', {
          name: 'Line chart with overlaying line comparing ICU admission rates of patients admitted to hospital with Influenza',
          level: 3,
        })
        cy.findByText(
          'Weekly admissions rates of patients admitted to ICU with Influenza as a weekly time series, shown as the rate per 100,000 people.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Line chart comparing Influenza ICU admission rates by age
      cy.findByTestId('column-line-chart-comparing-influenza-icu-admission-rates-by-age').within(() => {
        cy.findByRole('heading', {
          name: 'Line chart comparing Influenza ICU admission rates by age',
          level: 3,
        })
        cy.findByText('Age breakdown of people admitted to ICU, shown as the rate per 100,000 people.')
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })
    })

    // Testing
    cy.findByRole('region', { name: 'Testing' }).within(() => {
      // Bar chart with overlaying line comparing positivity for Influenza tests
      cy.findByTestId('column-bar-chart-with-overlaying-line-comparing-positivity-for-influenza-tests').within(() => {
        cy.findByRole('heading', {
          name: 'Bar chart with overlaying line comparing positivity for Influenza tests',
          level: 3,
        })
        cy.findByText(
          'Weekly admissions rates of patients admitted to hospital with Influenza as a weekly time series, shown as the rate per 100,000 people.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Line chart comparing weekly positivity for Influenza tests by age
      cy.findByTestId('column-line-chart-comparing-weekly-positivity-for-influenza-tests-by-age').within(() => {
        cy.findByRole('heading', {
          name: 'Line chart comparing weekly positivity for Influenza tests by age',
          level: 3,
        })
        cy.findByText('Weekly time series of positivity for people testing positive for Influenza broken down by age.')
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })
    })
  })
})
