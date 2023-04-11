import { getChart } from './getChart'

test('Throws an error if the request is not ok', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
    })
  ) as jest.Mock

  await expect(getChart('COVID-19', 'Cases')).rejects.toMatchObject(new Error('Failed to get chart'))
})

test('Returns the fetched chart as text', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      text: () => '<svg>mock</svg>',
    })
  ) as jest.Mock

  const chart = await getChart('COVID-19', 'Cases')
  expect(chart).toEqual('<svg>mock</svg>')
})
