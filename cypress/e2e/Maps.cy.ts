describe('Maps', () => {
  it('displays a title, body and related links', () => {
    cy.visit('/maps')

    // Title
    cy.findByRole('heading', { name: 'Maps', level: 1 })

    // Body
    cy.findByText('Maps CMS page content!')

    // Related links
    cy.checkRelatedLinksExist()
  })
})
