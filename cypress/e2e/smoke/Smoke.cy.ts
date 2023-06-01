import path from 'path'
import { downloadsCsvFixture } from '@/api/mocks/downloads/fixtures/downloads-csv'

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
      .should('include', '/viruses/coronavirus')

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
  it('Loads the maps page', () => {
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
    cy.findByRole('heading', { name: 'Respiratory Viruses' })

    cy.findByRole('navigation', {
      name: 'Contents',
    }).as('contents')

    cy.get('@contents').findByText('Coronavirus').click()

    cy.url().should('eql', `${Cypress.config().baseUrl}/#coronavirus`)
  })

  it('Shows Coronavirus summary section', () => {
    cy.findByTestId('summary-section').within(() => {
      cy.findByRole('heading', {
        name: 'Cases',
      })
      cy.findByRole('heading', {
        name: 'Deaths',
      })
      cy.findByRole('heading', {
        name: 'Testing',
      })
    })
  })

  it('Shows cases card, and downloads when requested', () => {
    const downloadsFolder = Cypress.config('downloadsFolder')

    cy.findByTestId('cases-section').as('cases-section')

    cy.get('@cases-section').within(() => {
      cy.findByRole('button', { name: 'Download' })
      cy.findByText('View data in a tabular format')
    })

    cy.window()
      .document()
      .then(function (doc) {
        doc.addEventListener('click', () => {
          setTimeout(function () {
            doc.location.reload()
          }, 1000)
        })
        cy.findByRole('button', { name: 'Download' }).click()

        cy.readFile(path.join(downloadsFolder, 'data.csv')).should('eql', downloadsCsvFixture)

        cy.task('deleteFolder', downloadsFolder)
      })
  })

  it('displays related links', () => {
    cy.checkRelatedLinksExist()
  })
})

// Influenza page
describe('Influenza Page', () => {
  beforeEach(() => {
    cy.visit('/viruses/influenza')
  })

  it('Displays heading', () => {
    cy.findByRole('heading', { name: 'Influenza' })
  })

  it('Displays accordion, and accordion functionality works', () => {
    cy.checkAccordionExists()
  })

  it('displays related links', () => {
    cy.checkRelatedLinksExist()
  })
})

describe('Other respiratory viruses page', () => {
  beforeEach(() => {
    cy.visit('/viruses/other-respiratory-viruses')
  })

  it('Displays heading', () => {
    cy.findByRole('heading', { name: 'Other Respiratory Viruses' })
  })

  it('Displays accordion, and accordion functionality works', () => {
    cy.checkAccordionExists()
  })

  it('displays related links', () => {
    cy.checkRelatedLinksExist()
  })
})
