describe('How to use this data', () => {
  it('displays a title, body and related links', () => {
    cy.visit('/how-to-use-this-data')

    // Title
    cy.findByRole('heading', { name: 'How to use this data', level: 1 })

    // Body
    cy.findByText('How to use this data CMS page content!')

    // Related links
    cy.checkRelatedLinksExist()
  })
})
