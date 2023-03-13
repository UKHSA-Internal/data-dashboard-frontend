const baseUrl = process.env.NEXT_PUBLIC_API_URL
const cmsPath = process.env.NEXT_PUBLIC_API_PATH_CMS
const chartPath = process.env.NEXT_PUBLIC_API_PATH_CHART

export const getCmsApiPath = () => {
  return `${baseUrl}${cmsPath}`
}

export const getChartsApiPath = () => {
  return `${baseUrl}${chartPath}`
}
