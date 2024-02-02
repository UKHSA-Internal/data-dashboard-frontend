import { render, within } from '@/config/test-utils'

import { Contents, ContentsLink } from './Contents'

test('Automatically generates a table of contents usings the headings of each item', () => {
  const { getByRole } = render(
    <Contents>
      <ContentsLink href="/access-our-data/overview">Overview</ContentsLink>
      <ContentsLink href="/access-our-data/what-is-an-api">What is an API</ContentsLink>
      <ContentsLink href="/access-our-data/getting-started">Getting started</ContentsLink>
    </Contents>
  )

  const nav = getByRole('navigation')
  const listitems = within(nav).getAllByRole('listitem')

  expect(listitems).toHaveLength(3)
  expect(within(listitems[0]).getByText('Overview')).toHaveAttribute('href', '/access-our-data/overview')
  expect(within(listitems[1]).getByText('What is an API')).toHaveAttribute('href', '/access-our-data/what-is-an-api')
  expect(within(listitems[2]).getByText('Getting started')).toHaveAttribute('href', '/access-our-data/getting-started')
})
