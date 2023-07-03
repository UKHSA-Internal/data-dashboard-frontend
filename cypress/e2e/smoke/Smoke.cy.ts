describe('Smoke tests - layout', () => {
  it('Displays navigation links', () => {
    cy.visit('/')

    cy.findByRole('navigation', { name: 'Menu' }).within(() => {
      cy.findByRole('link', { name: 'Dashboard' })
      cy.findByRole('link', { name: 'Maps' })
      cy.findByRole('link', { name: 'API' })
      cy.findByRole('link', { name: 'About' })
      cy.findByRole('link', { name: "What's new" })
    })
  })
})

describe('Smoke tests - choosing a topic user journey', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Navigates to the Coronavirus topic page', () => {
    cy.findByRole('button', { name: 'Start now' }).click()
    cy.url().should('include', '/choose-topic')
    cy.findByRole('heading', { name: 'Which topic are you interested in?' })
    cy.findByLabelText('Coronavirus').click()
    cy.findByRole('button', { name: 'Continue' }).click()
    cy.url().should('include', '/choose-topic/coronavirus')
    cy.findByRole('heading', { name: 'Coronavirus', level: 1 })
  })

  it('Navigates to the Influenza topic page', () => {
    cy.findByRole('button', { name: 'Start now' }).click()
    cy.url().should('include', '/choose-topic')
    cy.findByRole('heading', { name: 'Which topic are you interested in?' })
    cy.findByLabelText('Influenza').click()
    cy.findByRole('button', { name: 'Continue' }).click()
    cy.url().should('include', '/choose-topic/influenza')
    cy.findByRole('heading', { name: 'Influenza', level: 1 })
  })

  it.only('Navigates to the Other Respiratory Viruses topic page', () => {
    cy.findByRole('button', { name: 'Start now' }).click()
    cy.url().should('include', '/choose-topic')
    cy.findByRole('heading', { name: 'Which topic are you interested in?' })
    cy.findByLabelText('Other respiratory viruses').click()
    cy.findByRole('button', { name: 'Continue' }).click()
    cy.url().should('include', '/choose-topic/other-respiratory-viruses')
    cy.findByRole('heading', { name: 'Other respiratory viruses', level: 1 })
  })
})

describe('Smoke tests - non-topic pages', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Loads the About page', () => {
    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('About').click()
      })
      .url()
      .should('include', '/about')

    cy.findByRole('heading', { name: 'About' })
  })

  it("Loads the What's New page", () => {
    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText("What's new").click()
      })
      .url()
      .should('include', '/whats-new')

    cy.findByRole('heading', { name: "What's New" })
  })

  it('Loads the maps page', () => {
    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('Maps').click()
      })
      .url()
      .should('include', '/maps')

    cy.findByRole('heading', { name: 'Maps' })
  })

  it('Loads the API page', () => {
    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('API').click()
      })
      .url()
      .should('include', '/how-to-use-this-data')

    cy.findByRole('heading', { name: 'How to use this data' })
  })
})
