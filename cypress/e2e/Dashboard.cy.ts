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
    cy.findByRole('heading', { name: 'Respiratory viruses', level: 1 })
    cy.findByText('Last updated on Tuesday, 21 March 2023 at 10:25am')
    cy.findByText('Data and insights from the UKHSA on respiratory viruses.')
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
    cy.findByRole('article', {
      name: 'Coronavirus Summary',
    }).as('summary-section')

    cy.get('@summary-section').within(() => {
      cy.findByRole('heading', {
        name: 'Cases',
      })
      cy.findByText('24,298').siblings().findByText('Weekly')
      cy.findByText('692 (-3.0%)').siblings().findByText('Last 7 days')

      cy.findByRole('heading', {
        name: 'Deaths',
      })
      cy.findByText('379').siblings().findByText('Weekly')
      cy.findByText('21 (-5.0%)').siblings().findByText('Last 7 days')

      cy.findByRole('heading', {
        name: 'Healthcare',
      })
      cy.findByText('6,288').siblings().findByText('Patients admitted')
      cy.findByText('377 (6.0%)').siblings().findByText('Last 7 days')

      cy.findByRole('heading', {
        name: 'Vaccinations',
      })
      cy.findByText('4,095,083').siblings().findByText('Spring Booster')
      cy.findByText('15,129,590').siblings().findByText('Autumn Booster')

      cy.findByRole('heading', {
        name: 'Testing',
      })
      cy.findByText('10.4%').siblings().findByText('Virus tests positivity (%)')
      cy.findByText('1 (-8.8%)').siblings().findByText('Last 7 days')
    })

    // Cases column
    cy.findByRole('article', {
      name: 'Coronavirus Cases',
    }).as('cases-section')

    cy.get('@cases-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('People tested positive in England')
      cy.findByText('Up to and including 8 March 2023')
      cy.findByText('24,298').siblings().findByText('Last 7 days')
      // cy.findByAltText('People tested positive in England up to and including 25th February 2023')
      // cy.findByText('View data in a tabular format')
      cy.findByText('-692 (-3.0%)')
    })

    // Deaths column
    cy.findByRole('article', {
      name: 'Coronavirus Deaths',
    }).as('deaths-section')

    cy.get('@deaths-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('Deaths with COVID-19 on the death Certificate in England')
      cy.findByText('Up to and including 10 February 2023')
      cy.findByText('379').siblings().findByText('Last 7 days')
      // cy.findByAltText('Deaths with COVID-19 on the death certificate in England up to and including 3rd February 2023')
      // cy.findByText('View data in a tabular format')
      cy.findByText('-21 (-5.0%)')
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
    cy.findByRole('article', {
      name: 'Influenza Summary',
    }).as('summary-section')

    cy.get('@summary-section').within(() => {
      cy.findByRole('heading', {
        name: 'Healthcare',
      })

      cy.findByTestId('column-healthcare').within(() => {
        cy.findByText('2').siblings().findByText('Patients admitted')
        cy.findByText('1 (127.2%)').siblings().findByText('Last 7 days')
      })

      cy.findByTestId('column-testing').within(() => {
        cy.findByRole('heading', {
          name: 'Testing',
        })
        cy.findByText('2').siblings().findByText('Virus tests reported')
        cy.findByText('0 (17.8%)').siblings().findByText('Last 7 days')
      })
    })

    // Healthcare column
    cy.findByRole('article', {
      name: 'Influenza Healthcare',
    }).as('cases-section')

    cy.get('@cases-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('Weekly hospital admission rates for Influenza')
      cy.findByText('Up to and including no_value')
      cy.findByText('2').siblings().findByText('Last 7 days')
      // cy.findByAltText('Weekly hospital admission rates for Influenza up to and including 25th February 2023')
      // cy.findByText('View data in a tabular format')
      cy.findByText('1 (127.2%)')
    })

    // Testing column
    cy.findByRole('article', {
      name: 'Influenza Testing',
    }).as('deaths-section')

    cy.get('@deaths-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('Weekly positivity by age')
      cy.findByText('Up to and including 20 February 2023')
      cy.findByText('2').siblings().findByText('Last 7 days')
      // cy.findByAltText('Weekly positivity by age up to and including 3rd February 2023')
      // cy.findByText('View data in a tabular format')
      cy.findByText('0 (17.8%)')
    })
  })

  it('displays related links', () => {
    cy.checkRelatedLinksExist()
  })

  it('downloads a csv when clicking a download link', () => {
    const downloadsFolder = Cypress.config('downloadsFolder')

    const articles = ['Coronavirus Cases', 'Coronavirus Deaths', 'Influenza Healthcare', 'Influenza Testing']

    articles.forEach((name) => {
      cy.findByRole('article', {
        name,
      }).within(() => {
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
