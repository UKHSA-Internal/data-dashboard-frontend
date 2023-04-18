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
      cy.findByText('Coronavirus')
      cy.findByText('Influenza')
      cy.findByText('Other respiratory viruses')
      cy.findByText('About')
      cy.findByText("What's new")
      cy.findByText('Maps')
      cy.findByText('How to use this data')
    })
  })

  it('loads the new page clicking a link', () => {
    cy.visit('/')

    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('Coronavirus').click()
      })
      .url()
      .should('include', '/viruses/coronavirus')

    cy.findByRole('heading', { name: 'Coronavirus' })

    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('Influenza').click()
      })
      .url()
      .should('include', '/viruses/influenza')

    cy.findByRole('heading', { name: 'Influenza' })
  })

  it('Returns to the top of the page', () => {
    cy.visit('/')
    cy.findByText('Back to top').should('not.be.visible')

    cy.scrollTo(0, 500)
    cy.findByText('Back to top').click()

    cy.findByRole('heading', { level: 1, name: 'Respiratory viruses' }).should('be.visible')
  })
})
