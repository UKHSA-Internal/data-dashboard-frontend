import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React, { ComponentProps } from 'react'

import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { downloadFile } from '@/app/utils/download.utils'
import { chartExportApiRoutePath } from '@/config/constants'

import { DownloadForm } from './DownloadForm'

jest.mock('@/app/utils/download.utils')

const props: ComponentProps<typeof DownloadForm> = {
  chart: [
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
        age: '',
        sex: '',
      },
      id: '123',
    },
  ],
  labels: {
    heading: 'Download data',
    hint: 'Select format',
    inputLabelCsv: 'CSV',
    inputLabelJson: 'JSON',
    buttonDownload: 'Download',
    buttonDownloading: 'Downloading',
  },
}

describe('DownloadForm', () => {
  beforeEach(() => {
    mockRouter.push('/topics/mock-topic')
    console.error = jest.fn()
    jest.clearAllMocks()
  })

  test('renders a progressively enhanced form with hidden inputs and submit button', () => {
    render(<DownloadForm {...props} />)

    // Form
    const form = screen.getByRole('form', { name: 'Download' })
    expect(form).toHaveAttribute('method', 'POST')
    expect(form).toHaveAttribute('action', chartExportApiRoutePath)

    expect(screen.getByLabelText('CSV')).toBeChecked()

    // Hidden inputs
    expect(screen.getByTestId('download-form-plots')).toHaveValue(
      JSON.stringify({
        topic: 'COVID-19',
        metric: 'new_cases_daily',
        stratum: '',
        geography_type: '',
        geography: '',
        date_from: null,
        date_to: null,
        age: '',
        sex: '',
      })
    )

    // CTA
    expect(screen.getByRole('button', { name: 'Download' })).toHaveAttribute('type', 'submit')
  })

  test('renders the form with geography parameters when a location is selected', () => {
    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<DownloadForm {...props} />)

    // Form
    const form = screen.getByRole('form', { name: 'Download' })
    expect(form).toHaveAttribute('method', 'POST')
    expect(form).toHaveAttribute('action', chartExportApiRoutePath)

    expect(screen.getByLabelText('CSV')).toBeChecked()

    // Hidden inputs
    expect(screen.getByTestId('download-form-plots')).toHaveValue(
      JSON.stringify({
        topic: 'COVID-19',
        metric: 'new_cases_daily',
        stratum: '',
        geography_type: 'Nation',
        geography: 'England',
        date_from: null,
        date_to: null,
        age: '',
        sex: '',
      })
    )

    // CTA
    expect(screen.getByRole('button', { name: 'Download' })).toHaveAttribute('type', 'submit')
  })

  test('Downloading a csv file for users with JavaScript', async () => {
    global.fetch = () =>
      Promise.resolve({
        text: async () => Promise.resolve('mock-download'),
      } as Response)

    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<DownloadForm {...props} />)

    // Form
    const form = screen.getByRole('form', { name: 'Download' })
    expect(form).toHaveAttribute('method', 'POST')
    expect(form).toHaveAttribute('action', chartExportApiRoutePath)

    expect(screen.getByLabelText('CSV')).toBeChecked()

    // Hidden inputs
    expect(screen.getByTestId('download-form-plots')).toHaveValue(
      JSON.stringify({
        topic: 'COVID-19',
        metric: 'new_cases_daily',
        stratum: '',
        geography_type: 'Nation',
        geography: 'England',
        date_from: null,
        date_to: null,
        age: '',
        sex: '',
      })
    )

    // CTA
    const button = screen.getByRole('button', { name: 'Download' })
    expect(button).toHaveAttribute('type', 'submit')

    await userEvent.click(button)

    await waitFor(() => {
      expect(downloadFile).toHaveBeenNthCalledWith(1, 'ukhsa-chart-download.csv', new Blob(['mock-download']))
    })
  })

  test('Downloading a json file for users with JavaScript', async () => {
    global.fetch = () =>
      Promise.resolve({
        text: async () => Promise.resolve('mock-download'),
      } as Response)

    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<DownloadForm {...props} />)

    // Form
    const form = screen.getByRole('form', { name: 'Download' })
    expect(form).toHaveAttribute('method', 'POST')
    expect(form).toHaveAttribute('action', chartExportApiRoutePath)

    expect(screen.getByLabelText('CSV')).toBeChecked()

    await userEvent.click(screen.getByLabelText('JSON'))

    expect(screen.getByLabelText('CSV')).not.toBeChecked()
    expect(screen.getByLabelText('JSON')).toBeChecked()

    // Hidden inputs
    expect(screen.getByTestId('download-form-plots')).toHaveValue(
      JSON.stringify({
        topic: 'COVID-19',
        metric: 'new_cases_daily',
        stratum: '',
        geography_type: 'Nation',
        geography: 'England',
        date_from: null,
        date_to: null,
        age: '',
        sex: '',
      })
    )

    // CTA
    const button = screen.getByRole('button', { name: 'Download' })
    expect(button).toHaveAttribute('type', 'submit')

    await userEvent.click(button)

    await waitFor(() => {
      expect(downloadFile).toHaveBeenNthCalledWith(1, 'ukhsa-chart-download.json', new Blob(['mock-download']))
    })
  })
})
