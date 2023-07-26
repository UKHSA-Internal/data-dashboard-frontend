import 'cypress-axe'

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  it('has no detectable a11y violations', () => {
    cy.checkA11y('html', {
      rules: {
        region: { enabled: false },
      },
    })
  })

  it('displays the layout correctly', () => {
    cy.checkLayoutExists()
  })

  it('displays related links', () => {
    cy.checkRelatedLinksExist()
  })

  it('displays a page title, heading and description', () => {
    cy.title().should('eq', 'Respiratory Viruses | UKHSA data dashboard')
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Overall summary of the respiratory viruses in circulation within the UK'
    )
    cy.findByText('Welcome')
    cy.findByRole('heading', { name: 'Respiratory viruses', level: 1 })
    cy.findByText('Data and insights from the UKHSA on respiratory viruses.')
    cy.findByText('See the simple summary for England (opens in a new tab).')
  })

  it('displays the topic summary sections', () => {
    cy.findByRole('heading', { name: 'COVID-19', level: 2 })
    cy.findByText('The UKHSA dashboard for data and insights on COVID-19.')

    cy.findByRole('heading', { name: 'Influenza', level: 2 })
    cy.findByText('The UKHSA dashboard for data and insights on Influenza.')

    cy.findAllByAltText('').should('have.length', 4)
    cy.findAllByRole('button', { name: 'Download (csv)' }).should('have.length', 4)
    cy.findAllByText('View data in a tabular format').should('have.length', 4)
  })
})
