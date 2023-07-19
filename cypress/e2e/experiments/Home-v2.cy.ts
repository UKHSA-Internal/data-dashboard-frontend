import 'cypress-axe'

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/experiments/home-v2')
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

  it('displays landing page content', () => {
    cy.title().should('eq', 'UKHSA data dashboard')
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses.'
    )
    cy.findByRole('heading', { name: 'UKHSA data dashboard', level: 1 })
    cy.findByText(
      'The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses.'
    )

    cy.findByRole('button', { name: 'Start now' })

    cy.findByRole('heading', { name: 'Use the API', level: 2 })
    cy.findByRole('link', { name: 'Go to API' })

    cy.findByRole('heading', { name: 'About the dashboard', level: 2 })
    cy.findByRole('link', { name: 'Find out more about the dashboard' })

    cy.findByRole('heading', { name: "What's new", level: 2 })
    cy.findByRole('link', { name: 'Get updates' })
  })
})
