const baseUrl = process.env.API_URL

// Non-CMS endpoints don't have an `/api` prefix at the moment
export const getApiBaseUrl = () => baseUrl

export const getCmsApiPath = () => {
  return `${baseUrl}/api/pages`
}

export const requestOptions: RequestInit = {
  headers: {
    Authorization: process.env.API_KEY ?? '',
  },
}
