import 'cypress-axe'

describe('404 error page', () => {
  beforeEach(() => {
    cy.visit('/404', { failOnStatusCode: false })
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
    cy.title().should('eq', 'Page not found')
    cy.findByRole('heading', { name: 'Page not found', level: 1 })
    cy.findByText('If you typed the web address, check it is correct.')
    cy.findByText('If you pasted the web address, check you copied the entire address.')
    cy.findByText('If the web address is correct or you selected a link or button,')
    cy.findByRole('link', { name: 'contact the UK Health Security Agency (UKHSA)' }).should(
      'have.attr',
      'href',
      'https://www.gov.uk/government/collections/contacts-public-health-england-regions-local-centres-and-emergency'
    )
    cy.findByText('if you need to speak to someone.')
  })
})
