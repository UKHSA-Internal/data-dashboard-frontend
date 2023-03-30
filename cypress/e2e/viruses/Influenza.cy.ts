describe('Influenza detail page', () => {
  it('displays correctly', () => {
    cy.visit('/viruses/influenza')

    // Title
    cy.findByRole('heading', { name: 'Influenza', level: 1 })

    // Last updated
    cy.findByText('Last updated on Tuesday, 21 March 2023 at 10:25am')

    // Body
    // TODO

    // Related links
    cy.checkRelatedLinksExist()
  })
})
