describe('Coronavirus detail page', () => {
  it('displays a title, body and related links', () => {
    cy.visit('/viruses/sars-cov-2')

    // Title
    cy.findByRole('heading', { name: 'SARS-CoV-2', level: 1 })

    // Body
    cy.findByText(
      'SARS-CoV-2 (commonly known) as flu is an infection of the nose, throat and lungs.'
    )

    // Related links
    cy.checkRelatedLinksExist()
  })
})
