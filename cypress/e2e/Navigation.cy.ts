import 'cypress-axe'

describe('Navigation', () => {
  it('Has no detectable a11y violations', () => {
    cy.visit('/')
    cy.injectAxe()
    cy.checkA11y('html', {
      rules: {
        region: { enabled: false },
      },
    })
  })

  it('Displays links', () => {
    cy.visit('/')

    cy.findByRole('navigation', { name: 'Menu' }).within(() => {
      cy.findByText('Dashboard')
      cy.findByText('COVID-19')
      cy.findByText('Influenza')
      cy.findByText('Other respiratory viruses')
      cy.findByText('API')
      cy.findByText('About')
      cy.findByText("What's new")
    })
  })

  it('Scrolls to the top of the page', () => {
    cy.visit('/')
    cy.scrollTo('bottom')
    cy.findByText('Back to top').click()
    cy.findByRole('heading', { level: 1, name: 'Respiratory viruses' }).should('be.visible')
  })
})
