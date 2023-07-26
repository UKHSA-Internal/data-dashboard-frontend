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
    cy.findByRole('heading', { name: 'UKHSA data dashboard feedback', level: 1 })

    cy.findByLabelText('What was your reason for visiting the dashboard today?').type('Test input')
    cy.findByLabelText('Yes').check()
    cy.findByLabelText('How could we improve your experience with the dashboard?').type('Test input')
    cy.findByLabelText('What would you like to see on the dashboard in the future?').type('Test input')

    cy.findByRole('button', { name: 'Submit' }).click()
    cy.url().should('include', '/feedback/confirmation')
  })

  it('Submits the form with all fields left blank', () => {
    cy.findByRole('heading', { name: 'UKHSA data dashboard feedback', level: 1 })
    cy.findByRole('button', { name: 'Submit' }).click()
    cy.url().should('include', '/feedback/confirmation')
  })
})
