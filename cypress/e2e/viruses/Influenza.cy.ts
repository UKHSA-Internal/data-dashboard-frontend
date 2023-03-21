describe('Influenza detail page', () => {
  it('displays correctly', () => {
    cy.visit('/viruses/influenza')

    // Title
    cy.findByRole('heading', { name: 'Influenza', level: 1 })

    // Last updated
    cy.findByText('Last updated on March 21st 2023 at 10:25am')

    // Body
    cy.findByText('Influenza (commonly known) as flu is an infection of the nose, throat and lungs.')

    // Related links
    cy.checkRelatedLinksExist()
  })
})
