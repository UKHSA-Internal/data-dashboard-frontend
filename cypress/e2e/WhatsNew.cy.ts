describe("What's new", () => {
  it('displays correctly', () => {
    cy.visit('/whats-new')

    // Title
    cy.findByRole('heading', { name: "What's new", level: 1 })

    // Last updated
    cy.findByText('Last updated on March 3rd 2023 at 11:15am')

    // Body
    cy.findByText("What's new CMS page content!")

    // Related links
    cy.checkRelatedLinksExist()
  })
})
