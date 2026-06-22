import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture.non.public'

test.describe('Non-public tests - desktop @non-public', () => {
  test.use({ viewport: viewports.desktop })

  test('Navigates to start page from the navigation menu', async ({ app, authStartPage }) => {
    await test.step('loads the start page', async () => {
      await authStartPage.goto()
      await authStartPage.hasMainHeading()
    })

    await test.step('loads the "start" page', async () => {
      await app.clickNav('start')
      await app.hasHeading('start')
    })
  })
})

test.describe('Non-public tests - mobile @non-public', () => {
  test.use({ viewport: viewports.mobile })

  test('Navigates to start page from the dropdown mobile navigation menu', async ({ app, authStartPage }) => {
    await test.step('loads the start page', async () => {
      await authStartPage.goto()
      await authStartPage.hasMainHeading()
    })

    await test.step('loads the "start" page', async () => {
      await app.clickNav('start')
      await app.hasHeading('start')
    })
  })
})

test.describe('Non-public tests - no JavaScript @non-public', () => {
  test.use({ javaScriptEnabled: false, viewport: viewports.desktop })

  test('Navigates to start page from the side navigation menu', async ({ app, authStartPage }) => {
    await test.step('loads the start page', async () => {
      await authStartPage.goto()
      await authStartPage.hasMainHeading()
    })

    await test.step('loads the "start" page', async () => {
      await app.clickBrowseNav('start')
      await app.hasHeading('start')
    })
  })
})
