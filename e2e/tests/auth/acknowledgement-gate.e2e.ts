import { ACKNOWLEDGEMENT_STORAGE_KEY } from '@/app/utils/acknowledgement.utils'

import { expect, test } from '../../fixtures/app.fixture'

const PRIVATE_PATH = '/respiratory-viruses/covid-19'

test.describe('Acknowledgement gate @auth-ui', () => {
  test('returns an authenticated user to the requested private page after acknowledgement', async ({
    page,
    authEnabled,
  }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await page.evaluate((key) => window.localStorage.removeItem(key), ACKNOWLEDGEMENT_STORAGE_KEY)

    await page.goto(PRIVATE_PATH)

    await expect(page).toHaveURL(`/acknowledgement?returnTo=${encodeURIComponent(PRIVATE_PATH)}`)
    const acknowledgementForm = page.locator('form').filter({
      has: page.locator('input[name="acknowledgement"]'),
    })
    const acknowledgementCheckbox = acknowledgementForm.locator('input[name="acknowledgement"]')
    await acknowledgementCheckbox.press('Space')
    await expect(acknowledgementCheckbox).toBeChecked()
    await acknowledgementForm.getByRole('button', { name: 'Agree', exact: true }).press('Enter')

    await expect(page).toHaveURL(PRIVATE_PATH)
    await expect
      .poll(() => page.evaluate((key) => window.localStorage.getItem(key), ACKNOWLEDGEMENT_STORAGE_KEY))
      .not.toBeNull()
  })

  test('redirects an accepted user away from acknowledgement without duplicate page chrome', async ({
    page,
    authEnabled,
  }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')
    await page.evaluate(({ key, value }) => window.localStorage.setItem(key, value), {
      key: ACKNOWLEDGEMENT_STORAGE_KEY,
      value: JSON.stringify({ accepted: true, acceptedAt: new Date().toISOString() }),
    })

    await page.goto('/acknowledgement')

    await expect(page).toHaveURL('/')
    await expect(page.getByRole('banner').getByRole('link', { name: 'GOV.UK' })).toHaveCount(1)
    await expect(page.getByRole('contentinfo')).toHaveCount(1)
    await expect(page.getByRole('checkbox', { name: 'I agree to the terms of service' })).toHaveCount(0)
  })
})

test.describe('Acknowledgement gate while logged out @auth-ui', () => {
  test.use({ startLoggedOut: true })

  test('redirects the acknowledgement URL to the start flow', async ({ page, authEnabled }) => {
    // Reason: All tests here are only relevant when auth has been enabled
    test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')

    await page.goto('/acknowledgement')
    await expect(page).toHaveURL('/start')
  })
})
