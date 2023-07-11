const baseUrl = process.env.API_URL

// Non-CMS endpoints don't have an `/api` prefix at the moment
export const getApiBaseUrl = () => `${baseUrl}/api`

export const getCmsApiPath = () => {
  return `${getApiBaseUrl()}/pages`
}

export const requestOptions: RequestInit = {
  headers: {
    Authorization: process.env.API_KEY ?? '',
  },
}
