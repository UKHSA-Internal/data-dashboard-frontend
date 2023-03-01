// Cypress E2E Test
describe('Example', () => {
  it('loads the page and displays some text', () => {
    cy.visit('http://localhost:3000/')
    cy.findByText('Respiratory viruses in England')
  })
})
