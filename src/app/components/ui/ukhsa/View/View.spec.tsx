import { render } from '@/config/test-utils'

import { View } from './View'

/**
 * Jest does not support RSC yet so we must await the component as a function
 */

test.skip('renders the heading correctly', async () => {
  const heading = 'Test Heading'
  const { getByText } = render(await View({ heading, children: null }))
  const headingElement = getByText(heading)
  expect(headingElement).toBeInTheDocument()
})

// test.skip('renders the lastUpdated text if provided', async () => {
//   const lastUpdated = '2023-03-21T10:25:34.452098Z'
//   const { getByText } = render(await View({ heading: 'Test Heading', children: null, lastUpdated }))
//   const lastUpdatedElement = getByText('Last updated on Tuesday, 21 March 2023 at 10:25am')
//   expect(lastUpdatedElement).toBeInTheDocument()
// })

// test.skip('renders the showWelcome text if provided', async () => {
//   const { getByText } = render(await View({ heading: 'Test Heading', children: null, showWelcome: true }))
//   const welcomeElement = getByText('Welcome')
//   expect(welcomeElement).toBeInTheDocument()
// })

// test.skip('renders the description correctly', async () => {
//   const description = '<p>This is a test description.</p>'
//   const { getByText } = render(await View({ heading: 'Test Heading', children: null, description }))
//   const descriptionElement = getByText('This is a test description.')
//   expect(descriptionElement).toBeInTheDocument()
// })

// test.skip('renders the children correctly', async () => {
//   const children = <div>Test Children</div>
//   const { getByText } = render(await View({ heading: 'Test Heading', children }))
//   const childrenElement = getByText('Test Children')
//   expect(childrenElement).toBeInTheDocument()
// })
