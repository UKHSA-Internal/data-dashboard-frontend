import 'whatwg-fetch'
import fs from 'fs'
import path from 'path'
import { server } from '@/api/msw/server'
import { getAllDashboardCharts } from './getAllDashboardCharts'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const getFixture = (file: string) =>
  fs.readFileSync(path.resolve(`./src/api/mocks/charts/fixtures/${file}`), {
    encoding: 'utf8',
  })

test('Fetches the real-world charts when mocks are disabled', async () => {
  const charts = await getAllDashboardCharts()
  expect(charts).toEqual({
    Coronavirus: {
      Cases: getFixture('COVID-19/new_cases_daily.svg'),
      Deaths: getFixture('COVID-19/new_deaths_daily.svg'),
    },
    Influenza: {
      Healthcare: getFixture('Influenza/weekly_hospital_admissions_rate.svg'),
      Testing: getFixture('Influenza/weekly_positivity.svg'),
    },
  })
})
