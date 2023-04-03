import 'cypress-axe'

describe('Maps', () => {
  // it('Has no detectable a11y violations', () => {
  //   cy.injectAxe()
  //   cy.checkA11y()
  // })

  it('displays correctly', () => {
    cy.visit('/maps')

    // Title
    cy.findByRole('heading', { name: 'Maps', level: 1 })

    // Last updated
    cy.findByText('Last updated on Tuesday, 21 March 2023 at 10:25am')

    // Body
    cy.findByText('Maps CMS page content!')

    // Related links
    cy.checkRelatedLinksExist()
  })
})
