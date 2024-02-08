import { render, screen } from '@testing-library/react'

import { bulkExportApiRoutePath, bulkExportFormat } from '@/config/constants'

import { BulkDownload } from './BulkDownload'

describe('BulkDownload', () => {
  test('renders correctly', async () => {
    render(await BulkDownload())
    expect(screen.getByRole('button', { name: 'Download (zip)' })).toBeInTheDocument()
  })

  test('sets the form action to the correct API route', async () => {
    render(await BulkDownload())
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveAttribute('action', bulkExportApiRoutePath)
  })

  test('has hidden input with correct file_format value', async () => {
    render(await BulkDownload())
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveFormValues({
      file_format: bulkExportFormat,
    })
  })

  test('has a submit button correctly labeled', async () => {
    render(await BulkDownload())
    const button = screen.getByRole('button', { name: 'Download (zip)' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('govuk-button govuk-!-margin-bottom-0 flex w-auto items-center gap-2 print:hidden')
  })
})
