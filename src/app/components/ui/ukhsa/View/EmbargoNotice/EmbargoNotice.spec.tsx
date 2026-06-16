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
  jest.clearAllMocks()
})

const renderEmbargoNotice = async () => render((await EmbargoNotice()) ?? <></>)

const setXUrlHeader = (url: string | null) => {
  mockGet.mockReturnValue(url)
}

const expectEmbargoNoticeNotRendered = async (url: string | null) => {
  setXUrlHeader(url)
  const { container } = await renderEmbargoNotice()
  expect(container).toBeEmptyDOMElement()
}

const expectEmbargoNoticeNotRenderedWithWarn = async (etValue: string) => {
  await expectEmbargoNoticeNotRendered(`https://example.com/some-page?et=${etValue}`)
  expect(logger.warn).toHaveBeenCalledWith(`Invalid embargo time param: et=${etValue}`)
}

const expectEmbargoNoticeRendered = async (url: string) => {
  setXUrlHeader(url)
  await renderEmbargoNotice()
  expect(screen.getByRole('region')).toBeInTheDocument()
  expect(screen.getByText('Important')).toBeInTheDocument()
  expect(screen.getByText(/Embargo Time:/)).toBeInTheDocument()
}

describe('EmbargoNotice', () => {
  test.each([
    ['there is no x-url header', null],
    ['the x-url has no et param', 'https://example.com/some-page'],
    ['et is an empty string', 'https://example.com/some-page?et='],
    ['et=now', 'https://example.com/some-page?et=now'],
  ])('returns null when %s', async (_reason, url) => {
    await expectEmbargoNoticeNotRendered(url)
  })

  test('returns null and warns when et is not a valid epoch integer', async () => {
    await expectEmbargoNoticeNotRenderedWithWarn('not-a-number')
  })

  test('returns null and warns when et is an unsafe integer', async () => {
    // Value larger than Number.MAX_SAFE_INTEGER
    await expectEmbargoNoticeNotRenderedWithWarn('99999999999999999999')
  })

  test('returns null and warns when et produces an invalid date', async () => {
    // Epoch seconds just beyond the valid JS Date range (±8,640,000,000,000 seconds)
    await expectEmbargoNoticeNotRenderedWithWarn('8640000000001')
  })

  test('renders the embargo notice banner for a negative (pre-epoch) et timestamp', async () => {
    // 1969-12-31T00:00:00Z — one day before Unix epoch
    await expectEmbargoNoticeRendered('https://example.com/some-page?et=-86400')
  })

  test('renders the embargo notice banner for a valid et timestamp', async () => {
    // 2024-03-15T12:00:00Z in epoch seconds
    await expectEmbargoNoticeRendered('https://example.com/some-page?et=1710504000')
    expect(screen.getByText(/This content has not yet been published\./)).toBeInTheDocument()
    expect(screen.getByText(/You are viewing a preview of how the page will look on/)).toBeInTheDocument()
    expect(screen.getByText(/Access is restricted to authorised users only\./)).toBeInTheDocument()
  })
})
