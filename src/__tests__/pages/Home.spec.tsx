import { GetStaticPropsContext } from 'next'

import { render, screen } from '@/config/test-utils'
import Home, { getStaticProps } from '@/pages'

test('Home page', async () => {
  const { props } = (await getStaticProps({ locale: 'en' } as GetStaticPropsContext)) as {
    props: Record<string, never>
  }

  render(<Home {...props} />)

  await screen.findByRole('heading', { name: 'UKHSA data dashboard', level: 1 })
})
