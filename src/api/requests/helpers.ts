export const getApiBaseUrl = () => `${process.env.API_URL ?? ''}/api`

export const getFeedbackApiBaseUrl = () => `${process.env.FEEDBACK_API_URL ?? ''}/api`

export const getAuthApiBaseUrl = () => `${process.env.AUTH_DOMAIN ?? ''}/oauth2`

export const getCmsApiPath = () => {
  return `${getApiBaseUrl()}/pages`
}

export const requestOptions: RequestInit = {
  headers: {
    Authorization: process.env.API_KEY ?? '',
  },
}
