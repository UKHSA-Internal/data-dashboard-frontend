import 'cypress-axe'

import { downloadsCsvFixture } from '@/api/mocks/downloads/fixtures/downloads-csv'
import path from 'path'

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
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

  it('displays a title, description and last updated date', () => {
    cy.title().should('eq', 'Respiratory viruses')
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Data and insights from the UKHSA on respiratory viruses.'
    )
    cy.findByRole('heading', { name: 'Respiratory viruses', level: 1 })
    cy.findByText(/Last updated on Wednesday, 10 May 2023/)
    cy.findByText('Data and insights from the UKHSA on respiratory viruses.')
    cy.findByRole('link', { name: 'See the simple summary for England (opens in a new tab).' })
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', 'https://www.gov.uk/government/organisations/uk-health-security-agency')
  })

  it('displays coronavirus statistics', () => {
    cy.findByRole('navigation', {
      name: 'Contents',
    }).as('contents')

    cy.get('@contents').findByText('Coronavirus').click()

    cy.findByRole('heading', { name: 'Coronavirus', level: 2 })

    cy.url().should('eql', `${Cypress.config().baseUrl}/#coronavirus`)

    cy.findByText('The UKHSA dashboard for data and insights on Coronavirus.')

    // Summary section
    cy.findByRole('region', { name: 'Coronavirus' }).within(() => {
      cy.findByTestId('summary-section').as('summary-section')
    })

    cy.get('@summary-section').within(() => {
      cy.findByRole('heading', {
        name: 'Cases',
      })

      cy.findByText('Weekly: 24,298')

      cy.findByText('Last 7 days: -592 (-3%), downward positive trend')

      cy.findByRole('heading', {
        name: 'Deaths',
      })
      cy.findByText('Weekly: 379')
      cy.findByText('Last 7 days: 21 (-5%), downward positive trend')

      cy.findByRole('heading', {
        name: 'Healthcare',
      })
      cy.findByText('Patients admitted: 6,288')
      cy.findByText('Last 7 days: 377 (6%), upward negative trend')

      cy.findByRole('heading', {
        name: 'Vaccines',
      })
      cy.findByText('Autumn booster: 4,095,083')
      cy.findByText('Percentage uptake: 64.5%')

      cy.findByRole('heading', {
        name: 'Testing',
      })
      cy.findByText('Virus tests positivity: 10.4%')
    })

    // Cases column
    cy.findByTestId('cases-section').as('cases-section')

    cy.get('@cases-section').within(() => {
      cy.findByRole('button', { name: 'Download' })
      cy.findByText('Positive tests reported in England')
      cy.findByText('Last 7 days: 24,298')
      cy.findByText(': -592 (-3%), downward positive trend')
      cy.findByAltText('')
      cy.findByText('View data in a tabular format')
    })

    // Deaths column
    cy.findByTestId('deaths-section').as('deaths-section')

    cy.get('@deaths-section').within(() => {
      cy.findByRole('button', { name: 'Download' })
      cy.findByText('Deaths with COVID-19 on the death certificate in England')
      cy.findByText('Last 7 days: 379')
      cy.findByText(': 21 (-5%), downward positive trend')
      cy.findByAltText('')
      cy.findByText('View data in a tabular format')
    })
  })

  it('displays influenza statistics', () => {
    cy.findByRole('navigation', {
      name: 'Contents',
    }).as('contents')

    cy.get('@contents').findByText('Influenza').click()

    cy.findByRole('heading', { name: 'Influenza', level: 2 })

    cy.url().should('eql', `${Cypress.config().baseUrl}/#influenza`)

    cy.findByText('The UKHSA dashboard for data and insights on Influenza.')

    // Summary section
    cy.findByRole('region', { name: 'Influenza' }).within(() => {
      cy.findByTestId('summary-section').as('summary-section')
    })

    cy.get('@summary-section').within(() => {
      cy.findByRole('heading', {
        name: 'Healthcare',
      })

      cy.findByTestId('column-healthcare').within(() => {
        cy.findByText('Hospital admission rate (per 100,000): 981,596')
        cy.findByText('Last 7 days: 5,911 (0.3%), downward positive trend')
      })

      cy.findByTestId('column-testing').within(() => {
        cy.findByRole('heading', {
          name: 'Testing',
        })
        cy.findByText('Virus tests positivity: 12.2%')
      })
    })

    // Healthcare column
    cy.findByRole('region', { name: 'Influenza' }).within(() => {
      cy.findByTestId('healthcare-section').as('healthcare-section')
    })

    cy.get('@healthcare-section').within(() => {
      cy.findByRole('button', { name: 'Download' })
      cy.findByText('Weekly hospital admission rates for Influenza')
      cy.findByText('Last 7 days: 981,596')
      cy.findByText(': 5,911 (0.3%), downward positive trend')
      cy.findByAltText('')
      cy.findByText('View data in a tabular format')
    })

    // Testing column
    cy.findByRole('region', { name: 'Influenza' }).within(() => {
      cy.findByTestId('testing-section').as('testing-section')
    })

    cy.get('@testing-section').within(() => {
      cy.findByRole('button', { name: 'Download' })
      cy.findByText('Weekly positivity')
      cy.findByAltText('')
      cy.findByText('View data in a tabular format')
    })
  })

  it('displays a tabular version for each chart', () => {
    const headers = ['Month', 'Amount']
    const months = ['Oct 2022', 'Nov 2022', 'Dec 2022', 'Jan 2023', 'Feb 2023', 'Mar 2023']

    cy.findByTestId('cases-section').within(() => {
      const values = ['12,630', '9,360', '10,886', '7,268', '11,408', '5,234']
      cy.findByText('View data in a tabular format').click()
      cy.findByRole('table').within(() => {
        cy.wrap(headers).each((_, index) => cy.findByText(headers[index]))
        cy.wrap(months).each((_, index) => cy.findByText(months[index]))
        cy.wrap(values).each((_, index) => cy.findByText(values[index]))
      })
    })

    cy.findByTestId('deaths-section').within(() => {
      const values = ['4,630', '3,608', '3,886', '3,268', '4,087', '2,364']
      cy.findByText('View data in a tabular format').click()
      cy.findByRole('table').within(() => {
        cy.wrap(headers).each((_, index) => cy.findByText(headers[index]))
        cy.wrap(months).each((_, index) => cy.findByText(months[index]))
        cy.wrap(values).each((_, index) => cy.findByText(values[index]))
      })
    })

    cy.findByTestId('healthcare-section').within(() => {
      const values = ['560', '368', '426', '228', '307', '534']
      cy.findByText('View data in a tabular format').click()
      cy.findByRole('table').within(() => {
        cy.wrap(headers).each((_, index) => cy.findByText(headers[index]))
        cy.wrap(months).each((_, index) => cy.findByText(months[index]))
        cy.wrap(values).each((_, index) => cy.findByText(values[index]))
      })
    })

    cy.findByTestId('testing-section').within(() => {
      const values = ['28,630', '19,608', '23,886', '12,268', '24,087', '32,364']
      cy.findByText('View data in a tabular format').click()
      cy.findByRole('table').within(() => {
        cy.wrap(headers).each((_, index) => cy.findByText(headers[index]))
        cy.wrap(months).each((_, index) => cy.findByText(months[index]))
        cy.wrap(values).each((_, index) => cy.findByText(values[index]))
      })
    })
  })

  it('displays related links', () => {
    cy.checkRelatedLinksExist()
  })

  it('downloads a csv when clicking download', () => {
    const downloadsFolder = Cypress.config('downloadsFolder')

    const sections = ['cases-section', 'deaths-section', 'healthcare-section', 'testing-section']

    sections.forEach((testId) => {
      cy.findByTestId(testId).within(() => {
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
    })
  })
})
