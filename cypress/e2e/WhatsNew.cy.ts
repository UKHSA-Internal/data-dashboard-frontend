import 'cypress-axe'

describe("What's new", () => {
  it('Has no detectable a11y violations', () => {
    cy.visit('/whats-new')
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
    cy.visit('/whats-new')

    // Document title
    cy.title().should('eq', "What's New")

    // Title
    cy.findByRole('heading', { name: "What's New", level: 1 })

    // Last updated
    cy.findByText(/Last updated on Friday, 12 May 2023/)

    // Body
    // TODO In Future Tickets

    // Related links
    cy.checkRelatedLinksExist()
  })
})
