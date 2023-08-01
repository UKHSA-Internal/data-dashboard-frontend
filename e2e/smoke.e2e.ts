import { expect, test } from '@playwright/test'

test('Home page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Respiratory Viruses | UKHSA data dashboard/)
  await page.getByRole('heading', { name: 'Respiratory viruses', level: 1 })
})

test.describe('Topic pages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('COVID-19', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'COVID-19' }).click()
    await expect(page).toHaveTitle(/COVID-19 | UKHSA data dashboard/)
    await page.getByRole('heading', { name: 'COVID-19', level: 1 })
  })

  test('Influenza', async ({ page }) => {
    await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Influenza' }).click()
    await expect(page).toHaveTitle(/Influenza | UKHSA data dashboard/)
    await page.getByRole('heading', { name: 'Influenza', level: 1 })
  })

  test('Other respiratory viruses', async ({ page }) => {
    await page
      .getByRole('navigation', { name: 'Menu' })
      .getByRole('link', { name: 'Other respiratory viruses' })
      .click()
    await expect(page).toHaveTitle(/Other respiratory viruses | UKHSA data dashboard/)
    await page.getByRole('heading', { name: 'Other respiratory viruses', level: 1 })
  })
})

test.describe('Common pages', () => {
  test('About', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle(/About | UKHSA data dashboard/)
    await page.getByRole('heading', { name: 'About', level: 1 })
  })

  test('Whats new', async ({ page }) => {
    await page.goto('/whats-new')
    await expect(page).toHaveTitle(/What's new | UKHSA data dashboard/)
    await page.getByRole('heading', { name: "What's new", level: 1 })
  })
})
