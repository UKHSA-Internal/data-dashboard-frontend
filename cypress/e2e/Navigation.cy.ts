describe('Navigation', () => {
  it('displays links', () => {
    cy.visit('/')

    cy.findByRole('navigation', { name: 'Menu' }).within(() => {
      cy.findByText('Home')
      cy.findByText('Coronavirus')
      cy.findByText('Influenza')
      cy.findByText('Other respiratory viruses')
      cy.findByText('About')
      cy.findByText("What's new")
      cy.findByText('Maps')
      cy.findByText('Metrics documentation')
      cy.findByText('Download data')
      cy.findByText("Developer's guide")
    })
  })

  it('loads the new page clicking a link', () => {
    cy.visit('/')

    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('Coronavirus').click()
      })
      .url()
      .should('include', '/viruses/coronavirus')
  })
})
