import { GetStaticPropsContext } from 'next'

import { render, screen } from '@/config/test-utils'
import ServiceUnavailable, { getStaticProps } from '@/pages/500'

jest.mock('next/router', () => require('next-router-mock'))

test('500 page', async () => {
  const { props } = (await getStaticProps({ locale: 'en' } as GetStaticPropsContext)) as {
    props: Record<string, never>
  }

  render(ServiceUnavailable.getLayout(<ServiceUnavailable {...props} />))

  expect(screen.getByRole('heading', { name: 'Sorry, there is a problem with the service', level: 1 }))
  expect(screen.getByText('Try again later.'))
  expect(screen.getByText('Contact the UK Health Security Agency (UKHSA)'))
  expect(screen.getByText('if you need to speak to someone.'))
})
