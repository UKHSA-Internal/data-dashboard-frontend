const baseUrl = process.env.API_URL ?? ''
const feedbackApiBaseUrl = process.env.FEEDBACK_API_URL ?? ''

export const getApiBaseUrl = () => `${baseUrl}/api`

export const getFeedbackApiBaseUrl = () => `${feedbackApiBaseUrl}/api`

export const getCmsApiPath = () => {
  return `${getApiBaseUrl()}/pages`
}

export const requestOptions: RequestInit = {
  headers: {
    Authorization: process.env.API_KEY ?? '',
  },
}
