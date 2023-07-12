import { GetStaticPropsContext } from 'next'

import { render, screen } from '@/config/test-utils'
import FeedbackConfirmation, { getStaticProps } from '@/pages/feedback/confirmation'

jest.mock('next/router', () => require('next-router-mock'))

test('Shows confirmation panel', async () => {
  const { props } = (await getStaticProps({ locale: 'en' } as GetStaticPropsContext)) as {
    props: Record<string, never>
  }

  render(FeedbackConfirmation.getLayout(<FeedbackConfirmation {...props} />))

  expect(screen.getByRole('heading', { name: 'Form submitted', level: 1 })).toBeInTheDocument()
  expect(screen.getByText('Thank you for your feedback')).toBeInTheDocument()

  expect(screen.getByText('Return to home page')).toHaveAttribute('href', '/')
})
