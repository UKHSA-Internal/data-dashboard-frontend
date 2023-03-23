import { getStatsApiPath } from '../helpers'

/**
 * Response types for the Stats endpoint
 * TODO: Add url to endpoint in docs
 */
export type Statistics = Statistic[]

export interface Statistic {
  topic: string
  text: string
  metric_name: string
  geography_type: string
  geography: string
  stratum: string
  sex: string
  metric_value: string
  main_container: string
  secondary_container: string
}

export const getStats = async (topic: 'coronavirus' | 'influenza'): Promise<Statistics> => {
  const req = await fetch(`${getStatsApiPath()}/${topic}`)
  const res = await req.json()
  return res
}
