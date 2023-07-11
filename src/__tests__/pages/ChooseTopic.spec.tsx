import { GetStaticPropsContext } from 'next'

import { render } from '@/config/test-utils'
import ChooseTopic, { getStaticProps } from '@/pages/choose-topic'

test('Choose topic', async () => {
  const { props } = (await getStaticProps({ locale: 'en' } as GetStaticPropsContext)) as {
    props: Record<string, never>
  }

  const { getByRole, getByLabelText, getByText } = render(ChooseTopic.getLayout(<ChooseTopic {...props} />))

  expect(getByRole('heading', { name: 'Which topic are you interested in?', level: 1 })).toBeInTheDocument()
  expect(getByText('Choose a topic to display on the dashboard.')).toBeInTheDocument()

  expect(getByLabelText('Coronavirus')).toBeInTheDocument()
  expect(getByLabelText('Coronavirus')).toBeChecked()
  expect(getByLabelText('Influenza')).toBeInTheDocument()
  expect(getByLabelText('Other respiratory viruses')).toBeInTheDocument()

  expect(getByRole('button', { name: 'Continue' })).toBeInTheDocument()
})
