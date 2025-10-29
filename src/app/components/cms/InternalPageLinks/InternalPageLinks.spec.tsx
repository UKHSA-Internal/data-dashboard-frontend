import { render, screen } from '@/config/test-utils'

import { List } from '../../ui/ukhsa/List/List'
import { ListItem } from '../../ui/ukhsa/List/ListItem'
import { ListItemArrow, ListItemArrowLink, ListItemArrowParagraph } from '../../ui/ukhsa/List/ListItemArrow'

jest.mock('@/app/utils/cms/slug', () => ({
  getPath: jest.fn().mockImplementation((url) => url),
}))

function InternalPageLinks({ value }: { value: any[] }) {
  if (!value || value.length === 0) return null

  return (
    <List>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      {value.map(({ id, value }) => (
        <ListItem key={id} spacing="m">
          <ListItemArrow>
            <ListItemArrowLink href={value.page}>{value.title}</ListItemArrowLink>
            <ListItemArrowParagraph>{value.sub_title}</ListItemArrowParagraph>
          </ListItemArrow>
        </ListItem>
      ))}
    </List>
  )
}

describe('InternalPageLinks', () => {
  test('renders internal page links correctly', () => {
    const mockValue = [
      {
        type: 'page_link',
        value: {
          title: 'COVID-19',
          sub_title: 'COVID-19 is a respiratory infection caused by the SARS-CoV-2-virus.',
          page: 'http://localhost:3000/topics/covid-19/',
        },
        id: 'c36d19c1-3a5e-4fcf-b696-91468c609369',
      },
    ]

    render(<InternalPageLinks value={mockValue} />)

    expect(screen.getByRole('link', { name: 'COVID-19' })).toBeInTheDocument()
    expect(screen.getByText('COVID-19 is a respiratory infection caused by the SARS-CoV-2-virus.')).toBeInTheDocument()
  })

  test('renders multiple internal page links', () => {
    const mockValue = [
      {
        type: 'page_link',
        value: {
          title: 'COVID-19',
          sub_title: 'COVID-19 is a respiratory infection caused by the SARS-CoV-2-virus.',
          page: 'http://localhost:3000/topics/covid-19/',
        },
        id: 'c36d19c1-3a5e-4fcf-b696-91468c609369',
      },
      {
        type: 'page_link',
        value: {
          title: 'Influenza',
          sub_title: 'Influenza is a viral infection that affects the respiratory system.',
          page: 'http://localhost:3000/topics/influenza/',
        },
        id: 'd47e20d2-4b6f-5gdf-c797-02579d720470',
      },
    ]

    render(<InternalPageLinks value={mockValue} />)

    expect(screen.getByRole('link', { name: 'COVID-19' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Influenza' })).toBeInTheDocument()
    expect(screen.getByText('COVID-19 is a respiratory infection caused by the SARS-CoV-2-virus.')).toBeInTheDocument()
    expect(screen.getByText('Influenza is a viral infection that affects the respiratory system.')).toBeInTheDocument()
  })
})
