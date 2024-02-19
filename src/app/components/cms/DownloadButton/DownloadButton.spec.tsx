import { render, screen } from '@testing-library/react'
import { ComponentProps } from 'react'

import { downloadApiRoutePath } from '@/config/constants'

import { DownloadButton } from './DownloadButton'

const props: ComponentProps<typeof DownloadButton> = {
  id: 'mockId',
  label: 'Download',
  endpoint: '/api/bulkdownloads/v1',
  method: 'POST',
  'aria-label': 'Bulk downloads',
}

describe('DownloadButton', () => {
  test('renders correctly', async () => {
    render(await DownloadButton(props))
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument()
  })

  test('sets the form action to the correct API route', async () => {
    render(await DownloadButton(props))
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveAttribute('action', downloadApiRoutePath)
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveAttribute('method', props.method)
  })

  test('has hidden input with correct file_format and endpoint value', async () => {
    render(await DownloadButton(props))
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveFormValues({
      file_format: 'csv',
      endpoint: 'bulkdownloads/v1',
    })
  })

  test('has a submit button correctly labeled', async () => {
    render(await DownloadButton(props))
    const button = screen.getByRole('button', { name: 'Download' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('govuk-button govuk-!-margin-bottom-0 flex w-auto items-center gap-2 print:hidden')
  })
})
