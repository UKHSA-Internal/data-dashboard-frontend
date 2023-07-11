const baseUrl = process.env.API_URL

export const getApiBaseUrl = () => `${baseUrl}/api`

export const getCmsApiPath = () => {
  return `${getApiBaseUrl()}/pages`
}

export const requestOptions: RequestInit = {
  headers: {
    Authorization: process.env.API_KEY ?? '',
  },
}
