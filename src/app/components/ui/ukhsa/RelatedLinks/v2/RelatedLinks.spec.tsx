import { ReactElement } from 'react'

import type { RelatedLinks as Links } from '@/api/models/cms/Page'
import { render, screen, within } from '@/config/test-utils'

import { RelatedLink, RelatedLinks } from './RelatedLinks'

const footerTestData: Links = [
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

describe('Related links footer variant', () => {
  test('Displays the Related links header, checks only 2 items in list, and associated content correct', async () => {
    render(
      (await RelatedLinks({
        children: footerTestData.map(({ title, body, url, id }) => (
          <RelatedLink key={id} url={url} title={title}>
            {body}
          </RelatedLink>
        )),
        variant: 'footer',
      })) as ReactElement
    )

    expect(screen.getByRole('heading', { name: 'Related content', level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Learn more about dashboard topics', level: 3 })).toBeInTheDocument()

    const listItems = screen.getAllByRole('listitem')

    expect(listItems).toHaveLength(2)

    expect(
      within(listItems[0]).getByRole('link', {
        name: 'National flu and COVID-19 surveillance reports: 2022 to 2023 season (opens in a new window)',
      })
    ).toBeInTheDocument()
    expect(
      within(listItems[0]).getByRole('link', {
        name: 'National flu and COVID-19 surveillance reports: 2022 to 2023 season (opens in a new window)',
      })
    ).toHaveAttribute(
      'href',
      'https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2022-to-2023-season'
    )
    expect(
      within(listItems[0]).getByText(
        'National influenza and COVID-19 report, monitoring COVID-19 activity, seasonal flu and other seasonal respiratory illnesses.'
      )
    ).toBeInTheDocument()

    expect(
      within(listItems[1]).getByRole('link', {
        name: 'Respiratory syncytial virus (RSV): guidance, data and analysis (opens in a new window)',
      })
    ).toBeInTheDocument()
    expect(
      within(listItems[1]).getByRole('link', {
        name: 'Respiratory syncytial virus (RSV): guidance, data and analysis (opens in a new window)',
      })
    ).toHaveAttribute(
      'href',
      'https://www.gov.uk/government/collections/respiratory-syncytial-virus-rsv-guidance-data-and-analysis'
    )
    expect(
      within(listItems[1]).getByText(
        'These documents provide advice on the symptoms, diagnosis, treatment, management and epidemiology of respiratory syncytial virus.'
      )
    ).toBeInTheDocument()
  })

  test('Displays nothing if no related links are provided', async () => {
    const { container } = render(
      (await RelatedLinks({
        children: [],
        variant: 'footer',
      })) as ReactElement
    )

    expect(container).toBeEmptyDOMElement()
  })
})

const sideBarTestData: Links = [
  {
    id: 1,
    meta: {
      type: 'topic.TopicPageRelatedLink',
    },
    title: 'View swagger documentation',
    url: 'https://api.dev.ukhsa-dashboard.data.gov.uk/',
  },
  {
    id: 2,
    meta: {
      type: 'topic.TopicPageRelatedLink',
    },
    title: 'Contribute to our open source project',
    url: 'github.com',
  },
]

describe('Related links sidebar variant', () => {
  test('displays the related links header, only two items in the list, and correct content', async () => {
    render(
      (await RelatedLinks({
        children: sideBarTestData.map(({ title, body, url, id }) => (
          <RelatedLink key={id} url={url} title={title}>
            {body}
          </RelatedLink>
        )),
        variant: 'sidebar',
      })) as ReactElement
    )

    expect(screen.getByRole('heading', { name: 'Related content', level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Learn more about dashboard topics', level: 3 })).toBeInTheDocument()

    const listItems = screen.getAllByRole('listitem')

    expect(listItems).toHaveLength(2)

    expect(
      within(listItems[0]).getByRole('link', { name: 'View swagger documentation (opens in a new window)' })
    ).toBeInTheDocument()
    expect(
      within(listItems[0]).getByRole('link', { name: 'View swagger documentation (opens in a new window)' })
    ).toHaveAttribute('href', 'https://api.dev.ukhsa-dashboard.data.gov.uk/')

    expect(
      within(listItems[1]).getByRole('link', { name: 'Contribute to our open source project (opens in a new window)' })
    ).toBeInTheDocument()
    expect(
      within(listItems[1]).getByRole('link', { name: 'Contribute to our open source project (opens in a new window)' })
    ).toHaveAttribute('href', 'github.com')
  })
})

test('displays a custom header', async () => {
  render(
    (await RelatedLinks({
      children: sideBarTestData.map(({ title, body, url, id }) => (
        <RelatedLink key={id} url={url} title={title}>
          {body}
        </RelatedLink>
      )),
      heading: 'Custom heading test',
      variant: 'sidebar',
    })) as ReactElement
  )

  expect(screen.getByRole('heading', { name: 'Custom heading test', level: 2 })).toBeInTheDocument()
})
