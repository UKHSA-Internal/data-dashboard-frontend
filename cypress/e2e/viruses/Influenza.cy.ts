describe('Influenza detail page', () => {
  it('displays a title, body and related links', () => {
    cy.visit('/viruses/influenza')

    // Title
    cy.findByRole('heading', { name: 'Influenza', level: 1 })

    // Body
    cy.findByText(
      'Influenza (commonly known) as flu is an infection of the nose, throat and lungs.'
    )

    // Related links
    cy.checkRelatedLinksExist()
  })
})
