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
  expect(within(headers[1]).getByText('Amount'))

  // Table rows
  const rows = within(table).getAllByRole('row')
  expect(rows).toHaveLength(7) // 1 header row, 6 body rows

  expect(within(rows[1]).getByText('October 2022'))
  expect(within(rows[1]).getByText('12,630'))

  expect(within(rows[2]).getByText('November 2022'))
  expect(within(rows[2]).getByText('9,360'))

  expect(within(rows[3]).getByText('December 2022'))
  expect(within(rows[3]).getByText('10,886'))

  expect(within(rows[4]).getByText('January 2023'))
  expect(within(rows[4]).getByText('7,268'))

  expect(within(rows[5]).getByText('February 2023'))
  expect(within(rows[5]).getByText('11,408'))

  expect(within(rows[6]).getByText('March 2023'))
  expect(within(rows[6]).getByText('5,234'))
})
