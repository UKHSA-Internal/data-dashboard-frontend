import 'cypress-axe'

describe('How to use this data', () => {
  it('Has no detectable a11y violations', () => {
    cy.visit('/how-to-use-this-data')
    cy.injectAxe()
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
    cy.visit('/how-to-use-this-data')

    // Document title
    cy.title().should('eq', 'How to use this data')

    // Title
    cy.findByRole('heading', { name: 'How to use this data', level: 1 })

    // Last updated
    cy.findByText('Last updated on Friday, 12 May 2023 at 04:53pm')

    // Body
    // TODO In Future Tickets

    // Related links
    cy.checkRelatedLinksExist()
  })
})
