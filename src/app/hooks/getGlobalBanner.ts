import { getGlobalBanners } from '@/api/requests/global-banners/getGlobalBanners'

/**
 * A custom util to fetch and manage global banner data asynchronously.
 * It retrieves data about active global banners and returns the banner's title, type, and body.
 * @returns A promise that resolves to an object containing the banner's title, type, and body if successful, otherwise null.
 */

export const getGlobalBanner = async () => {
  const globalBannerRequest = await getGlobalBanners()

  if (!globalBannerRequest.success) return null

  const {
    data: { active_global_banners: globalBanners },
  } = globalBannerRequest

  if (!globalBanners || globalBanners.length == 0) return null

  return globalBanners
}
