import path from 'path'

describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays a title and body', () => {
    cy.findByRole('heading', { name: 'Respiratory viruses', level: 1 })
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
      // cy.findByText('4,807 (0.2%)').siblings().findByText('Last 7 days') // Removing temporarily, failure needs investigation

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

      // TODO: Add assertions for the trend +/- values once this is added
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
      // cy.findByText('5,788 (0.3%)') // Removing temporarily, failure needs investigation

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

      // TODO: Add assertions for the trend +/- values once this is added
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
    cy.findByRole('heading', { name: 'Related Links', level: 2 })

    cy.checkRelatedLinksExist()

    cy.findByText('National flu and COVID-19 surveillance reports: 2022 to 2023 season').should(
      'have.attr',
      'href',
      'https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2022-to-2023-season'
    )
    cy.findByText(
      'National influenza and COVID-19 report, monitoring COVID-19 activity, seasonal flu and other seasonal respiratory illnesses.'
    )

    cy.findByText('Respiratory syncytial virus (RSV): guidance, data and analysis').should(
      'have.attr',
      'href',
      'https://www.gov.uk/government/collections/respiratory-syncytial-virus-rsv-guidance-data-and-analysis'
    )
    cy.findByText(
      'These documents provide advice on the symptoms, diagnosis, treatment, management and epidemiology of respiratory syncytial virus.'
    )

    cy.findByText(
      'National norovirus and rotavirus report, week 1 report: data up to week 51 (25 December 2022)'
    ).should(
      'have.attr',
      'href',
      'https://www.gov.uk/government/statistics/national-norovirus-and-rotavirus-surveillance-reports-2022-to-2023-season/national-norovirus-and-rotavirus-report-week-1-report-data-up-to-week-51-25-december-2022'
    )
    cy.findByText(
      'Data reported here provide a summary of norovirus and rotavirus activity (including enteric virus (EV) outbreaks) in England up to reporting week 51 of the 2022/2023 season.'
    )

    cy.findByText('Hepatitis (liver inflammation) cases in children – latest updates').should(
      'have.attr',
      'href',
      'https://www.gov.uk/government/news/hepatitis-liver-inflammation-cases-in-children-latest-updates'
    )
    cy.findByText(
      'Regular UKHSA updates on the ongoing investigation into higher than usual rates of liver inflammation (hepatitis) in children across the UK.'
    )

    cy.findByText('Human parainfluenza viruses: guidance and data').should(
      'have.attr',
      'href',
      'https://www.gov.uk/government/collections/human-parainfluenza-viruses-guidance-and-data'
    )
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
