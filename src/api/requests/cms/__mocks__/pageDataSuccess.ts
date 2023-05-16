import fs from 'fs'
import path from 'path'
import { extractAndFetchPageData } from '../extractAndFetchPageData'
import {
  newCasesDailyValues,
  newDeathsDailyValues,
  weeklyHospitalAdmissionsRateValues,
  weeklyPositivityValues,
} from '@/api/mocks/tabular/fixtures'

const getChartFixture = (file: string) =>
  fs.readFileSync(path.resolve(`./src/api/mocks/charts/fixtures/${file}`), {
    encoding: 'utf8',
  })

/**
 * SUCCESSFUL STATE
 * All requests resolves successfully
 */

export const pageDataMockSuccess: Awaited<ReturnType<typeof extractAndFetchPageData>> = {
  trends: {
    'e64cc7ea-4551-47f0-b964-941d59cae1bb-trends': {
      success: true,
      data: {
        metric_name: 'new_cases_7days_change',
        metric_value: -592,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_value: -3,
        direction: 'down',
        colour: 'green',
      },
    },
    'fcfcf83f-f2a6-407c-a1f4-6c5978b472f5-trends': {
      success: true,
      data: {
        metric_name: 'new_deaths_7days_sum',
        metric_value: 21,
        percentage_metric_name: 'new_deaths_7days_change_percentage',
        percentage_metric_value: -5,
        direction: 'down',
        colour: 'green',
      },
    },
    '0a351331-a1ca-4c16-8c6e-5d8a0b38fd3f-trends': {
      success: true,
      data: {
        metric_name: 'new_admissions_7day_avg',
        metric_value: 377,
        percentage_metric_name: 'new_admissions_7days_change_percentage',
        percentage_metric_value: 6,
        direction: 'up',
        colour: 'red',
      },
    },
    '8c42a86e-f675-41d0-a65a-633c20ac98e3-trends': {
      success: true,
      data: {
        metric_name: 'new_cases_7days_change',
        metric_value: -592,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_value: -3,
        direction: 'down',
        colour: 'green',
      },
    },
    '41ce6c59-99fe-486a-8225-341a306cc395-trends': {
      success: true,
      data: {
        metric_name: 'new_deaths_7days_sum',
        metric_value: 21,
        percentage_metric_name: 'new_deaths_7days_change_percentage',
        percentage_metric_value: -5,
        direction: 'down',
        colour: 'green',
      },
    },
    '1eb03393-1b30-46a8-8c19-8b86aa056b34-trends': {
      success: true,
      data: {
        metric_name: 'weekly_hospital_admissions_rate_change',
        metric_value: 5911,
        percentage_metric_name: 'weekly_hospital_admissions_rate_change_percentage',
        percentage_metric_value: 0.3,
        direction: 'down',
        colour: 'green',
      },
    },
    '7b860dc9-26d1-4d95-924a-c23f866a7eae-trends': {
      success: true,
      data: {
        metric_name: 'weekly_hospital_admissions_rate_change',
        metric_value: 5911,
        percentage_metric_name: 'weekly_hospital_admissions_rate_change_percentage',
        percentage_metric_value: 0.3,
        direction: 'down',
        colour: 'green',
      },
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
