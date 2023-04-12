import { getChartsApiPath, requestOptions } from '../helpers'

export type ChartTopic = 'COVID-19' | 'Influenza'
export type ChartCategory = 'Vaccinations' | 'Cases' | 'Deaths' | 'Healthcare' | 'Testing'

export const getChart = async (topic: ChartTopic, category: ChartCategory) => {
  const req = await fetch(`${getChartsApiPath()}/${topic}/${category}`, requestOptions)
  if (!req.ok) throw new Error('Failed to get chart')
  return req.text()
}
