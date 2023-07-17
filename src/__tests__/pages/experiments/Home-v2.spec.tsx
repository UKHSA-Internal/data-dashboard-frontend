import { GetStaticPropsContext } from 'next'

import { render, screen } from '@/config/test-utils'
import Home, { getStaticProps } from '@/pages/experiments/home-v2'

test('Home page v2 experiment', async () => {
  const { props } = (await getStaticProps({ locale: 'en' } as GetStaticPropsContext)) as {
    props: {
      apiDocsUrl: string
    }
  }

  render(<Home {...props} />)

  expect(screen.getByRole('heading', { name: 'UKHSA data dashboard', level: 1 })).toBeInTheDocument()

  expect(
    screen.getByText(
      'The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses.'
    )
  ).toBeInTheDocument()

  expect(screen.getByText('get an overall summary of a public health threat')).toBeInTheDocument()
  expect(screen.getByText('see trends and patterns in health data')).toBeInTheDocument()
  expect(screen.getByText('find out information on a specific data metric')).toBeInTheDocument()
  expect(screen.getByText('download data using the API.')).toBeInTheDocument()

  expect(screen.getByRole('button', { name: 'Start now' })).toBeInTheDocument()

  expect(screen.getByRole('heading', { name: 'Use the API', level: 2 })).toBeInTheDocument()
  expect(screen.getByText("Search and download data by using the UKHSA data dashboard's API.")).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Go to API' })).toHaveAttribute(
    'href',
    `${props.apiDocsUrl}/api/public/timeseries`
  )

  expect(screen.getByRole('heading', { name: 'About the dashboard', level: 2 })).toBeInTheDocument()
  expect(
    screen.getByText(
      'The UKHSA is committed to informing the public of current health data in an accessible and transparent way. Initially, the UKHSA data dashboard is focused on respiratory viruses, such as coronavirus (COVID-19). In the future, the dashboard will present a wide range of health topics.'
    )
  ).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Find out more about the dashboard' })).toHaveAttribute('href', `/about`)

  expect(screen.getByRole('heading', { name: "What's new", level: 2 })).toBeInTheDocument()
  expect(
    screen.getByText(
      'The UKHSA data dashboard is regularly updated with new data and features. View a timeline of changes.'
    )
  ).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Get updates' })).toHaveAttribute('href', `/whats-new`)
})
