import { test, expect } from '@playwright/test'

test.describe('BFCacheReloadHandler', () => {
  test('reloads the page when a persisted pageshow event fires', async ({ page }) => {
    await page.addInitScript(() => {
      ;(window as any).__reloadCalled = false
      Object.defineProperty(window.location, 'reload', {
        configurable: true,
        writable: true,
        value: () => {
          ;(window as any).__reloadCalled = true
        },
      })
    })

    await page.goto('/respiratory-viruses/covid-19')

    await page.evaluate(() => {
      const event = new Event('pageshow') as PageTransitionEvent & { persisted: boolean }
      Object.defineProperty(event, 'persisted', { value: true })
      window.dispatchEvent(event)
    })

    const reloadCalled = await page.evaluate(() => (window as any).__reloadCalled)
    expect(reloadCalled).toBe(true)
  })

  test('does not reload on a normal (non-persisted) pageshow event', async ({ page }) => {
    await page.addInitScript(() => {
      ;(window as any).__reloadCalled = false
      Object.defineProperty(window.location, 'reload', {
        configurable: true,
        writable: true,
        value: () => {
          ;(window as any).__reloadCalled = true
        },
      })
    })

    await page.goto('/')

    await page.evaluate(() => {
      const event = new Event('pageshow') as PageTransitionEvent & { persisted: boolean }
      Object.defineProperty(event, 'persisted', { value: false })
      window.dispatchEvent(event)
    })

    const reloadCalled = await page.evaluate(() => (window as any).__reloadCalled)
    expect(reloadCalled).toBe(false)
  })

  test('cleans up the pageshow listener on unmount', async ({ page }) => {
    await page.addInitScript(() => {
      ;(window as any).__reloadCalled = false
      Object.defineProperty(window.location, 'reload', {
        configurable: true,
        writable: true,
        value: () => {
          ;(window as any).__reloadCalled = true
        },
      })
    })

    await page.goto('/')
    await page.goto('/some-route-without-handler')

    await page.evaluate(() => {
      const event = new Event('pageshow') as PageTransitionEvent & { persisted: boolean }
      Object.defineProperty(event, 'persisted', { value: true })
      window.dispatchEvent(event)
    })

    const reloadCalled = await page.evaluate(() => (window as any).__reloadCalled)
    expect(reloadCalled).toBe(false)
  })
})
