describe('How to use this data', () => {
  it('displays correctly', () => {
    cy.visit('/how-to-use-this-data')

    // Title
    cy.findByRole('heading', { name: 'How to use this data', level: 1 })

    // Last updated
    cy.findByText('Last updated on Sunday, 15 January 2023 at 10:25am')

    // Body
    cy.findByText('How to use this data CMS page content!')

    // Related links
    cy.checkRelatedLinksExist()
  })
})
