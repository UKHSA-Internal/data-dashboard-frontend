import 'cypress-axe'

describe('Navigation', () => {
  it('Has no detectable a11y violations', () => {
    cy.visit('/')
    cy.injectAxe()
    cy.checkA11y('html', {
      rules: {
        'document-title': { enabled: false },
        'html-has-lang': { enabled: false },
        region: { enabled: false },
      },
    })
  })

  it('displays links', () => {
    cy.visit('/')

    cy.findByRole('navigation', { name: 'Menu' }).within(() => {
      cy.findByText('Dashboard')
      cy.findByText('Maps')
      cy.findByText('API')
      cy.findByText('About')
      cy.findByText("What's new")
    })
  })

  it('loads the new page clicking a link', () => {
    cy.visit('/')

    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('Maps').click()
      })
      .url()
      .should('include', '/maps')

    cy.findByRole('heading', { name: 'Maps' })

    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('API').click()
      })
      .url()
      .should('include', '/how-to-use-this-data')

    cy.findByRole('heading', { name: 'How to use this data' })
  })

  it('returns to the top of the page', () => {
    cy.visit('/')

    cy.scrollTo('bottom')
    cy.findByText('Back to top').click()

    cy.findByRole('heading', { level: 1, name: 'UKHSA data dashboard' }).should('be.visible')
  })
})
