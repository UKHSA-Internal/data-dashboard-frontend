import 'cypress-axe'

describe('', () => {
  beforeEach(() => {
    cy.visit('/feedback')
    cy.injectAxe()
  })

  it('Has no detectable a11y violations', () => {
    cy.checkA11y('html', {
      rules: {
        'document-title': { enabled: false },
        'html-has-lang': { enabled: false },
        'landmark-unique': { enabled: false },
        'landmark-one-main': { enabled: false },
        'page-has-heading-one': { enabled: false },
        region: { enabled: false },
      },
    })
  })

  it('Allows you to fill fields, and successfully submit', () => {
    cy.findByRole('heading', { name: 'UKHSA Dashboard Feedback', level: 1 })

    cy.get('#govuk_reason').type('Test input')
    cy.get('[type="radio"]').first().check()
    cy.get('#improve_experience').type('Test input')
    cy.get('#like_to_see').type('Test input')

    cy.findByTestId('feedback-submit-button').click().url().should('include', '/feedback/confirmation')
  })
})
