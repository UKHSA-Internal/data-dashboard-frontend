import { render, screen } from '@testing-library/react'
import { GetStaticPropsContext } from 'next'

import FeedbackConfirmation, { getStaticProps } from './confirmation'

jest.mock('next/router', () => require('next-router-mock'))

test('Shows confirmation panel', async () => {
  const { props } = (await getStaticProps({ locale: 'en' } as GetStaticPropsContext)) as {
    props: Record<string, never>
  }

  render(FeedbackConfirmation.getLayout(<FeedbackConfirmation {...props} />))

  expect(screen.getByText('Form submitted')).toBeInTheDocument()
  expect(screen.getByText('Thank you for your feedback')).toBeInTheDocument()

  expect(screen.getByText('Return to home page')).toHaveAttribute('href', '/')
})
