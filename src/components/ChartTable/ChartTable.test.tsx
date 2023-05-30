import { render, screen, within } from '@/config/test-utils'
import { ChartTable } from './ChartTable'
import { parseChartTableData } from '../CMS/Blocks/Chart/utils/parseChartTableData'
import { newCasesDailyValues, newDeathsDailyValues } from '@/api/mocks/tabular/fixtures'

test('Displays a single plot chart in a tabular format', () => {
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

  expect(within(rows[1]).getByText('Oct 2022'))
  expect(within(rows[1]).getByText('12,630'))

  expect(within(rows[2]).getByText('Nov 2022'))
  expect(within(rows[2]).getByText('9,360'))

  expect(within(rows[3]).getByText('Dec 2022'))
  expect(within(rows[3]).getByText('10,886'))

  expect(within(rows[4]).getByText('Jan 2023'))
  expect(within(rows[4]).getByText('7,268'))

  expect(within(rows[5]).getByText('Feb 2023'))
  expect(within(rows[5]).getByText('11,408'))

  expect(within(rows[6]).getByText('Mar 2023'))
  expect(within(rows[6]).getByText('5,234'))
})

test('Displays a multi plot chart in a tabular format', () => {
  const [{ data, columns }] = parseChartTableData(newDeathsDailyValues)

  render(<ChartTable caption="Coronavirus positivity" columns={columns} data={data} />)

  const table = screen.getByRole('table', { name: 'Coronavirus positivity' })

  // Table column headers
  const headers = within(table).getAllByRole('columnheader')
  expect(within(headers[0]).getByText('Month'))
  expect(within(headers[1]).getByText('New deaths daily'))
  expect(within(headers[2]).getByText('7 day rolling average'))

  // Table rows
  const rows = within(table).getAllByRole('row')
  expect(rows).toHaveLength(11) // 1 header row, 10 body rows

  expect(within(rows[1]).getByText('May 2022'))
  expect(within(rows[1]).getByText('42'))
  expect(within(rows[1]).getByText('31.1'))

  expect(within(rows[2]).getByText('Jun 2022'))
  expect(within(rows[2]).getByText('53'))
  expect(within(rows[2]).getByText('56.3'))

  expect(within(rows[3]).getByText('Jul 2022'))
  expect(within(rows[3]).getByText('78'))
  expect(within(rows[3]).getByText('86'))

  expect(within(rows[4]).getByText('Aug 2022'))
  expect(within(rows[4]).getByText('56'))
  expect(within(rows[4]).getByText('43.6'))

  expect(within(rows[5]).getByText('Sep 2022'))
  expect(within(rows[5]).getByText('46'))
  expect(within(rows[5]).getByText('55.7'))

  expect(within(rows[6]).getByText('Oct 2022'))
  expect(within(rows[6]).getByText('64'))
  expect(within(rows[6]).getByText('72.3'))

  expect(within(rows[7]).getByText('Nov 2022'))
  expect(within(rows[7]).getByText('35'))
  expect(within(rows[7]).getByText('42.3'))

  expect(within(rows[8]).getByText('Dec 2022'))
  expect(within(rows[8]).getByText('128'))
  expect(within(rows[8]).getByText('109.3'))

  expect(within(rows[9]).getByText('Jan 2023'))
  expect(within(rows[9]).getByText('52'))
  expect(within(rows[9]).getByText('57.1'))
})
