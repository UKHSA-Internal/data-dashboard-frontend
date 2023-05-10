import '@testing-library/cypress/add-commands'

import { relatedLinksMock } from '../../src/api/mocks/cms/data/elements'

/// <reference types="cypress" />

Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from
  // failing the test
  return false
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
      checkRelatedLinksExist(): Chainable<void>
      checkAccordionExists(): Chainable<void>
    }
  }
}
