import fs from 'fs'
import path from 'path'
import { extractAndFetchPageData } from '../extractAndFetchPageData'

const getChartFixture = (file: string) =>
  fs.readFileSync(path.resolve(`./src/api/mocks/charts/fixtures/${file}`), {
    encoding: 'utf8',
  })

/**
 * MIXED SUCCESS AND FAILURE STATE
 * Some requests resolved successfully and some failed
 */
export const pageDataMockMixed: Awaited<ReturnType<typeof extractAndFetchPageData>> = {
  trends: {
    'e64cc7ea-4551-47f0-b964-941d59cae1bb-trends': {
      success: false,
      error: expect.any(Object),
    },
    'fcfcf83f-f2a6-407c-a1f4-6c5978b472f5-trends': {
      success: false,
      error: expect.any(Object),
    },
    '0a351331-a1ca-4c16-8c6e-5d8a0b38fd3f-trends': {
      success: false,
      error: expect.any(Object),
    },
    '8c42a86e-f675-41d0-a65a-633c20ac98e3-trends': {
      success: false,
      error: expect.any(Object),
    },
    '41ce6c59-99fe-486a-8225-341a306cc395-trends': {
      success: false,
      error: expect.any(Object),
    },
    '1eb03393-1b30-46a8-8c19-8b86aa056b34-trends': {
      success: false,
      error: expect.any(Object),
    },
    '7b860dc9-26d1-4d95-924a-c23f866a7eae-trends': {
      success: false,
      error: expect.any(Object),
    },
  },
  headlines: {
    'e64cc7ea-4551-47f0-b964-941d59cae1bb-headlines': { success: true, data: { value: 24298 } },
    'fcfcf83f-f2a6-407c-a1f4-6c5978b472f5-headlines': { success: true, data: { value: 379 } },
    '0a351331-a1ca-4c16-8c6e-5d8a0b38fd3f-headlines': { success: true, data: { value: 6288 } },
    'bb8a9a19-ff0e-4e99-b570-b058e9cdb5a1-headlines-top': { success: true, data: { value: 4095083 } },
    'bb8a9a19-ff0e-4e99-b570-b058e9cdb5a1-headlines-bottom': { success: true, data: { value: 64.5 } },
    '4e9d5ead-5394-42cb-b370-e0d0f028140d-headlines': { success: true, data: { value: 10.4 } },
    '95b24a05-a015-42ed-b258-51c7ccaedbcd-headlines': { success: true, data: { value: 24298 } },
    '10c92d4c-bdb1-4bcc-a8a5-d0063dcee095-headlines': { success: true, data: { value: 379 } },
    '1eb03393-1b30-46a8-8c19-8b86aa056b34-headlines': { success: true, data: { value: 981596 } },
    '8d79205b-df67-4dc1-91ae-8198dfb2155f-headlines': { success: true, data: { value: 12.2 } },
    'a93d4317-3814-41ab-b6f6-a6f0769770a7-headlines': { success: true, data: { value: 981596 } },
  },
  charts: {
    'd9b86415-9734-46be-952a-56182f0c40be-charts': {
      success: true,
      data: getChartFixture('COVID-19/new_cases_daily.svg'),
    },
    'c18703a1-9b01-417f-8fd8-3e4db35865e5-charts': {
      success: true,
      data: getChartFixture('COVID-19/new_deaths_daily.svg'),
    },
    '60984a8a-9c76-4e86-94bc-b2a2234b6d53-charts': {
      success: true,
      data: getChartFixture('Influenza/weekly_hospital_admissions_rate.svg'),
    },
    '809fc976-3332-4e6c-b902-20a5d39a7f99-charts': {
      success: true,
      data: getChartFixture('Influenza/weekly_positivity_latest.svg'),
    },
  },
}
