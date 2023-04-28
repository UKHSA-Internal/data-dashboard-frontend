import path from 'path'
import 'cypress-axe'

describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  it('Has no detectable a11y violations', () => {
    cy.checkA11y('html', {
      rules: {
        'document-title': { enabled: false },
        'html-has-lang': { enabled: false },
        region: { enabled: false },
      },
    })
  })

  it('displays a title, last updated date and body', () => {
    cy.title().should('eq', 'Respiratory viruses')
    cy.findByRole('heading', { name: 'Respiratory viruses', level: 1 })
    cy.findByText('Last updated on Tuesday, 21 March 2023 at 10:25am')

    // TODO: Restore in #CDD-699
    // cy.findByText('Data and insights from the UKHSA on respiratory viruses.')
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

      cy.findByText('Last 7 days: 692 (-3.0%), downward positive trend')

      cy.findByRole('heading', {
        name: 'Deaths',
      })
      cy.findByText('Weekly: 379')
      cy.findByText('Last 7 days: 21 (-5.0%), downward positive trend')

      cy.findByRole('heading', {
        name: 'Healthcare',
      })
      cy.findByText('Patients admitted: 6,288')
      cy.findByText('Last 7 days: 377 (6.0%), upward negative trend')

      cy.findByRole('heading', {
        name: 'Vaccinations',
      })
      cy.findByText('Spring Booster: 4,095,083')
      cy.findByText('Autumn Booster: 15,129,590')

      cy.findByRole('heading', {
        name: 'Testing',
      })
      cy.findByText('Virus tests positivity (%): 10.4%')
      cy.findByText('Last 7 days: 1 (-8.8%), downward positive trend')
    })

    // Cases column
    cy.findByTestId('cases-section').as('cases-section')

    cy.get('@cases-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('People tested positive in England')
      cy.findByText('Up to and including 8 March 2023')
      cy.findByText('Last 7 days: 24,298')
      // cy.findByAltText('People tested positive in England up to and including 25th February 2023')
      // cy.findByText('View data in a tabular format')
      cy.findByText(': -692 (-3.0%), downward positive trend')
    })

    // Deaths column
    cy.findByTestId('deaths-section').as('deaths-section')

    cy.get('@deaths-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('Deaths with COVID-19 on the death Certificate in England')
      cy.findByText('Up to and including 10 February 2023')
      cy.findByText('Last 7 days: 379')
      // cy.findByAltText('Deaths with COVID-19 on the death certificate in England up to and including 3rd February 2023')
      // cy.findByText('View data in a tabular format')
      cy.findByText(': -21 (-5.0%), downward positive trend')
    })
  })

  it.only('displays influenza statistics', () => {
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
        cy.findByText('Patients admitted: 2')
        cy.findByText('Last 7 days: 1 (127.2%), no change compared to the previous 7 days')
      })

      cy.findByTestId('column-testing').within(() => {
        cy.findByRole('heading', {
          name: 'Testing',
        })
        cy.findByText('Virus tests reported: 2')
        cy.findByText('Last 7 days: 0 (17.8%), no change compared to the previous 7 days')
      })
    })

    // Healthcare column
    cy.findByRole('region', { name: 'Influenza' }).within(() => {
      cy.findByTestId('healthcare-section').as('healthcare-section')
    })

    cy.get('@healthcare-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('Weekly hospital admission rates for Influenza')
      cy.findByText('Up to and including no_value')
      cy.findByText('Last 7 days: 2')
      // cy.findByAltText('Weekly hospital admission rates for Influenza up to and including 25th February 2023')
      // cy.findByText('View data in a tabular format')
      cy.findByText(': 1 (127.2%), no change compared to the previous 7 days')
    })

    // Testing column
    cy.findByRole('region', { name: 'Influenza' }).within(() => {
      cy.findByTestId('testing-section').as('testing-section')
    })

    cy.get('@testing-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('Weekly positivity by age')
      cy.findByText('Up to and including 20 February 2023')
      cy.findByText('Last 7 days: 2')
      // cy.findByAltText('Weekly positivity by age up to and including 3rd February 2023')
      // cy.findByText('View data in a tabular format')
      cy.findByText(': 0 (17.8%), no change compared to the previous 7 days')
    })
  })

  it('displays related links', () => {
    cy.checkRelatedLinksExist()
  })

  it('downloads a csv when clicking a download link', () => {
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
            cy.findByRole('link', { name: 'Download' }).click()

            cy.readFile(path.join(downloadsFolder, 'download.csv')).should('exist')

            cy.task('deleteFolder', downloadsFolder)
          })
      })
    })
  })
})
