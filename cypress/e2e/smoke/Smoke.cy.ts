describe('Respiratory Viruses Dashboard (Home)', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Displays navigation links', () => {
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

  // Coronavirus
  it('Loads the coronavirus page', () => {
    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('Coronavirus').click()
      })
      .url()
      .should('include', '/choose-topic/coronavirus')

    cy.findByRole('heading', { name: 'Coronavirus' })
  })

  // About
  it('Loads the About page', () => {
    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('About').click()
      })
      .url()
      .should('include', '/about')

    cy.findByRole('heading', { name: 'About' })
  })

  // What's new
  it("Loads the What's New page", () => {
    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText("What's new").click()
      })
      .url()
      .should('include', '/whats-new')

    cy.findByRole('heading', { name: "What's New" })
  })

  // Maps
  it('Loads the maps page', () => {
    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('Maps').click()
      })
      .url()
      .should('include', '/maps')

    cy.findByRole('heading', { name: 'Maps' })
  })

  // How to use this data
  it("Loads the 'How to use this data' page", () => {
    cy.findByRole('navigation', { name: 'Menu' })
      .within(() => {
        cy.findByText('How to use this data').click()
      })
      .url()
      .should('include', '/how-to-use-this-data')

    cy.findByRole('heading', { name: 'How to use this data' })
  })

  // Home (Dashboard) page
  it('Page displays, and contents navigation successful', () => {
    cy.findByRole('heading', { name: 'Respiratory viruses' })
  })

  it('Shows Coronavirus summary section', () => {
    cy.findByRole('region', { name: 'Coronavirus' }).within(() => {
      cy.findByTestId('summary-section').within(() => {
        cy.findByRole('heading', {
          name: 'Cases',
        })
        cy.findByRole('heading', {
          name: 'Deaths',
        })
        cy.findByRole('heading', {
          name: 'Vaccines',
        })
        cy.findByRole('heading', {
          name: 'Healthcare',
        })
        cy.findByRole('heading', {
          name: 'Testing',
        })
      })
    })
  })

  it('Shows cases card, and buttons for download & tabular format', () => {
    cy.findByRole('region', { name: 'Coronavirus' }).within(() => {
      cy.findByTestId('cases-section').as('cases-section')

      cy.get('@cases-section').within(() => {
        cy.findByRole('button', { name: 'Download' })
        cy.findByText('View data in a tabular format')
      })
    })
  })

  it('displays related links', () => {
    cy.findByRole('heading', { name: 'Related Links', level: 2 })
  })
})

// Influenza page
describe('Influenza Page', () => {
  beforeEach(() => {
    cy.visit('/choose-topic/influenza')
  })

  it('Displays heading', () => {
    cy.findByRole('heading', { name: 'Influenza' })
  })

  it('Displays accordion, and accordion functionality works', () => {
    cy.findByTestId('virus-accordion').as('accordion')

    cy.get('@accordion').within(() => {
      cy.findByRole('button', { name: 'Show all sections' })
    })
  })

  it('displays related links', () => {
    cy.findByRole('heading', { name: 'Related Links', level: 2 })
  })
})

describe('Other respiratory viruses page', () => {
  beforeEach(() => {
    cy.visit('/choose-topic/other-respiratory-viruses')
  })

  it('Displays heading', () => {
    cy.findByRole('heading', { name: 'Other respiratory viruses' })
  })
})
