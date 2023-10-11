import { render, screen } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import { z } from 'zod'

import { Body } from '@/api/models/cms/Page'

import { renderSection } from './cms.utils'

type PageSection = z.infer<typeof Body>[number]

const mockSection = Mock.of<PageSection>({
  id: 'testId',
  value: {
    heading: 'COVID-19',
    content: [],
  },
})

const mockSectionWithLongHeading = Mock.of<PageSection>({
  id: 'testId',
  value: {
    heading: 'Other respiratory viruses',
    content: [],
  },
})

const mockSectionWithCard = Mock.of<PageSection>({
  id: 'testId',
  value: {
    heading: 'Other respiratory viruses',
    content: [
      {
        id: 'cardTestId',
        type: 'text_card',
        value: {
          body: '<p>This is some cms content</p>',
        },
      },
    ],
  },
})

describe('Displaying a topic section from the cms home page response', () => {
  test('Renders a heading that links to the topic page', () => {
    render(renderSection(mockSection))
    expect(screen.getByRole('heading', { level: 2, name: 'COVID-19' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'COVID-19' })).toHaveAttribute('href', '/topics/covid-19')

    render(renderSection(mockSectionWithLongHeading))
    expect(screen.getByRole('heading', { level: 2, name: 'Other respiratory viruses' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Other respiratory viruses' })).toHaveAttribute(
      'href',
      '/topics/other-respiratory-viruses'
    )
  })

  test('Renders a card', () => {
    render(renderSection(mockSectionWithCard))
    expect(screen.getByText('This is some cms content')).toBeInTheDocument()
  })
})

// TODO - Add unit tests for renderCard and renderBlock functions
