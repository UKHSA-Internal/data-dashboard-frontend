import 'cypress-axe'

describe('Maps', () => {
  it('Has no detectable a11y violations', () => {
    cy.visit('/maps')
    cy.injectAxe()
    cy.checkA11y('html', {
      rules: {
        'document-title': { enabled: false },
        'html-has-lang': { enabled: false },
        'landmark-unique': { enabled: false },
        region: { enabled: false },
      },
    })
  })

  it('displays correctly', () => {
    cy.visit('/maps')

    // Document title
    cy.title().should('eq', 'Maps')

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
