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
      cy.findByText('How to use this data')
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

    cy.findByRole('heading', { name: 'Coronavirus' })

    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('Influenza').click()
      })
      .url()
      .should('include', '/viruses/influenza')

    cy.findByRole('heading', { name: 'Influenza' })
  })
})
