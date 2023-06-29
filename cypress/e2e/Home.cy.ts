import 'cypress-axe'

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

  it('displays landing page content', () => {
    cy.title().should('eq', 'UKHSA data dashboard')
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses.'
    )
    cy.findByRole('heading', { name: 'UKHSA data dashboard', level: 1 })
    cy.findByText(
      'The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses.'
    )
    cy.findByText('You can use this service to:')
    cy.findByText('get an overall summary of a public health threat')
    cy.findByText('see trends and patterns in health data')
    cy.findByText('find out information on a specific data metric')
    cy.findByText('download data using the API.')

    cy.findByRole('button', { name: 'Start now' })

    cy.findByRole('heading', { name: 'Explore location based data', level: 2 })
    cy.findByText('The UKHSA data dashboard shows data collected across different geographical regions.')
    cy.findByRole('link', { name: 'Go to maps' })

    // cy.findByRole('heading', { name: 'Understand the data', level: 2 })
    // cy.findByText('Find information on the rationale, methodology, data source and more for metrics across the dashboard.')
    // cy.findByRole('link', { name: 'Search metrics' })

    cy.findByRole('heading', { name: 'Use the API', level: 2 })
    cy.findByText("Search and download data by using the UKHSA data dashboard's API.")
    cy.findByRole('link', { name: 'Go to API' })

    cy.findByRole('heading', { name: 'About the dashboard', level: 2 })
    cy.findByText("The UKHSA data dashboard presents public health data in the UK. It's produced by the")
    cy.findByText(
      'The UKHSA is committed to informing the public of current health data in an accessible and transparent way. Initially, the UKHSA data dashboard is focused on respiratory viruses, such as coronavirus (COVID-19). In the future, the dashboard will present a wide range of health topics.'
    )
    cy.findByRole('link', { name: 'Find out more about the dashboard' })

    cy.findByRole('heading', { name: "What's new", level: 2 })
    cy.findByText(
      'The UKHSA data dashboard is regularly updated with new data and features. View a timeline of changes.'
    )
    cy.findByRole('link', { name: 'Get updates' })
  })
})
