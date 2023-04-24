import { render, screen, within } from '@/config/test-utils'
import { RelatedLinks } from './RelatedLinks'
import type { RelatedLinks as Links } from '@/api/models/cms/Page'

const testData: Links = [
  {
    id: 1,
    meta: {
      type: 'topic.TopicPageRelatedLink',
    },
    title: 'National flu and COVID-19 surveillance reports: 2022 to 2023 season',
    body: '<p>National influenza and COVID-19 report, monitoring COVID-19 activity, seasonal flu and other seasonal respiratory illnesses.</p>',
    url: 'https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2022-to-2023-season',
  },
  {
    id: 2,
    meta: {
      type: 'topic.TopicPageRelatedLink',
    },
    title: 'Respiratory syncytial virus (RSV): guidance, data and analysis',
    body: '<p>These documents provide advice on the symptoms, diagnosis, treatment, management and epidemiology of respiratory syncytial virus.</p>',
    url: 'https://www.gov.uk/government/collections/respiratory-syncytial-virus-rsv-guidance-data-and-analysis',
  },
]

test('Displays the Related links header, checks only 3 items in list, and associated content correct', () => {
  render(<RelatedLinks links={testData} />)

  expect(screen.getByRole('heading', { name: 'Related Links', level: 2 })).toBeInTheDocument()

  const listItems = screen.getAllByRole('listitem')

  expect(listItems).toHaveLength(2)

  expect(
    within(listItems[0]).getByText('National flu and COVID-19 surveillance reports: 2022 to 2023 season')
  ).toBeInTheDocument()
  expect(
    within(listItems[0]).getByText(
      'National influenza and COVID-19 report, monitoring COVID-19 activity, seasonal flu and other seasonal respiratory illnesses.'
    )
  ).toBeInTheDocument()
  expect(
    within(listItems[0]).getByText('National flu and COVID-19 surveillance reports: 2022 to 2023 season')
  ).toHaveAttribute(
    'href',
    'https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2022-to-2023-season'
  )

  expect(
    within(listItems[1]).getByText('Respiratory syncytial virus (RSV): guidance, data and analysis')
  ).toBeInTheDocument()
  expect(
    within(listItems[1]).getByText(
      'These documents provide advice on the symptoms, diagnosis, treatment, management and epidemiology of respiratory syncytial virus.'
    )
  ).toBeInTheDocument()
  expect(
    within(listItems[1]).getByText('Respiratory syncytial virus (RSV): guidance, data and analysis')
  ).toHaveAttribute(
    'href',
    'https://www.gov.uk/government/collections/respiratory-syncytial-virus-rsv-guidance-data-and-analysis'
  )
})
