import { render, screen, within } from '@/config/test-utils'
import { ChartTable } from './ChartTable'
import { parseChartTableData } from '../CMS/Blocks/Chart/utils/parseChartTableData'
import { newCasesDailyValues } from '@/api/mocks/tabular/fixtures'

test('Displays a graph in a tabular format', () => {
  const [{ data, columns }] = parseChartTableData(newCasesDailyValues)

  render(<ChartTable caption="Coronavirus positivity" columns={columns} data={data} />)

  const table = screen.getByRole('table', { name: 'Coronavirus positivity' })

  // Table column headers
  const headers = within(table).getAllByRole('columnheader')
  expect(within(headers[0]).getByText('Month'))
  expect(within(headers[1]).getByText('Plot1'))

  // Table rows
  const rows = within(table).getAllByRole('row')
  expect(rows).toHaveLength(7) // 1 header row, 6 body rows

  expect(within(rows[1]).getByText('October'))
  expect(within(rows[1]).getByText('12630'))

  expect(within(rows[2]).getByText('November'))
  expect(within(rows[2]).getByText('9360'))

  expect(within(rows[3]).getByText('December'))
  expect(within(rows[3]).getByText('10886'))

  expect(within(rows[4]).getByText('January'))
  expect(within(rows[4]).getByText('7268'))

  expect(within(rows[5]).getByText('February'))
  expect(within(rows[5]).getByText('11408'))

  expect(within(rows[6]).getByText('March'))
  expect(within(rows[6]).getByText('5234'))
})
