import { render, screen } from '@/config/test-utils'

import { Wrapper } from './Wrapper'

/**
 * Jest does not support RSC yet so we must await the component as a function
 */

test('displays a heading, last updated date and content', async () => {
  render(await Wrapper({ heading: 'Wrapper heading', lastUpdated: '2023-03-21T10:25:34.452098Z', children: 'Content' }))

  expect(screen.getByRole('heading', { name: 'Wrapper heading', level: 1 })).toBeInTheDocument()
  expect(screen.getByText('Last updated on Tuesday, 21 March 2023 at 10:25am')).toBeInTheDocument()
  expect(screen.getByText('Content')).toBeInTheDocument()
})

test('displays an optional description', async () => {
  render(
    await Wrapper({
      description: 'Data and insights on Coronavirus',
      heading: 'Wrapper heading',
      lastUpdated: '2023-03-21T10:25:34.452098Z',
      children: 'Content',
    })
  )

  expect(screen.getByText('Data and insights on Coronavirus')).toBeInTheDocument()
})
