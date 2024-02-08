import { render, within } from '@/config/test-utils'

import { PageSection, PageSectionWithContents } from './PageSectionsWithContents'

const getComponent = () => (
  <PageSectionWithContents>
    <PageSection heading="Covid">covid stuff</PageSection>
    <PageSection heading="Man Flu">flu stuff</PageSection>
    <PageSection heading="Influenza">influenza stuff</PageSection>
  </PageSectionWithContents>
)

test('Automatically generates a table of contents usings the headings of each item', () => {
  const { getByRole } = render(getComponent())

  const nav = getByRole('navigation')
  const listitems = within(nav).getAllByRole('listitem')

  expect(listitems).toHaveLength(3)
  expect(within(listitems[0]).getByText('Covid')).toHaveAttribute('href', '#covid')
  expect(within(listitems[1]).getByText('Man Flu')).toHaveAttribute('href', '#man-flu')
  expect(within(listitems[2]).getByText('Influenza')).toHaveAttribute('href', '#influenza')
})

test('Displays a heading and content for each contents item', () => {
  const { getByRole, getAllByRole } = render(getComponent())

  // Check the headings are correctly associated with the article element
  expect(getByRole('region', { name: 'Covid' }))
  expect(getByRole('region', { name: 'Man Flu' }))
  expect(getByRole('region', { name: 'Influenza' }))

  const sections = getAllByRole('region')

  // Check the order of the sections are correct & the content appears
  expect(sections).toHaveLength(3)
  expect(within(sections[0]).getByText('covid stuff'))
  expect(within(sections[1]).getByText('flu stuff'))
  expect(within(sections[2]).getByText('influenza stuff'))
})
