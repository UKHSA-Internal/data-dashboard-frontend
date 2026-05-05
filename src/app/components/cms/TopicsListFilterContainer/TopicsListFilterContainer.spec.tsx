import React from 'react'

import { type ExpandableFilterItem } from '@/app/components/cms/ExpandableFilterDropdown/ExpandableFilterDropdown'
import { fireEvent, render, screen, waitFor } from '@/config/test-utils'

import { TopicsListFilterContainer } from './TopicsListFilterContainer'

describe('TopicsListFilterController', () => {
  const items: ExpandableFilterItem[] = [
    {
      id: 'infectious-diseases',
      label: 'Infectious diseases',
      children: [
        { id: 'covid-19', label: 'COVID-19' },
        { id: 'flu', label: 'Seasonal flu' },
      ],
    },
  ]

  test('selecting a topic hides other cards', async () => {
    render(
      <div>
        <div data-testid="covid-card" data-topic-filter-id="covid-19" style={{ display: 'none' }} />
        <div data-testid="flu-card" data-topic-filter-id="flu" style={{ display: 'none' }} />
        <TopicsListFilterContainer items={items} />
      </div>
    )

    const covidCard = screen.getByTestId('covid-card')
    const fluCard = screen.getByTestId('flu-card')

    const dropdownButton = screen.getByRole('button', { name: 'Select themes or topics to view' })
    fireEvent.click(dropdownButton)

    const expandButtons = screen.getAllByTitle('Expand')
    fireEvent.click(expandButtons[0])

    fireEvent.click(screen.getByLabelText('COVID-19'))

    await waitFor(() => {
      expect(covidCard.style.display).toBe('')
      expect(fluCard.style.display).toBe('none')
    })
  })

  test('when filtering, hides region headers if none of its topic cards are visible', async () => {
    const twoSectionItems: ExpandableFilterItem[] = [
      {
        id: 'section-a',
        label: 'Section A',
        children: [{ id: 'topic-a1', label: 'Topic A1' }],
      },
      {
        id: 'section-b',
        label: 'Section B',
        children: [{ id: 'topic-b1', label: 'Topic B1' }],
      },
    ]

    render(
      <div>
        <section data-testid="section-a-root" data-topics-list-section-key="section-a">
          <h2>Section A</h2>
          <div data-testid="card-a" data-topic-filter-id="topic-a1" style={{ display: 'none' }} />
        </section>
        <section data-testid="section-b-root" data-topics-list-section-key="section-b">
          <h2>Section B</h2>
          <div data-testid="card-b" data-topic-filter-id="topic-b1" style={{ display: 'none' }} />
        </section>
        <TopicsListFilterContainer items={twoSectionItems} />
      </div>
    )

    const sectionA = screen.getByTestId('section-a-root')
    const sectionB = screen.getByTestId('section-b-root')

    const dropdownButton = screen.getByRole('button', { name: 'Select themes or topics to view' })
    fireEvent.click(dropdownButton)
    fireEvent.click(screen.getAllByTitle('Expand')[0]!)
    fireEvent.click(screen.getByLabelText('Topic A1'))

    await waitFor(() => {
      expect(sectionA.style.display).not.toBe('none')
      expect(sectionB.style.display).toBe('none')
    })
  })
})
