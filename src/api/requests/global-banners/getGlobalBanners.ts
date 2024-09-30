const baseUrl = process.env.API_URL ?? ''

export const getGlobalBanners = async () => {
  try {
    const req = await fetch(`${baseUrl}/api/global-banners/v1`, {
      method: 'GET',
    })
    console.log('get global banner')
    const json = await req.json()

    return json
  } catch (error) {
    console.log('error')
  }
}
