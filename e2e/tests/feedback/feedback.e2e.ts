import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Feedback page', () => {
  test('Submitting the form', async ({ feedbackPage, feedbackConfirmationPage, app }) => {
    await test.step('loads the page', async () => {
      await feedbackPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await feedbackPage.hasMetadata()
    })
    await test.step('displays heading', async () => {
      await feedbackPage.hasHeading()
    })
    await test.step('displays form question headings', async () => {
      await feedbackPage.hasPageContent()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
    await test.step('fills out the form', async () => {
      await feedbackPage.fillFormInputs()
    })
    await test.step('submits the form', async () => {
      await feedbackPage.submitForm()
    })
    await test.step('confirms redirect to confirmation page', async () => {
      await feedbackConfirmationPage.hasHeading()
    })
  })
})

test.describe('Feedback page - no JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('Submitting the form without JavaScript', async ({ feedbackPage, feedbackConfirmationPage, app }) => {
    await test.step('loads the page', async () => {
      await feedbackPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await feedbackPage.hasMetadata()
    })
    await test.step('displays heading', async () => {
      await feedbackPage.hasHeading()
    })
    await test.step('displays form question headings', async () => {
      await feedbackPage.hasPageContent()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('fills out the form', async () => {
      await feedbackPage.fillFormInputs()
    })
    await test.step('submits the form', async () => {
      await feedbackPage.submitForm()
    })
    await test.step('confirms redirect to confirmation page', async () => {
      await feedbackConfirmationPage.hasHeading()
    })
  })
})

test.describe('Feedback confirmation page', () => {
  test('Displays correctly', async ({ feedbackConfirmationPage, app }) => {
    await test.step('loads the page', async () => {
      await feedbackConfirmationPage.goto()
    })
    await test.step('metadata is correct', async () => {
      await feedbackConfirmationPage.hasMetadata()
    })
    await test.step('displays heading', async () => {
      await feedbackConfirmationPage.hasHeading()
    })
    await test.step('has headings', async () => {
      await feedbackConfirmationPage.hasPageContent()
    })
    await test.step('displays the correct layout', async () => {
      await app.hasLayout()
    })
    await test.step('displays without any accessibility defects', async () => {
      await app.hasNoAccessibilityDefects()
    })
  })
})

test.describe('Feedback page - mobile @mobileOnly', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the navigation on mobile', async ({ feedbackPage, app }) => {
    await feedbackPage.goto()
    await app.hasNav()
  })
})

test.describe('Feedback page - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the navigation on tablet', async ({ feedbackPage, app }) => {
    await feedbackPage.goto()
    await app.hasNav()
  })
})

test.describe('Feedback page - desktop @desktopOnly', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the navigation on desktop', async ({ feedbackPage, app }) => {
    await feedbackPage.goto()
    await app.hasNav()
  })
})
