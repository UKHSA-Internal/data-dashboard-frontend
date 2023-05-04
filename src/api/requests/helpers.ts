const baseUrl = process.env.NEXT_PUBLIC_API_URL
const cmsPath = process.env.API_PATH_CMS

export const getApiBaseUrl = () => `${baseUrl}/api`

export const getCmsApiPath = () => {
  return `${baseUrl}${cmsPath}`
}

export const requestOptions: RequestInit = {
  headers: {
    Authorization: process.env.API_KEY ?? '',
  },
}
