describe("What's new", () => {
  it('displays a title, body and related links', () => {
    cy.visit('/whats-new')

    // Title
    cy.findByRole('heading', { name: "What's new", level: 1 })

    // Body
    cy.findByText("What's new CMS page content!")

    // Related links
    cy.checkRelatedLinksExist()
  })
})
