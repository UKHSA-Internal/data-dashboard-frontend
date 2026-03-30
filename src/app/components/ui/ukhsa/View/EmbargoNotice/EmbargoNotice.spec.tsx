import { headers } from 'next/headers'

import { render, screen } from '@/config/test-utils'
import { logger } from '@/lib/logger'

import { EmbargoNotice } from './EmbargoNotice'

jest.mock('next/headers')
jest.mock('@/lib/logger')

const mockGet = jest.fn()

beforeEach(() => {
  ;(headers as jest.Mock).mockResolvedValue({ get: mockGet })
})

afterEach(() => {
  mockGet.mockReset()
})

const renderEmbargoNotice = async () => render((await EmbargoNotice()) ?? <></>)

describe('EmbargoNotice', () => {
  test('returns null when there is no x-url header', async () => {
    mockGet.mockReturnValue(null)
    const { container } = await renderEmbargoNotice()
    expect(container).toBeEmptyDOMElement()
  })

  test('returns null when the x-url has no et param', async () => {
    mockGet.mockReturnValue('https://example.com/some-page')
    const { container } = await renderEmbargoNotice()
    expect(container).toBeEmptyDOMElement()
  })

  test('returns null when et is an empty string', async () => {
    mockGet.mockReturnValue('https://example.com/some-page?et=')
    const { container } = await renderEmbargoNotice()
    expect(container).toBeEmptyDOMElement()
  })

  test('returns null when et=now', async () => {
    mockGet.mockReturnValue('https://example.com/some-page?et=now')
    const { container } = await renderEmbargoNotice()
    expect(container).toBeEmptyDOMElement()
  })

  test('returns null and warns when et is not a valid epoch integer', async () => {
    mockGet.mockReturnValue('https://example.com/some-page?et=not-a-number')
    const { container } = await renderEmbargoNotice()
    expect(container).toBeEmptyDOMElement()
    expect(logger.warn).toHaveBeenCalledWith('Invalid embargo time param: et=not-a-number')
  })

  test('returns null and warns when et is an unsafe integer', async () => {
    // Value larger than Number.MAX_SAFE_INTEGER
    const unsafeEt = '99999999999999999999'
    mockGet.mockReturnValue(`https://example.com/some-page?et=${unsafeEt}`)
    const { container } = await renderEmbargoNotice()
    expect(container).toBeEmptyDOMElement()
    expect(logger.warn).toHaveBeenCalledWith(`Invalid embargo time param: et=${unsafeEt}`)
  })

  test('returns null and warns when et produces an invalid date', async () => {
    // Epoch seconds just beyond the valid JS Date range (±8,640,000,000,000 seconds)
    const outOfRangeEt = '8640000000001'
    mockGet.mockReturnValue(`https://example.com/some-page?et=${outOfRangeEt}`)
    const { container } = await renderEmbargoNotice()
    expect(container).toBeEmptyDOMElement()
    expect(logger.warn).toHaveBeenCalledWith(`Invalid embargo time param: et=${outOfRangeEt}`)
  })

  test('renders the embargo notice banner for a negative (pre-epoch) et timestamp', async () => {
    // 1969-12-31T00:00:00Z — one day before Unix epoch
    mockGet.mockReturnValue('https://example.com/some-page?et=-86400')
    await renderEmbargoNotice()
    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByText('Important')).toBeInTheDocument()
    expect(screen.getByText(/Embargo Time:/)).toBeInTheDocument()
  })

  test('renders the embargo notice banner for a valid et timestamp', async () => {
    // 2024-03-15T12:00:00Z in epoch seconds
    mockGet.mockReturnValue('https://example.com/some-page?et=1710504000')
    await renderEmbargoNotice()
    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByText('Important')).toBeInTheDocument()
    expect(screen.getByText(/Embargo Time:/)).toBeInTheDocument()
    expect(screen.getByText(/This is for the purpose of preview before publication\./)).toBeInTheDocument()
    expect(
      screen.getByText(
        /Confidential embargos remain in force and this information is restricted to authorised people\./
      )
    ).toBeInTheDocument()
  })
})
