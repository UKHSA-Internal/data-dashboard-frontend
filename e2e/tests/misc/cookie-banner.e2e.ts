import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Cookie banner - mobile', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the cookie banner on mobile', async ({ homePage, app }) => {
    await homePage.goto()
    await app.hasCookieBanner()
  })
})

test.describe('Cookie banner - tablet', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the cookie banner on tablet', async ({ homePage, app }) => {
    await homePage.goto()
    await app.hasCookieBanner()
  })
})

test.describe('Cookie banner - desktop', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the cookie banner on desktop', async ({ homePage, app }) => {
    await homePage.goto()
    await app.hasCookieBanner()
  })
})

test('Does not render the cookie banner if the GDPR cookie is already set', async ({ homePage, app }) => {
  await test.step('loads the page', async () => {
    await homePage.goto()
  })
  await test.step('displays cookie banner', async () => {
    await app.hasCookieBanner()
  })
  await test.step('click "Accept additional cookies" button', async () => {
    await app.acceptCookies()
  })
  await test.step('shows confirmation message', async () => {
    await app.hasCookieBannerConfirmation()
  })
  await test.step('click "Hide cookie message" button', async () => {
    await app.hideCookies()
  })
  await test.step('does not display the cookie banner', async () => {
    await app.hasNotCookieBanner()
  })
  await test.step('refresh browser', async () => {
    await app.reload()
  })
  await test.step('does not display cookie banner', async () => {
    await app.hasNotCookieBanner()
  })
})
