import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React, { ComponentProps } from 'react'

import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { downloadFile } from '@/app/utils/download.utils'

import { DownloadForm } from './DownloadForm'

jest.mock('@/app/utils/download.utils')

const mockData: ComponentProps<typeof DownloadForm>['chart'] = [
  {
    type: 'plot',
    value: {
      topic: 'COVID-19',
      metric: 'new_cases_daily',
      chart_type: 'line_with_shaded_section',
      date_from: null,
      date_to: null,
      stratum: '',
      geography: '',
      geography_type: '',
    },
    id: '123',
  },
]

describe('DownloadForm', () => {
  beforeEach(() => {
    mockRouter.push('/topics/mock-topic')
    console.error = jest.fn()
  })

  test('renders a progressively enhanced form with hidden inputs and submit button', () => {
    render(<DownloadForm chart={mockData} />)

    // Form
    const form = screen.getByRole('form', { name: 'Download' })
    expect(form).toHaveAttribute('method', 'POST')
    expect(form).toHaveAttribute('action', '/api/download/chart')

    // Hidden inputs
    expect(screen.getByTestId('download-form-format')).toHaveValue('csv')
    expect(screen.getByTestId('download-form-plots')).toHaveValue(
      JSON.stringify({
        topic: 'COVID-19',
        metric: 'new_cases_daily',
        stratum: '',
        geography_type: '',
        geography: '',
        date_from: null,
        date_to: null,
      })
    )

    // CTA
    expect(screen.getByRole('button', { name: 'Download (csv)' })).toHaveAttribute('type', 'submit')
  })

  test('renders the form with geography parameters when a location is selected', () => {
    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<DownloadForm chart={mockData} />)

    // Form
    const form = screen.getByRole('form', { name: 'Download' })
    expect(form).toHaveAttribute('method', 'POST')
    expect(form).toHaveAttribute('action', '/api/download/chart')

    // Hidden inputs
    expect(screen.getByTestId('download-form-format')).toHaveValue('csv')
    expect(screen.getByTestId('download-form-plots')).toHaveValue(
      JSON.stringify({
        topic: 'COVID-19',
        metric: 'new_cases_daily',
        stratum: '',
        geography_type: 'Nation',
        geography: 'England',
        date_from: null,
        date_to: null,
      })
    )

    // CTA
    expect(screen.getByRole('button', { name: 'Download (csv)' })).toHaveAttribute('type', 'submit')
  })

  test('Clicking the submit button for users with JavaScript should immediately download the csv file', async () => {
    global.fetch = () =>
      Promise.resolve({
        text: async () => Promise.resolve('mock-download'),
      } as Response)

    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<DownloadForm chart={mockData} />)

    // Form
    const form = screen.getByRole('form', { name: 'Download' })
    expect(form).toHaveAttribute('method', 'POST')
    expect(form).toHaveAttribute('action', '/api/download/chart')

    // Hidden inputs
    expect(screen.getByTestId('download-form-format')).toHaveValue('csv')
    expect(screen.getByTestId('download-form-plots')).toHaveValue(
      JSON.stringify({
        topic: 'COVID-19',
        metric: 'new_cases_daily',
        stratum: '',
        geography_type: 'Nation',
        geography: 'England',
        date_from: null,
        date_to: null,
      })
    )

    // CTA
    const button = screen.getByRole('button', { name: 'Download (csv)' })
    expect(button).toHaveAttribute('type', 'submit')

    await userEvent.click(button)

    await waitFor(() => {
      expect(downloadFile).toHaveBeenNthCalledWith(1, 'data.csv', new Blob(['mock-download']))
    })
  })
})
