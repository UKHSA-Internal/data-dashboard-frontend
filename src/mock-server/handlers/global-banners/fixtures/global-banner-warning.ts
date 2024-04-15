import { ResponseSchema } from '@/api/requests/global-banners/handlers'

export const globalBannerWarning: ResponseSchema = {
  'active-global-banner': {
    title: 'This is a warning level site wide banner. Puppies are cute',
    body: '<p data-block-key="97ug6">Extremely fluffy puppies</p>',
    banner_type: 'Warning',
  },
}
