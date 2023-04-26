import fs from 'fs'
import path from 'path'

const getChartFixture = (file: string) =>
  fs.readFileSync(path.resolve(`./src/api/mocks/charts/fixtures/${file}`), {
    encoding: 'utf8',
  })

/**
 * MIXED SUCCESS AND FAILURE STATE
 * Some requests resolved successfully and some failed
 */
export const pageDataMockMixed = [
  ['72a1b90c-5f73-4a67-a6bc-9385b3746ce0-headlines', { success: true, data: { value: 24298 } }],
  [
    '72a1b90c-5f73-4a67-a6bc-9385b3746ce0-trends',
    {
      success: false,
    },
  ],
  ['19639378-5280-4c28-95d8-17390618367c-headlines', { success: true, data: { value: 379 } }],
  [
    '19639378-5280-4c28-95d8-17390618367c-trends',
    {
      success: false,
    },
  ],
  ['c124e3ba-f12d-418b-8db9-066274b92fc2-headlines', { success: true, data: { value: 6288 } }],
  [
    'c124e3ba-f12d-418b-8db9-066274b92fc2-trends',
    {
      success: false,
    },
  ],
  ['36418bc1-35fe-46e2-b38f-ebe9a9582f43-charts', getChartFixture('COVID-19/new_cases_daily.svg')],
  ['5d63adc9-f0b9-4b8b-8380-ee863daa533a-headlines', { success: true, data: { value: 6288 } }],
  [
    '18406a2d-52fb-48a1-a9ee-5420dffb238a-trends',
    {
      success: false,
    },
  ],
  ['b3bebde7-538d-4ba1-a568-c28ac1c33a63-charts', getChartFixture('COVID-19/new_deaths_daily.svg')],
  ['4f28c86d-9f72-44bb-900b-c14c5d6bc396-headlines', { success: true, data: { value: 379 } }],
  [
    '4a44ea30-d778-4ed4-bba0-fb506f5dc1dd-trends',
    {
      success: false,
    },
  ],
  ['cdde1370-9c46-4604-91b4-3dd58932bc2c-headlines', { success: true, data: { value: 981596 } }],
  [
    'cdde1370-9c46-4604-91b4-3dd58932bc2c-trends',
    {
      success: false,
    },
  ],
  ['4c08dee0-6a37-4602-9c54-990efe347e49-charts', getChartFixture('Influenza/weekly_hospital_admissions_rate.svg')],
  ['1c7e2b15-40e6-4630-9eb8-cefa5732cfc7-headlines', { success: true, data: { value: 981596 } }],
  [
    '601053ba-9dd1-4111-8e15-17a7335c6279-trends',
    {
      success: false,
    },
  ],
  ['0b7a6152-dbd3-4b77-82e1-cc98cf273ba4-charts', getChartFixture('Influenza/weekly_positivity_latest.svg')],
]
