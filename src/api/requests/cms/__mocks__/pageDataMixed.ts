import fs from 'fs'
import path from 'path'

import {
  newCasesDailyValues,
  newDeathsDailyValues,
  weeklyHospitalAdmissionsRateValues,
  weeklyPositivityValues,
} from '@/api/mocks/tabular/fixtures'

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
    'a57a4ad5-6b52-45a6-acfd-2fe208cb5617-trends': {
      success: false,
      error: expect.any(Object),
    },
    'ea8603ca-7b4d-4ef5-a8b1-f27a565938b5-trends': {
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
    '3849d44d-025a-464e-a171-34b5750ca725-trends': {
      success: false,
      error: expect.any(Object),
    },
    '6c09d01e-82c5-425f-aa07-1bdd22d1eaa8-trends': {
      success: false,
      error: expect.any(Object),
    },
    '7b860dc9-26d1-4d95-924a-c23f866a7eae-trends': {
      success: false,
      error: expect.any(Object),
    },
  },
  headlines: {
    'ae3344f7-5b23-4977-bea9-2e1ccd84eb50-headlines': { success: true, data: { value: 4095083 } },
    'eff08341-7bfa-4a3b-b013-527e7b954ce8-headlines': { success: true, data: { value: 24298 } },
    '0520e9d6-794f-4616-b217-f5ec884a86d8-headlines': { success: true, data: { value: 981596 } },
    'a93d4317-3814-41ab-b6f6-a6f0769770a7-headlines': { success: true, data: { value: 981596 } },
    '95b24a05-a015-42ed-b258-51c7ccaedbcd-headlines': { success: true, data: { value: 24298 } },
    '2f49a215-02e7-4ded-94b1-1a0c2933708b-headlines': { success: true, data: { value: 6288 } },
    '369587e1-5a30-4152-94d6-e6b43b812d76-percentages': { success: true, data: { value: 64.5 } },
    '10c92d4c-bdb1-4bcc-a8a5-d0063dcee095-headlines': { success: true, data: { value: 379 } },
    '2e403485-030c-4122-86be-5827a095f30d-headlines': { success: true, data: { value: 379 } },
    '36746bcd-1dce-4e5e-81f8-60c8b9994540-percentages': { success: true, data: { value: 10.4 } },
    '36ec8822-56e2-4513-ac8f-969e84f0d5e8-percentages': { success: true, data: { value: 12.2 } },
  },
  charts: {
    'd9b86415-9734-46be-952a-56182f0c40be-charts': {
      success: true,
      data: getChartFixture('narrow.svg'),
    },
    'c18703a1-9b01-417f-8fd8-3e4db35865e5-charts': {
      success: true,
      data: getChartFixture('narrow.svg'),
    },
    '60984a8a-9c76-4e86-94bc-b2a2234b6d53-charts': {
      success: true,
      data: getChartFixture('narrow.svg'),
    },
    '809fc976-3332-4e6c-b902-20a5d39a7f99-charts': {
      success: true,
      data: getChartFixture('narrow.svg'),
    },
  },
  tabular: {
    'd9b86415-9734-46be-952a-56182f0c40be-tabular': {
      success: true,
      data: newCasesDailyValues,
    },
    'c18703a1-9b01-417f-8fd8-3e4db35865e5-tabular': {
      success: true,
      data: newDeathsDailyValues,
    },
    '60984a8a-9c76-4e86-94bc-b2a2234b6d53-tabular': {
      success: true,
      data: weeklyHospitalAdmissionsRateValues,
    },
    '809fc976-3332-4e6c-b902-20a5d39a7f99-tabular': {
      success: true,
      data: weeklyPositivityValues,
    },
  },
}
