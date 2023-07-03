import { GetStaticPropsContext } from 'next'

import { render, screen } from '@/config/test-utils'
import PageNotFound, { getStaticProps } from '@/pages/404'

jest.mock('next/router', () => require('next-router-mock'))

test('404 page', async () => {
  const { props } = (await getStaticProps({ locale: 'en' } as GetStaticPropsContext)) as {
    props: Record<string, never>
  }

  render(PageNotFound.getLayout(<PageNotFound {...props} />))

  expect(screen.getByRole('heading', { name: 'Page not found', level: 1 }))
  expect(screen.getByText('If you typed the web address, check it is correct.'))
  expect(screen.getByText('If you pasted the web address, check you copied the entire address.'))
  expect(screen.getByText('If the web address is correct or you selected a link or button,'))
  expect(screen.getByText('contact the UK Health Security Agency (UKHSA)'))
  expect(screen.getByText('if you need to speak to someone.'))
})
