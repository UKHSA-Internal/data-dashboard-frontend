import path from 'path'

describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays a title, last updated date and body', () => {
    cy.findByRole('heading', { name: 'Respiratory viruses', level: 1 })
    cy.findByText('Last updated on March 21st 2023 at 10:25am')
    cy.findByText('Data and insights from the UKHSA on respiratory viruses.')
  })

  it('displays coronavirus statistics', () => {
    cy.findByRole('navigation', {
      name: 'Respiratory viruses in this dashboard',
    }).as('contents')

    cy.get('@contents').findByText('Coronavirus').click()

    cy.findByRole('heading', { name: 'Coronavirus', level: 2 })

    cy.url().should('eql', `${Cypress.config().baseUrl}/#coronavirus`)

    cy.findByText('The UKHSA dashboard for data and insights on Coronavirus.')

    // Summary section
    cy.findByRole('article', {
      name: 'Coronavirus summary',
    }).as('summary-section')

    cy.get('@summary-section').within(() => {
      cy.findByRole('heading', {
        name: 'Cases',
      })
      cy.findByText('20,629,892').siblings().findByText('Weekly')
      cy.findByText('24,568 (-0.1%)').siblings().findByText('Last 7 days')

      cy.findByRole('heading', {
        name: 'Deaths',
      })
      cy.findByText('393').siblings().findByText('Weekly')
      cy.findByText('185,707 (-1.9%)').siblings().findByText('Last 7 days')

      cy.findByRole('heading', {
        name: 'Deaths',
      })
      cy.findByText('981,596').siblings().findByText('Patients admitted')
      cy.findByText('4,807 (0.2%)').siblings().findByText('Last 7 days')

      cy.findByRole('heading', {
        name: 'Vaccines',
      })
      cy.findByText('45,410,567').siblings().findByText('Spring booster')
      cy.findByText('42,939,917').siblings().findByText('Summer booster')

      cy.findByRole('heading', {
        name: 'Testing',
      })
      cy.findByText('10.9%').siblings().findByText('Virus tests positivity (%)')
      cy.findByText('5,425 (0.4%)').siblings().findByText('Last 7 days')
    })

    // Cases column
    cy.findByRole('article', {
      name: 'Coronavirus cases',
    }).as('cases-section')

    cy.get('@cases-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('People tested positive in England')
      cy.findByText('Up to and including 25th February 2023')
      cy.findByText('24,568').siblings().findByText('Last 7 days')
      cy.findByAltText('People tested positive in England up to and including 25th February 2023')
      cy.findByText('View data in a tabular format')
      cy.findByText('-1,600 (-6.1%)')
    })

    // Deaths column
    cy.findByRole('article', {
      name: 'Coronavirus deaths',
    }).as('deaths-section')

    cy.get('@deaths-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('Deaths with COVID-19 on the death certificate in England')
      cy.findByText('Up to and including 3rd February 2023')
      cy.findByText('393').siblings().findByText('Last 7 days')
      cy.findByAltText('Deaths with COVID-19 on the death certificate in England up to and including 3rd February 2023')
      cy.findByText('View data in a tabular format')
      cy.findByText('-31 (-7.3%)')
    })
  })

  it('displays influenza statistics', () => {
    cy.findByRole('navigation', {
      name: 'Respiratory viruses in this dashboard',
    }).as('contents')

    cy.get('@contents').findByText('Influenza').click()

    cy.findByRole('heading', { name: 'Influenza', level: 2 })

    cy.url().should('eql', `${Cypress.config().baseUrl}/#influenza`)

    cy.findByText('The UKHSA dashboard for data and insights on Influenza.')

    // Summary section
    cy.findByRole('article', {
      name: 'Influenza summary',
    }).as('summary-section')

    cy.get('@summary-section').within(() => {
      cy.findByRole('heading', {
        name: 'Healthcare',
      })
      cy.findByText('981,596').siblings().findByText('Patients admitted')
      cy.findByText('5,788 (0.3%)')

      cy.findByRole('heading', {
        name: 'Vaccines',
      })
      cy.findByText('45,410,567').siblings().findByText('Spring booster')
      cy.findByText('42,939,917').siblings().findByText('Summer booster')

      cy.findByRole('heading', {
        name: 'Testing',
      })
      cy.findByText('10.9%').siblings().findByText('Virus tests positivity (%)')
      cy.findByText('16,109 (2.3%)')
    })

    // Healthcare column
    cy.findByRole('article', {
      name: 'Influenza healthcare',
    }).as('cases-section')

    cy.get('@cases-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('Weekly hospital admission rates for Influenza')
      cy.findByText('Up to and including 25th February 2023')
      cy.findByText('24,568').siblings().findByText('Last 7 days')
      cy.findByAltText('Weekly hospital admission rates for Influenza up to and including 25th February 2023')
      cy.findByText('View data in a tabular format')
      cy.findByText('-1,600 (-6.1%)')
    })

    // Testing column
    cy.findByRole('article', {
      name: 'Influenza testing',
    }).as('deaths-section')

    cy.get('@deaths-section').within(() => {
      cy.findByRole('link', { name: 'Download' })
      cy.findByText('Weekly positivity by age')
      cy.findByText('Up to and including 3rd February 2023')
      cy.findByText('393').siblings().findByText('Last 7 days')
      cy.findByAltText('Weekly positivity by age up to and including 3rd February 2023')
      cy.findByText('View data in a tabular format')
      cy.findByText('-31 (-7.3%)')
    })
  })

  it('displays related links', () => {
    cy.checkRelatedLinksExist()
  })

  it('downloads a csv when clicking a download link', () => {
    const downloadsFolder = Cypress.config('downloadsFolder')

    const articles = ['Coronavirus cases', 'Coronavirus deaths', 'Influenza healthcare', 'Influenza testing']

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
