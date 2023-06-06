import 'cypress-axe'

describe('500 error page', () => {
  beforeEach(() => {
    cy.visit('/500', { failOnStatusCode: false })
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

  it('displays a title and description', () => {
    cy.title().should('eq', 'Sorry, there is a problem with the service')
    cy.findByRole('heading', { name: 'Sorry, there is a problem with the service', level: 1 })
    cy.findByText('Try again later.')
    cy.findByRole('link', { name: 'Contact the UK Health Security Agency (UKHSA)' }).should(
      'have.attr',
      'href',
      'https://www.gov.uk/government/collections/contacts-public-health-england-regions-local-centres-and-emergency'
    )
    cy.findByText('if you need to speak to someone.')
  })
})
