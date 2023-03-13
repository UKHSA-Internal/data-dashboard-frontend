import { render, screen, within } from '@testing-library/react'
import RelatedLinks from './RelatedLinks'

jest.mock('next/router', () => require('next-router-mock'))

const testData = [
  {
    title:
      'National flu and COVID-19 surveillance reports: 2022 to 2023 season',
    description:
      'National influenza and COVID-19 report, monitoring COVID-19 activity, seasonal flu and other seasonal respiratory illnesses.',
    link: 'https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2022-to-2023-season',
  },
  {
    title: 'Respiratory syncytial virus (RSV): guidance, data and analysis',
    description:
      'These documents provide advice on the symptoms, diagnosis, treatment, management and epidemiology of respiratory syncytial virus.',
    link: 'https://www.gov.uk/government/collections/respiratory-syncytial-virus-rsv-guidance-data-and-analysis',
  },
  {
    title:
      'National norovirus and rotavirus report, week 1 report: data up to week 51 (25 December 2022)',
    description:
      'Data reported here provide a summary of norovirus and rotavirus activity (including enteric virus (EV) outbreaks) in England up to reporting week 51 of the 2022/2023 season.',
    link: 'https://www.gov.uk/government/statistics/national-norovirus-and-rotavirus-surveillance-reports-2022-to-2023-season/national-norovirus-and-rotavirus-report-week-1-report-data-up-to-week-51-25-december-2022',
  },
]

test('Displays the Related links header, checks only 3 items in list, and associated content correct', () => {
  render(<RelatedLinks data={testData} />)

  expect(screen.getByText('Related Links')).toBeInTheDocument()

  const listItems = screen.getAllByRole('listitem', {
    name: 'ukhsa-related-link',
  })
  expect(listItems).toHaveLength(3)

  expect(
    within(listItems[0]).getByText(
      'National flu and COVID-19 surveillance reports: 2022 to 2023 season'
    )
  ).toBeInTheDocument()
  expect(
    within(listItems[0]).getByText(
      'National influenza and COVID-19 report, monitoring COVID-19 activity, seasonal flu and other seasonal respiratory illnesses.'
    )
  ).toBeInTheDocument()
  expect(
    within(listItems[0]).getByText(
      'National flu and COVID-19 surveillance reports: 2022 to 2023 season'
    )
  ).toHaveAttribute(
    'href',
    'https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2022-to-2023-season'
  )

  expect(
    within(listItems[1]).getByText(
      'Respiratory syncytial virus (RSV): guidance, data and analysis'
    )
  ).toBeInTheDocument()
  expect(
    within(listItems[1]).getByText(
      'These documents provide advice on the symptoms, diagnosis, treatment, management and epidemiology of respiratory syncytial virus.'
    )
  ).toBeInTheDocument()
  expect(
    within(listItems[1]).getByText(
      'Respiratory syncytial virus (RSV): guidance, data and analysis'
    )
  ).toHaveAttribute(
    'href',
    'https://www.gov.uk/government/collections/respiratory-syncytial-virus-rsv-guidance-data-and-analysis'
  )
})
