import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture'

test.describe('Cookie banner - mobile @mobileOnly', () => {
  test.use({ viewport: viewports.mobile })

  test('displays the cookie banner on mobile', async ({ landingPage, app }) => {
    await landingPage.goto()
    await app.hasCookieBanner()
  })
})

test.describe('Cookie banner - tablet @tabletOnly', () => {
  test.use({ viewport: viewports.tablet })

  test('displays the cookie banner on tablet', async ({ landingPage, app }) => {
    await landingPage.goto()
    await app.hasCookieBanner()
  })
})

test.describe('Cookie banner - desktop @desktopOnly', () => {
  test.use({ viewport: viewports.desktop })

  test('displays the cookie banner on desktop', async ({ landingPage, app }) => {
    await landingPage.goto()
    await app.hasCookieBanner()
  })
})

test('Does not render the cookie banner if the GDPR cookie is already set', async ({ landingPage, app }) => {
  await test.step('loads the page', async () => {
    await landingPage.goto()
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
  await test.step('refresh browser', async () => {
    await app.reload()
  })
  await test.step('does not display cookie banner', async () => {
    await app.hasNotCookieBanner()
  })
})
