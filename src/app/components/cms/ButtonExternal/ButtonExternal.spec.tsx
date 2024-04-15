import { render, screen } from '@testing-library/react'
import { ComponentProps } from 'react'

import { ButtonExternal } from './ButtonExternal'

describe('ButtonExternal', () => {
  const props: ComponentProps<typeof ButtonExternal> = {
    label: 'Download',
    href: 'http://mockurl/an/external/asset.zip',
    type: 'primary',
    icon: '',
  }

  test('renders a link with an href styled as a primary button', async () => {
    render(await ButtonExternal(props))

    const button = screen.getByRole('link', { name: 'Download (Opens in a new tab)' })
    expect(button).toHaveAttribute('href', props.href)
    expect(button).toHaveClass('govuk-button govuk-button--primary')
  })

  test('renders a link with an href styled as a secondary button', async () => {
    render(await ButtonExternal({ ...props, type: 'secondary' }))

    const button = screen.getByRole('link', { name: 'Download (Opens in a new tab)' })
    expect(button).toHaveAttribute('href', props.href)
    expect(button).toHaveClass('govuk-button govuk-button--secondary')
  })
})
