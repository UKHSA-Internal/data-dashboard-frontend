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
      cy.findByText('Home')
      cy.findByText('API')
      cy.findByText('About')
      cy.findByText("What's new")
    })
  })

  it('loads the new page clicking a link', () => {
    cy.visit('/')

    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('About').click()
      })
      .url()
      .should('include', '/about')

    cy.findByRole('heading', { name: 'About' })
  })

  it('returns to the top of the page', () => {
    cy.visit('/')

    cy.scrollTo('bottom')
    cy.findByText('Back to top').click()

    cy.findByRole('heading', { level: 1, name: 'UKHSA data dashboard' }).should('be.visible')
  })
})
