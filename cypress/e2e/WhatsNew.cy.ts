import 'cypress-axe'

describe("What's new", () => {
  // it('Has no detectable a11y violations', () => {
  //   cy.injectAxe()
  //   cy.checkA11y()
  // })

  it('displays correctly', () => {
    cy.visit('/whats-new')

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
