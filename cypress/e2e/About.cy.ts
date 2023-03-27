describe('About', () => {
  it('displays correctly', () => {
    cy.visit('/about')

    // Last updated
    cy.findByText('Last updated on March 18th 2023 at 10:25am')

    // Title
    cy.findByRole('heading', { name: 'About', level: 1 })

    // Contents
    cy.findByRole('navigation', { name: 'Contents' }).within(() => {
      cy.findByRole('link', { name: 'Respiratory viruses' })
      cy.findByRole('link', { name: 'Viruses' })
      cy.findByRole('link', { name: 'Cases' })
      cy.findByRole('link', { name: 'Hospitalisations' })
      cy.findByRole('link', { name: 'Deaths' })
    })

    // Body
    cy.findByRole('heading', { name: 'Respiratory viruses', level: 2 })
    cy.findByText(
      'Respiratory viruses can infect any age group. Some people (including children and the elderly) are more likely to become seriously ill or have other complications because of respiratory viruses. In the UK many of these viruses are seasonal and tend to circulate at higher levels during the winter months.'
    )

    cy.findByRole('heading', { name: 'Viruses', level: 2 })
    cy.findByText('The respiratory viruses we are reporting on are:')
    cy.findByText('Respiratory syncytial viruses (RSV)')
    cy.findByText('Coronavirus or COVID-19 (SARS-CoV-2)')
    cy.findByText('Adenovirus')
    cy.findByText('Parainfluenza')
    cy.findByText('Rhinovirus')
    cy.findByText('Human parainfluenza viruses (hMPV)')
    cy.findByText(
      'On each page we give an overview of the data available on the virus, along with an explanation of the virus and the illnesses they can cause.'
    )

    cy.findByRole('heading', { name: 'Cases', level: 2 })
    cy.findByText(
      'A case is when someone is confirmed as having an illness through a positive test. We report on the case numbers for different respiratory viruses.'
    )
    cy.findByText(
      "For many of the respiratory viruses we report on, the data available on positive tests is only those which have been reported by healthcare providers (like GP surgeries and hospitals). It's important when looking at case data to take this into consideration as it means not all cases will be show. For example, someone who becomes ill with the flu but doesn't seek medical treatment would not be counted as a case."
    )

    cy.findByRole('heading', { name: 'Hospitalisations', level: 2 })
    cy.findByText(
      'We report on the number of patients admitted to hospital with a type of virus. The hospitalisations data we report on is:'
    )
    cy.findByText('Respiratory emergency care admissions')
    cy.findByText('Influenza hospitalisations')
    cy.findByText('RSV hospitalisations')
    cy.findByText('COVID-19 hospitalisations')

    cy.findByRole('heading', { name: 'Vaccines', level: 2 })
    cy.findByText('We report on the number of vaccines given for:')
    cy.findByText('COVID-19')
    cy.findByText(
      'People offered a vaccine is different for each virus, depending on target groups recommended by healthcare professionals.'
    )

    cy.findByRole('heading', { name: 'Deaths', level: 2 })
    cy.findByText('We report on deaths related to COVID-19, including:')
    cy.findByText('Deaths with 28 days of a positive COVID-19 test - deaths with COVID.')
    cy.findByText('Deaths with COVID-19 on the death certificate - deaths from COVID.')
    cy.findByText('We also report on the excess deaths caused by respiratory viruses.')

    // Related links
    cy.checkRelatedLinksExist()
  })

  it('Anchors to the section when clicking the associated contents link', () => {
    cy.visit('/about')

    // Contents
    cy.findByRole('navigation', { name: 'Contents' }).within(() => {
      cy.findByRole('link', { name: 'Cases' }).click()
    })

    cy.findByRole('heading', { name: 'Cases' }).parent().should('have.focus')
  })
})
