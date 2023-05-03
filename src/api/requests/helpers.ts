const baseUrl = process.env.NEXT_PUBLIC_API_URL
const cmsPath = process.env.API_PATH_CMS
const chartPath = process.env.NEXT_PUBLIC_API_PATH_CHART
const statsPath = process.env.API_PATH_STATS
const tabularPath = process.env.API_PATH_TABULAR

export const getApiBaseUrl = () => `${baseUrl}/api`

export const getCmsApiPath = () => {
  return `${baseUrl}${cmsPath}`
}

export const getChartsApiPath = () => {
  return `${baseUrl}${chartPath}`
}

export const getStatsApiPath = () => {
  return `${baseUrl}${statsPath}`
}

export const getTabularApiPath = () => {
  return `${baseUrl}${tabularPath}`
}

export const requestOptions: RequestInit = {
  headers: {
    Authorization: process.env.API_KEY ?? '',
  },
}
