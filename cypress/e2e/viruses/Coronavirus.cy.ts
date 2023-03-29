describe('Coronavirus detail page', () => {
  it('displays correctly', () => {
    cy.visit('/viruses/coronavirus')

    // Title
    cy.findByRole('heading', { name: 'SARS-CoV-2', level: 1 })

    // Last updated
    cy.findByText('Last updated on Tuesday, 21 March 2023 at 10:25am')

    // Body
    cy.findByText('SARS-CoV-2 (commonly known) as flu is an infection of the nose, throat and lungs.')

    // Related links
    cy.checkRelatedLinksExist()
  })
})
