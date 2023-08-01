describe('Smoke tests - Home', () => {
  it('Displays the layout', () => {
    cy.visit('/')
    cy.checkLayoutExists()
  })
})

describe('Smoke tests - Navigating to topic pages', () => {
  it('Navigates to the COVID-19 topic page', { defaultCommandTimeout: 15000 }, () => {
    cy.visit('/')

    cy.findByRole('navigation', { name: 'Menu' }).within(() => cy.findByRole('link', { name: 'COVID-19' }).click())
    cy.url().should('include', '/topics/covid-19')
    cy.findByRole('heading', { name: 'COVID-19', level: 1 })
    cy.checkLayoutExists()

    cy.findByRole('navigation', { name: 'Menu' }).within(() => cy.findByRole('link', { name: 'Influenza' }).click())
    cy.url().should('include', '/topics/influenza')
    cy.findByRole('heading', { name: 'Influenza', level: 1 })
    cy.checkLayoutExists()

    cy.findByRole('navigation', { name: 'Menu' }).within(() =>
      cy.findByRole('link', { name: 'Other respiratory viruses' }).click()
    )
    cy.url().should('include', '/topics/other-respiratory-viruses')
    cy.findByRole('heading', { name: 'Other respiratory viruses', level: 1 })
  })
})

describe('Smoke tests - common pages', () => {
  it('Loads the common pages', { defaultCommandTimeout: 15000 }, () => {
    cy.visit('/')

    cy.findByRole('navigation', { name: 'Menu' }).within(() => {
      cy.findByRole('link', { name: 'About' }).click()
    })
    cy.url().should('include', '/about')
    cy.findByRole('heading', { name: 'About' })

    cy.findByRole('navigation', { name: 'Menu' }).within(() => {
      cy.findByRole('link', { name: "What's new" }).click()
    })
    cy.url().should('include', '/whats-new')
    cy.findByRole('heading', { name: "What's new" })
  })
})
