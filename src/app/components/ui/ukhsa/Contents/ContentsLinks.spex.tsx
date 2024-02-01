import { render, within } from '@/config/test-utils'

import { ContentsLink, ContentsLinks } from './ContentsLinks'

test('Automatically generates a table of contents usings the headings of each item', () => {
  const { getByRole } = render(
    <ContentsLinks>
      <ContentsLink heading="Overview" href="/access-our-data/overview" />
      <ContentsLink heading="What is an API" href="/access-our-data/what-is-an-api" />
      <ContentsLink heading="Getting started" href="/access-our-data/getting-started" />
    </ContentsLinks>
  )

  const nav = getByRole('navigation')
  const listitems = within(nav).getAllByRole('listitem')

  expect(listitems).toHaveLength(3)
  expect(within(listitems[0]).getByText('Overview')).toHaveAttribute('href', '/access-our-data/overview')
  expect(within(listitems[1]).getByText('What is an API')).toHaveAttribute('href', '/access-our-data/what-is-an-api')
  expect(within(listitems[2]).getByText('Getting started')).toHaveAttribute('href', '/access-our-data/getting-started')
})
