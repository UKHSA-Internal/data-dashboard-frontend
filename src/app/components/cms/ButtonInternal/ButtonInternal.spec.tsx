import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'

import { downloadApiRoutePath } from '@/config/constants'
import { render, screen } from '@/config/test-utils'

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
    render(<ButtonInternal {...props} />)
    expect(screen.getByText('Select format')).toBeInTheDocument()
    expect(screen.getByLabelText('CSV')).toBeInTheDocument()
    expect(screen.getByLabelText('JSON')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument()
  })

  test('sets the form action to the correct API route', async () => {
    render(<ButtonInternal {...props} />)
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveAttribute('action', downloadApiRoutePath)
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveAttribute('method', props.method)
  })

  test('sets the file format for analytics tracking', async () => {
    render(<ButtonInternal {...props} />)
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveAttribute('data-tracking-file-format', 'csv')
  })

  test('has hidden input with correct file_format and endpoint value', async () => {
    render(<ButtonInternal {...props} />)
    expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveFormValues({
      file_format: 'csv',
      endpoint: 'bulkdownloads/v1',
    })
  })

  test('has a submit button correctly labeled', async () => {
    render(<ButtonInternal {...props} />)
    const button = screen.getByRole('button', { name: 'Download' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('govuk-button govuk-!-margin-bottom-0 flex w-auto items-center gap-2 print:hidden')
  })

  describe('Setting a different file format', () => {
    test('Updates the file format for analytics tracking', async () => {
      render(<ButtonInternal {...props} />)
      expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveAttribute('data-tracking-file-format', 'csv')
      await userEvent.click(screen.getByLabelText('JSON'))
      expect(screen.getByRole('form', { name: 'Bulk downloads' })).toHaveAttribute('data-tracking-file-format', 'json')
    })
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
    const { container } = render(<ButtonInternal {...props} />)
    expect(container).toBeEmptyDOMElement()
  })
})
