import { getAllDashboardCharts } from './getAllDashboardCharts'

test('Skips fetch calls to the real-world api when chart mocks are enabled', async () => {
  process.env.NEXT_PUBLIC_USE_CHART_MOCKS = 'enabled'
  const charts = await getAllDashboardCharts()
  expect(charts).toEqual({ Coronavirus: { Cases: '', Deaths: '' }, Influenza: { Healthcare: '', Testing: '' } })
})

test('Fetches the real-world charts when mocks are disabled', async () => {
  process.env.NEXT_PUBLIC_USE_CHART_MOCKS = 'disabled'

  global.fetch = jest.fn((url) => {
    return Promise.resolve({
      ok: true,
      text: () => `<svg>${url}</svg>`,
    })
  }) as jest.Mock

  const charts = await getAllDashboardCharts()
  expect(charts).toEqual({
    Coronavirus: {
      Cases: '<svg>http://backend.com/charts/COVID-19/Cases</svg>',
      Deaths: '<svg>http://backend.com/charts/COVID-19/Deaths</svg>',
    },
    Influenza: {
      Healthcare: '<svg>http://backend.com/charts/Influenza/Healthcare</svg>',
      Testing: '<svg>http://backend.com/charts/Influenza/Testing</svg>',
    },
  })
})
