import React from 'react'

import { render, screen } from '@/config/test-utils'

import TableCard, { TableCard as TableCardType } from './TableCard'

describe('TableCard', () => {
  const sampleData: TableCardType[] = [
    {
      id: 1,
      age: '8 weeks',
      vaccinations: ['6-in-1 vaccine', 'Rotavirus vaccine', 'MenB vaccine'],
    },
    {
      id: 2,
      age: '12 weeks',
      vaccinations: ['6-in-1 vaccine (2nd dose)', 'Rotavirus vaccine (2nd dose)'],
    },
  ]

  it('renders the table headers', () => {
    render(<TableCard data={sampleData} />)
    expect(screen.getByText(/Age of measure/i)).toBeInTheDocument()
    expect(screen.getByText(/Vaccination/i)).toBeInTheDocument()
  })

  it('renders each row with correct age and vaccinations', () => {
    render(<TableCard data={sampleData} />)

    // Check age rows
    expect(screen.getByText('8 weeks')).toBeInTheDocument()
    expect(screen.getByText('12 weeks')).toBeInTheDocument()

    // Check vaccinations
    expect(screen.getByText('6-in-1 vaccine')).toBeInTheDocument()
    expect(screen.getByText('Rotavirus vaccine')).toBeInTheDocument()
    expect(screen.getByText('MenB vaccine')).toBeInTheDocument()
    expect(screen.getByText('6-in-1 vaccine (2nd dose)')).toBeInTheDocument()
    expect(screen.getByText('Rotavirus vaccine (2nd dose)')).toBeInTheDocument()
  })

  it('renders the correct number of rows', () => {
    render(<TableCard data={sampleData} />)
    const rows = screen.getAllByRole('row')
    // 1 header row + 2 data rows
    expect(rows.length).toBe(3)
  })

  it('renders bullet points for vaccinations', () => {
    render(<TableCard data={sampleData} />)
    const bullets = screen.getAllByRole('listitem')
    expect(bullets.length).toBe(5) // 3 + 2 vaccinations
  })
})
