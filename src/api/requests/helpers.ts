const baseUrl = process.env.API_URL
const cmsPath = process.env.API_PATH_CMS

// Non-CMS endpoints don't have an `/api` prefix at the moment
export const getApiBaseUrl = () => baseUrl

export const getCmsApiPath = () => {
  return `${baseUrl}${cmsPath}`
}

export const requestOptions: RequestInit = {
  headers: {
    Authorization: process.env.API_KEY ?? '',
  },
}
