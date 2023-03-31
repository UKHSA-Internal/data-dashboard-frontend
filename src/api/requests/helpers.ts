const baseUrl = process.env.NEXT_PUBLIC_API_URL
const cmsPath = process.env.API_PATH_CMS
const chartPath = process.env.NEXT_PUBLIC_API_PATH_CHART
const statsPath = process.env.API_PATH_STATS

export const getCmsApiPath = () => {
  return `${baseUrl}${cmsPath}`
}

export const getChartApiPath = () => {
  return `${baseUrl}${chartPath}`
}

export const getStatsApiPath = () => {
  return `${baseUrl}${statsPath}`
}
