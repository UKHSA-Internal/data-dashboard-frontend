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
})
