import { serializeJsonDownload } from './utils'

describe('serializeJsonDownload', () => {
  test('does not serialize an existing JSON string again', () => {
    const json = '[{"date":"2023-10-30"}]'

    expect(serializeJsonDownload(json)).toBe(json)
  })

  test('serializes a JSON value once', () => {
    expect(serializeJsonDownload([{ date: '2023-10-30' }])).toBe('[{"date":"2023-10-30"}]')
  })
})
