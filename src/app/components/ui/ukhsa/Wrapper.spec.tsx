import { render, screen } from '@/config/test-utils'
import { ComponentProps } from 'react'
import { Wrapper } from './Wrapper'

const getComponent = (props?: Partial<ComponentProps<typeof Wrapper>>) => (
  <Wrapper {...props} heading="Wrapper heading" lastUpdated="2023-03-21T10:25:34.452098Z">
    <>Content</>
  </Wrapper>
)

test('displays a heading, last updated date and content', async () => {
  render(getComponent())
  expect(screen.getByRole('heading', { name: 'Wrapper heading', level: 1 })).toBeInTheDocument()
  expect(screen.getByText('Last updated on Tuesday, 21 March 2023 at 10:25am')).toBeInTheDocument()
  expect(screen.getByText('Content')).toBeInTheDocument()
})

test('displays an optional description', () => {
  render(getComponent({ description: 'Data and insights on Coronavirus' }))
  expect(screen.getByText('Data and insights on Coronavirus')).toBeInTheDocument()
})
