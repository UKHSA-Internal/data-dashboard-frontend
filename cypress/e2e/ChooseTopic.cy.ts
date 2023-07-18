import 'cypress-axe'

describe('Choose Topic page', () => {
  beforeEach(() => {
    cy.visit('/choose-topic')
    cy.injectAxe()
  })

  it('has no detectable a11y violations', () => {
    cy.checkA11y('html', {
      rules: {
        'document-title': { enabled: false },
        'html-has-lang': { enabled: false },
        region: { enabled: false },
      },
    })
  })

  it('navigates to the choose topic page and displays the available topics', () => {
    cy.findByRole('link', { name: 'Back' }).should('have.attr', 'href', '/')

    cy.title().should('eq', 'Which topic are you interested in?')

    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Choose a topic to display on the dashboard.'
    )

    cy.findByRole('heading', { name: 'Which topic are you interested in?', level: 1 })
    cy.findByText('Choose a topic to display on the dashboard.')
  })

  it('redirects correctly after selecting coronavirus and submitting the form', () => {
    cy.findByLabelText('Coronavirus').click()
    cy.findByRole('button', { name: 'Continue' }).click()
    cy.url().should('include', '/choose-topic/coronavirus')
  })

  it('redirects correctly after selecting influenza and submitting the form', () => {
    cy.findByLabelText('Influenza').click()
    cy.findByRole('button', { name: 'Continue' }).click()
    cy.url().should('include', '/choose-topic/influenza')
  })

  it('redirects correctly after selecting other respiratory viruses and submitting the form', () => {
    cy.findByLabelText('Other respiratory viruses').click()
    cy.findByRole('button', { name: 'Continue' }).click()
    cy.url().should('include', '/choose-topic/other-respiratory-viruses')
  })
})
