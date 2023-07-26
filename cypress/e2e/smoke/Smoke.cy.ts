describe('Smoke tests - layout', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Displays the layout', () => {
    cy.checkLayoutExists()
  })
})

describe('Smoke tests - Navigating to topic pages', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  afterEach(() => {
    cy.checkLayoutExists()
  })

  it('Navigates to the COVID-19 topic page', () => {
    cy.findByRole('navigation', { name: 'Navigation menu' }).within(() =>
      cy.findByRole('link', { name: 'COVID-19' }).click()
    )
    cy.url().should('include', '/topics/covid-19')
    cy.findByRole('heading', { name: 'COVID-19', level: 1 })
  })

  it('Navigates to the Influenza topic page', () => {
    cy.findByRole('navigation', { name: 'Navigation menu' }).within(() =>
      cy.findByRole('link', { name: 'Influenza' }).click()
    )
    cy.url().should('include', '/topics/influenza')
    cy.findByRole('heading', { name: 'Influenza', level: 1 })
  })

  it('Navigates to the Other respiratory viruses topic page', () => {
    cy.findByRole('navigation', { name: 'Navigation menu' }).within(() =>
      cy.findByRole('link', { name: 'Other respiratory viruses' }).click()
    )
    cy.url().should('include', '/topics/other-respiratory-viruses')
    cy.findByRole('heading', { name: 'Other respiratory viruses', level: 1 })
  })
})

describe('Smoke tests - non-topic pages', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Loads the About page', () => {
    cy.findByRole('navigation', { name: 'Navigation menu' }).within(() => {
      cy.findByText('About').click()
    })
    cy.url().should('include', '/about')
    cy.findByRole('heading', { name: 'About' })
  })

  it("Loads the What's new page", () => {
    cy.findByRole('navigation', { name: 'Navigation menu' }).within(() => {
      cy.findByText("What's new").click()
    })
    cy.url().should('include', '/whats-new')
    cy.findByRole('heading', { name: "What's new" })
  })
})
