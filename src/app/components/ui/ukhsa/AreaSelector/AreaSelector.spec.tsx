import { ZodError } from 'zod'

import { client } from '@/api/utils/api.utils'
import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { render, screen, within } from '@/config/test-utils'
import { logger } from '@/lib/logger'
import { geographyMock } from '@/mock-server/handlers/geographies/v3/[topic]'
import { mockNations } from '@/mock-server/handlers/geographies/v3/fixtures'

import { AreaSelector } from './AreaSelector'

describe('AreaSelector', () => {
  beforeEach(() => {
    mockRouter.push('/topics/covid-19')
    console.error = jest.fn()
  })

  test('fetches the geographies on page load and populates the area type dropdown with a list of area types', async () => {
    jest.mocked(client).mockResolvedValueOnce({ data: geographyMock, status: 200 })

    render(await AreaSelector({ areaType: undefined, selectedTopics: ['COVID-19'] }))

    expect(screen.getByLabelText('Area type')).toHaveValue('')

    for (const geography of geographyMock) {
      expect(
        within(screen.getByLabelText('Area type')).getByRole('option', { name: geography.geography_type })
      ).toBeInTheDocument()
    }
  })

  test('pre-populates the area type from the url search parameters', async () => {
    mockRouter.push('/topics/covid-19?areaType=Nation')
    jest.mocked(client).mockResolvedValueOnce({ data: geographyMock, status: 200 })

    render(await AreaSelector({ areaType: 'Nation', selectedTopics: ['COVID-19'] }))
    expect(screen.getByLabelText('Area type')).toHaveValue('Nation')
  })

  test('pre-populates the area name from the url search parameters', async () => {
    mockRouter.push('/topics/covid-19?areaType=Nation&areaName=England')
    jest.mocked(client).mockResolvedValueOnce({ data: geographyMock, status: 200 })

    render(await AreaSelector({ areaType: 'Nation', selectedTopics: ['COVID-19'] }))
    expect(screen.getByLabelText('Area type')).toHaveValue('Nation')
    expect(screen.getByLabelText('Area name')).toHaveValue('England')
  })

  test('shows a dropdown list of area names when an area type has been set', async () => {
    mockRouter.push('/topics/covid-19?areaType=Nation')

    jest.mocked(client).mockResolvedValueOnce({ data: geographyMock, status: 200 })

    render(await AreaSelector({ areaType: 'Nation', selectedTopics: ['COVID-19'] }))

    expect(screen.getByLabelText('Area type')).toHaveValue('Nation')
    expect(screen.getByLabelText('Area name')).toHaveValue('')

    for (const geography of geographyMock) {
      within(screen.getByLabelText('Area type')).getByRole('option', { name: geography.geography_type })
    }

    expect(screen.getByLabelText('Area name')).toHaveValue('')

    for (const nation of mockNations) {
      expect(within(screen.getByLabelText('Area name')).getByRole('option', { name: nation.name })).toBeInTheDocument()
    }
  })

  test('failing to fetch the area types hides the area selector', async () => {
    jest.mocked(client).mockResolvedValue({
      data: null,
      status: 500,
    })

    const { container } = render(await AreaSelector({ areaType: 'Nation', selectedTopics: ['COVID-19'] }))

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
