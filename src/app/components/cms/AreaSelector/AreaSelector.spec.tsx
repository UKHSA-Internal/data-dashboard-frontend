import { render, screen } from '@testing-library/react'
import { ZodError } from 'zod'

import { client } from '@/api/api-utils'
import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { logger } from '@/lib/logger'
import { areaTypeMock } from '@/mock-server/handlers/geographies/v1/types'
import { mockNations } from '@/mock-server/handlers/geographies/v1/types/fixtures'

import { AreaSelector } from './AreaSelector'

jest.mock('@/api/api-utils')

describe('AreaSelector', () => {
  beforeEach(() => {
    mockRouter.push('/topics/mock-topic')
    console.error = jest.fn()
  })

  test('fetches the area types on page load', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: areaTypeMock, status: 200 })

    render(await AreaSelector())

    expect(screen.getByLabelText('Area type')).toHaveValue('')

    for (const areaType of areaTypeMock) {
      expect(screen.getByRole('option', { name: areaType.name })).toBeInTheDocument()
    }
  })

  test('fetches the area types on page load', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: areaTypeMock, status: 200 })
    jest.mocked(client).mockResolvedValueOnce({ data: { geographies: mockNations }, status: 200 })

    render(await AreaSelector({ areaType: 'Nation' }))

    expect(screen.getByLabelText('Area type')).toHaveValue('')

    for (const areaType of areaTypeMock) {
      expect(screen.getByRole('option', { name: areaType.name })).toBeInTheDocument()
    }

    expect(screen.getByLabelText('Area name')).toHaveValue('')

    for (const nation of mockNations) {
      expect(screen.getByRole('option', { name: nation.name })).toBeInTheDocument()
    }
  })

  test('failing to fetch the area types hides the area selector', async () => {
    jest.mocked(client).mockResolvedValue({
      data: null,
      status: 500,
    })

    const { container } = render(await AreaSelector())

    expect(logger.error).toHaveBeenCalledWith(
      'Could not load area selector %s',
      new ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'null',
          path: [],
          message: 'Expected array, received null',
        },
      ])
    )
    expect(container.firstChild).toBeNull()
  })
})
