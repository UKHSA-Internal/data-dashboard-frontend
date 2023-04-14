import { render, screen, within } from '@testing-library/react'
import { Contents, ContentsItem } from './Contents'

const getComponent = () => (
  <Contents>
    <ContentsItem heading="Covid">covid stuff</ContentsItem>
    <ContentsItem heading="Man Flu">flu stuff</ContentsItem>
    <ContentsItem heading="Influenza">influenza stuff</ContentsItem>
  </Contents>
)

test('Automatically generates a table of contents usings the headings of each item', () => {
  render(getComponent())

  const nav = screen.getByRole('navigation')
  const listitems = within(nav).getAllByRole('listitem')

  expect(listitems).toHaveLength(3)
  expect(within(listitems[0]).getByText('Covid')).toHaveAttribute('href', '#covid')
  expect(within(listitems[1]).getByText('Man Flu')).toHaveAttribute('href', '#man-flu')
  expect(within(listitems[2]).getByText('Influenza')).toHaveAttribute('href', '#influenza')
})

test('Displays a heading and content for each contents item', () => {
  render(getComponent())

  // Check the headings are correctly associated with the article element
  expect(screen.getByRole('region', { name: 'Covid' }))
  expect(screen.getByRole('region', { name: 'Man Flu' }))
  expect(screen.getByRole('region', { name: 'Influenza' }))

  const sections = screen.getAllByRole('region')

  // Check the order of the sections are correct & the content appears
  expect(sections).toHaveLength(3)
  expect(within(sections[0]).getByText('covid stuff'))
  expect(within(sections[1]).getByText('flu stuff'))
  expect(within(sections[2]).getByText('influenza stuff'))
})
