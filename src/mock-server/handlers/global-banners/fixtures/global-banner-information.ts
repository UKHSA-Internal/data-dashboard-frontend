import { ResponseSchema } from '@/api/requests/global-banners/handlers'

export const globalBannerInformation: ResponseSchema = {
  'active-global-banner': {
    title: 'This is an information level site wide banner. Puppies are cute',
    body: '<p data-block-key="97ug6">Fluffy puppies</p>',
    banner_type: 'Information',
  },
}
