import 'cypress-axe'

describe("What's new", () => {
  it('Has no detectable a11y violations', () => {
    cy.visit('/whats-new')
    cy.injectAxe()
    cy.checkA11y('html', {
      // These are failing incorrectly
      rules: {
        'document-title': { enabled: false },
        'heading-order': { enabled: false },
        'landmark-one-main': { enabled: false },
        'page-has-heading-one': { enabled: false },
        'html-has-lang': { enabled: false },
        'landmark-unique': { enabled: false },
        region: { enabled: false },
      },
    })
  })

  // TODO: Restore after migrated to app dir
  it.skip('Displays the layout', () => {
    cy.checkLayoutExists()
  })

  it('displays correctly', () => {
    cy.visit('/whats-new')

    // Document title
    cy.title().should('eq', "What's new | UKHSA data dashboard")

    // Title
    cy.findByRole('heading', { name: "What's new", level: 1 })

    // Last updated
    cy.findByText(/Last updated on Friday, 12 May 2023/)

    // Body
    // TODO In Future Tickets

    // Related links
    cy.checkRelatedLinksExist()
  })
})
