import { getGlobalBanners } from '@/api/requests/global-banners/getGlobalBanners'

/**
 * A custom hook to fetch and manage global banner data asynchronously.
 * It retrieves data about active global banners and returns the banner's title, type, and body.
 * @returns A promise that resolves to an object containing the banner's title, type, and body if successful, otherwise null.
 */

export const useGlobalBanner = async () => {
  const globalBannerRequest = await getGlobalBanners()

  if (!globalBannerRequest.success) return null

  const {
    data: { active_global_banner: globalBanner },
  } = globalBannerRequest

  if (!globalBanner) return null

  const { title: heading, banner_type: variant, body } = globalBanner

  return {
    heading,
    variant,
    body,
  }
}
