import '@testing-library/cypress/add-commands'

import { relatedLinksMock } from '../../src/api/mocks/cms/data/elements'

/// <reference types="cypress" />

Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

Cypress.Commands.add('checkLayoutExists', () => {
  cy.findByRole('banner').within(() => {
    cy.findByRole('link', { name: 'GOV.UK' })
    cy.findByRole('link', { name: 'UKHSA data dashboard' })
  })

  cy.findByTestId('ukhsa-phase-banner')
  cy.findByRole('link', { name: 'Back to top' })

  cy.findByRole('contentinfo').within(() => {
    cy.findByText(/All content is available under the/)
    cy.findByText(/Open Government Licence v3.0/)
    cy.findByText(/, except where otherwise stated/)
    cy.findByText(/© Crown copyright/)
  })

  cy.findByRole('navigation', { name: 'Menu' }).within(() => {
    cy.findByRole('link', { name: 'Dashboard' })
    cy.findByRole('link', { name: 'COVID-19' })
    cy.findByRole('link', { name: 'Influenza' })
    cy.findByRole('link', { name: 'Other respiratory viruses' })
    cy.findByRole('link', { name: 'API' })
    cy.findByRole('link', { name: 'About' })
    cy.findByRole('link', { name: "What's new" })
  })
})

Cypress.Commands.add('checkRelatedLinksExist', () => {
  cy.findByRole('heading', { name: 'Related Links', level: 2 })

  cy.wrap(relatedLinksMock).each((_, index) => {
    cy.findByText(relatedLinksMock[index].title).should('have.attr', 'href', relatedLinksMock[index].url)

    // Because the related link body property is an html string we cannot assert that an html string exists
    // This hack creates a fake element, sets the innerHtml of the element to our related link body and
    // then extracts the textContent of that element.
    const fakeEle = document.createElement('p')
    fakeEle.innerHTML = relatedLinksMock[index].body
    if (fakeEle.textContent) cy.findByText(fakeEle.textContent)
  })
})

Cypress.Commands.add('checkAccordionExists', () => {
  cy.findByTestId('virus-accordion').as('accordion')

  cy.get('@accordion').within(() => {
    cy.findByRole('button', { name: 'Show all sections' })

    const sections = ['Symptoms', 'Transmission', 'Treatment', 'Prevention', 'Surveillance and reporting']
    cy.wrap(sections).each((num, i) => {
      cy.findByRole('button', { name: `${sections[i]} Show` }).click()
      cy.findByText(`${sections[i]} text here`).should('be.visible')
      cy.findByRole('button', { name: `${sections[i]} Hide` }).click()
      cy.findByText(`${sections[i]} text here`).should('not.be.visible')
    })
  })
})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      checkLayoutExists(): Chainable<void>
      checkRelatedLinksExist(): Chainable<void>
      checkAccordionExists(): Chainable<void>
    }
  }
}
