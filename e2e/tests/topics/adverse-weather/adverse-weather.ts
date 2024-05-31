import { test } from '../../../fixtures/app.fixture'

// test.describe('Feature flag enabled', () => {
//   test.describe('Extreme events category page', () => {
//     test('loads the page', async ({ app }) => {
//       await test.step('loads the page', async () => {
//         await app.goto('/extreme-events')
//       })
//       await test.step('metadata is correct', async () => {
//         await app.hasMetadata({
//           title: 'Extreme events category page',
//           description: 'Extreme events category page description',
//         })
//       })
//     })
//   })

//   test.describe('Heat health alerts page', () => {
//     test('loads the page', async ({ app }) => {
//       await test.step('loads the page', async () => {
//         await app.goto('/extreme-events/heat-health-alerts')
//       })
//       await test.step('metadata is correct', async () => {
//         await app.hasMetadata({
//           title: 'Health alerts page',
//           description: 'Health alerts page description',
//         })
//       })
//     })
//   })

//   test.describe('Cold health alerts page', () => {
//     test('loads the page', async ({ app }) => {
//       await test.step('loads the page', async () => {
//         await app.goto('/extreme-events/cold-health-alerts')
//       })
//       await test.step('metadata is correct', async () => {
//         await app.hasMetadata({
//           title: 'Health alerts page',
//           description: 'Health alerts page description',
//         })
//       })
//     })
//   })

//   test.describe('Weather health alerts page', () => {
//     test('loads the page', async ({ app }) => {
//       await test.step('loads the page', async () => {
//         await app.goto('/extreme-events/cold-health-alerts/east-midlands')
//       })
//       await test.step('metadata is correct', async () => {
//         await app.hasMetadata({
//           title: 'Weather health alert page',
//           description: 'Weather health alert description',
//         })
//       })
//     })
//   })
// })

/**
 *  Feature flag disabled
 */
test.describe('Feature flag disabled', () => {
  test.describe('Adverse weather category page', () => {
    test('loads the page', async ({ app }) => {
      await test.step('loads the page', async () => {
        await app.goto('/adverse-weather')
      })
      await test.step('metadata is correct', async () => {
        await app.hasDocumentTitle('Page not found | UKHSA data dashboard')
      })
      await test.step('Shows page not found message', async () => {
        await app.hasHeading('Page not found')
      })
    })
  })

  test.describe('Heat health alerts page', () => {
    test('loads the page', async ({ app }) => {
      await test.step('loads the page', async () => {
        await app.goto('/adverse-weather/heat-health-alerts')
      })
      await test.step('metadata is correct', async () => {
        await app.hasDocumentTitle('Page not found | UKHSA data dashboard')
      })
      await test.step('Shows page not found message', async () => {
        await app.hasHeading('Page not found')
      })
    })
  })

  test.describe('Cold health alerts page', () => {
    test('loads the page', async ({ app }) => {
      await test.step('loads the page', async () => {
        await app.goto('/adverse-weather/cold-health-alerts')
      })
      await test.step('metadata is correct', async () => {
        await app.hasDocumentTitle('Page not found | UKHSA data dashboard')
      })
      await test.step('Shows page not found message', async () => {
        await app.hasHeading('Page not found')
      })
    })
  })

  test.describe('Weather health alerts page', () => {
    test('loads the page', async ({ app }) => {
      await test.step('loads the page', async () => {
        await app.goto('/adverse-weather/cold-health-alerts/east-midlands')
      })
      await test.step('metadata is correct', async () => {
        await app.hasDocumentTitle('Page not found | UKHSA data dashboard')
      })
      await test.step('Shows page not found message', async () => {
        await app.hasHeading('Page not found')
      })
    })
  })
})
