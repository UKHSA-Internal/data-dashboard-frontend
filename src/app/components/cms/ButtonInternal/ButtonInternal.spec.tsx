import { render, screen } from '@testing-library/react'
import { ComponentProps } from 'react'

import { downloadApiRoutePath } from '@/config/constants'

import { ButtonInternal } from './ButtonInternal'

describe('ButtonInternal - with option to select a format', () => {
  const props: ComponentProps<typeof ButtonInternal> = {
    id: 'mockId',
    label: 'Download',
    endpoint: '/api/bulkdownloads/v1',
    method: 'POST',
    'aria-label': 'Bulk downloads',
    variant: 'BULK_DOWNLOAD',
  }

  test('renders correctly', async () => {
    render(await ButtonInternal(props))
    expect(screen.getByText('Select format')).toBeInTheDocument()
    expect(screen.getByLabelText('CSV')).toBeInTheDocument()
    expect(screen.getByLabelText('JSON')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument()
  })

  test('sets the form action to the correct API route', async () => {
    render(await ButtonInternal(props))
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveAttribute('action', downloadApiRoutePath)
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveAttribute('method', props.method)
  })

  test('has hidden input with correct file_format and endpoint value', async () => {
    render(await ButtonInternal(props))
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveFormValues({
      file_format: 'csv',
      endpoint: 'bulkdownloads/v1',
    })
  })

  test('has a submit button correctly labeled', async () => {
    render(await ButtonInternal(props))
    const button = screen.getByRole('button', { name: 'Download' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('govuk-button govuk-!-margin-bottom-0 flex w-auto items-center gap-2 print:hidden')
  })
})

describe('ButtonInternal - with an unrecognised variant', () => {
  const props: ComponentProps<typeof ButtonInternal> = {
    id: 'mockId',
    label: 'Download',
    endpoint: '/api/bulkdownloads/v1',
    method: 'POST',
    'aria-label': 'Bulk downloads',
    variant: 'not_valid',
  }

  test('has hidden input with correct file_format and endpoint value', async () => {
    const { container } = render(await ButtonInternal(props))
    expect(container).toBeEmptyDOMElement()
  })
})
