import { render, screen } from '@testing-library/react'
import { ComponentProps } from 'react'

import { DownloadButtonExternal } from './DownloadButtonExternal'

describe('DownloadButtonExternal', () => {
  const props: ComponentProps<typeof DownloadButtonExternal> = {
    label: 'Download',
    href: 'http://mockurl/an/external/asset.zip',
    type: 'primary',
    icon: '',
  }

  test('renders a link with an href styled as a primary button', async () => {
    render(await DownloadButtonExternal(props))

    const button = screen.getByRole('link', { name: 'Download (Opens in a new tab)' })
    expect(button).toHaveAttribute('href', props.href)
    expect(button).toHaveClass('govuk-button govuk-button--primary')
  })

  test('renders a link with an href styled as a secondary button', async () => {
    render(await DownloadButtonExternal({ ...props, type: 'secondary' }))

    const button = screen.getByRole('link', { name: 'Download (Opens in a new tab)' })
    expect(button).toHaveAttribute('href', props.href)
    expect(button).toHaveClass('govuk-button govuk-button--secondary')
  })
})
