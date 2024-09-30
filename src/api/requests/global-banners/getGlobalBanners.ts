import axios from 'axios'

const baseUrl = process.env.API_URL ?? ''

export const getGlobalBanners = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/global-banners/v1`, {
      method: 'GET',
    })

    console.log('AXIOS: ', data)

    return {
      success: true,
      data,
    }
    // return json
  } catch (error) {
    console.log('error')
  }
}
