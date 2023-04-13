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
    cy.title().should('eq', "What's new")

    // Title
    cy.findByRole('heading', { name: "What's new", level: 1 })

    // Last updated
    cy.findByText('Last updated on Friday, 3 March 2023 at 11:15am')

    // Body
    cy.findByText("What's new CMS page content!")

    // Related links
    cy.checkRelatedLinksExist()
  })
})
