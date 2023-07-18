import 'cypress-axe'

describe('Other respiratory viruses topic page', () => {
  beforeEach(() => {
    cy.visit('/choose-topic/other-respiratory-viruses')
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
    cy.title().should('eq', 'Other respiratory viruses')
    cy.findByRole('heading', { name: 'Other respiratory viruses', level: 1 })
    cy.findByText(/Last updated on Wednesday, 10 May 2023/)
    cy.findByText(/Data and insights from the UKHSA on other respiratory viruses./)
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
    cy.url().should('eql', `${Cypress.config().baseUrl}/choose-topic/other-respiratory-viruses#healthcare`)

    // Heathcare
    cy.findByRole('region', { name: 'Healthcare' }).within(() => {
      // Line chart comparing RSV hospital (ICU or HDU) admission rates of positive cases per 100,000 population reported through SARI Watch, England
      cy.findByTestId(
        'line-chart-comparing-rsv-hospital-icu-or-hdu-admission-rates-of-positive-cases-per-100-000-population-reported-through-sari-watch-england-section'
      ).within(() => {
        cy.findByRole('heading', {
          name: 'Line chart comparing RSV hospital (ICU or HDU) admission rates of positive cases per 100,000 population reported through SARI Watch, England',
          level: 3,
        })
        cy.findByText(
          'RSV SARI Watch surveillance has run from week 40 to week 20. In the 2022 to 2023 season onwards this was extended to run throughout the year, to allow for surveillance of out-of-season trends.'
        )
        cy.findByAltText('')
      })

      // Bar chart comparing RSV hospital admissions count by week
      cy.findByTestId('column-bar-chart-comparing-rsv-hospital-admissions-count-by-week').within(() => {
        cy.findByRole('heading', { name: 'Bar chart comparing RSV hospital admissions count by week', level: 3 })
        cy.findByText('Weekly admissions rates of patients admitted to hospital with RSV as a weekly time series.')
        cy.findByAltText('')
      })
    })

    // Line chart comparing Adenovirus test positivity count by week
    cy.findByRole('region', { name: 'Testing' }).within(() => {
      cy.findByTestId('column-line-chart-comparing-adenovirus-test-positivity-count-by-week').within(() => {
        cy.findByRole('heading', {
          name: 'Line chart comparing Adenovirus test positivity count by week',
          level: 3,
        })
        cy.findByText(
          'Weekly admissions rates of patients admitted to hospital with Adenovirus as a weekly time series.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Line chart comparing hMPV test positivity count by week
      cy.findByTestId('line-chart-comparing-h-mpv-test-positivity-count-by-week-section').within(() => {
        cy.findByRole('heading', {
          name: 'Line chart comparing hMPV test positivity count by week',
          level: 3,
        })
        cy.findByText('Weekly admissions rates of patients admitted to hospital with hMPV as a weekly time series.')
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Line chart comparing hMPV test positivity count by week broken down by age
      cy.findByTestId('column-line-chart-comparing-h-mpv-test-positivity-count-by-week-broken-down-by-age').within(
        () => {
          cy.findByRole('heading', {
            name: 'Line chart comparing hMPV test positivity count by week broken down by age',
            level: 3,
          })
          cy.findByText('Age breakdown of people testing positive for hMPV per 100,000 people.')
          cy.findByAltText('')
          cy.findByText('View data in a tabular format')
        }
      )

      // Line chart comparing Parainfluenza test positivity count by week
      cy.findByTestId('column-line-chart-comparing-parainfluenza-test-positivity-count-by-week').within(() => {
        cy.findByRole('heading', {
          name: 'Line chart comparing Parainfluenza test positivity count by week',
          level: 3,
        })
        cy.findByText(
          'Weekly admissions rates of patients admitted to hospital with Parainfluenza as a weekly time series.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Line chart comparing Parainfluenza test positivity count by week broken down by age
      cy.findByTestId(
        'column-line-chart-comparing-parainfluenza-test-positivity-count-by-week-broken-down-by-age'
      ).within(() => {
        cy.findByRole('heading', {
          name: 'Line chart comparing Parainfluenza test positivity count by week broken down by age',
          level: 3,
        })
        cy.findByText('Age breakdown of people testing positive for Parainfluenza per 100,000 people.')
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Line chart comparing Rhinovirus test positivity count by week
      cy.findByTestId('column-line-chart-comparing-rhinovirus-test-positivity-count-by-week').within(() => {
        cy.findByRole('heading', {
          name: 'Line chart comparing Rhinovirus test positivity count by week',
          level: 3,
        })
        cy.findByText(
          'Weekly admissions rates of patients admitted to hospital with Rhinovirus as a weekly time series.'
        )
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Line chart comparing Rhinovirus test positivity count by week broken down by age
      cy.findByTestId(
        'line-chart-comparing-rhinovirus-test-positivity-count-by-week-broken-down-by-age-section'
      ).within(() => {
        cy.findByRole('heading', {
          name: 'Line chart comparing Rhinovirus test positivity count by week broken down by age',
          level: 3,
        })
        cy.findByText('Age breakdown of people testing positive for Rhinovirus per 100,000 people.')
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })

      // Line chart comparing RSV test positivity count by week
      cy.findByTestId('column-line-chart-comparing-rsv-test-positivity-count-by-week').within(() => {
        cy.findByRole('heading', {
          name: 'Line chart comparing RSV test positivity count by week',
          level: 3,
        })
        cy.findByText('Weekly admissions rates of patients admitted to hospital with RSV as a weekly time series.')
        cy.findByAltText('')
        cy.findByText('View data in a tabular format')
      })
    })
  })
})
