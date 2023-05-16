import 'cypress-axe'

describe('About', () => {
  beforeEach(() => {
    cy.visit('/about')
    cy.injectAxe()
  })

  it('Has no detectable a11y violations', () => {
    cy.checkA11y('html', {
      rules: {
        'document-title': { enabled: false },
        'html-has-lang': { enabled: false },
        'landmark-unique': { enabled: false },
        region: { enabled: false },
      },
    })
  })

  it('displays correctly', () => {
    // Document title
    cy.title().should('eq', 'About')

    // Last updated
    cy.findByText(/Last updated on Friday/)

    // Title
    cy.findByRole('heading', { name: 'About', level: 1 })

    // Contents
    cy.findByRole('navigation', { name: 'Contents' }).within(() => {
      cy.findByRole('link', { name: 'About the UKHSA data dashboard' })
      cy.findByRole('link', { name: 'Using the dashboard' })
      cy.findByRole('link', { name: 'Respiratory viruses' })
      cy.findByRole('link', { name: 'Metrics' })
      cy.findByRole('link', { name: 'Data availability' })
      cy.findByRole('link', { name: 'Data sources' })
    })

    // About the UKHSA data dashboard
    cy.findByRole('heading', { name: 'About the UKHSA data dashboard', level: 2 })
    cy.findByText(
      'The UKHSA data dashboard provides presents a wide range of public health data in an easily accessible format. It’s produced by the UK Health Security Agency. At the moment, the dashboard is focused on respiratory viruses.'
    )

    // Using the dashboard
    cy.findByRole('heading', { name: 'Using the dashboard', level: 2 })
    cy.findByText('The UKHSA data dashboard is for anyone interested in UK health data.')

    // Respiratory viruses
    cy.findByRole('heading', { name: 'Respiratory viruses', level: 2 })
    cy.findByText(
      'Respiratory viruses can infect any age group. Some people (including children and the elderly) are more likely to become seriously ill or have other complications because of respiratory viruses. In the UK many of these viruses are seasonal and tend to circulate at higher levels during the winter months.'
    )

    // Metrics
    cy.findByRole('heading', { name: 'Metrics', level: 2 })
    cy.findByText(
      'The UKHSA data dashboard reports on different data (metrics) for each virus. This is because not all metrics are available for each virus. See more in data availability.'
    )

    // Data sources
    cy.findByRole('heading', { name: 'Data sources', level: 2 })
    cy.findByText('The data on the UKHSA data dashboard is from a number of sources.')

    // Related links
    cy.checkRelatedLinksExist()
  })

  it('Anchors to the section when clicking the associated contents link', () => {
    // Contents
    cy.findByRole('navigation', { name: 'Contents' }).within(() => {
      cy.findByRole('link', { name: 'Respiratory viruses' }).click()
    })

    cy.findByRole('heading', { name: 'Respiratory viruses' }).parent().should('have.focus')
  })
})
