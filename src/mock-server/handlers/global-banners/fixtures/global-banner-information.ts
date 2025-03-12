import { ResponseSchema } from '@/api/requests/global-banners/getGlobalBanners'

export const globalBannerInformation: ResponseSchema = {
  active_global_banners: [
    {
      title: 'This is an warning level site wide banner. Puppies are cute',
      body: '<p data-block-key="97ug6">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.</p>',
      banner_type: 'Warning',
    },
    {
      title: 'This is another warning level site wide banner. Puppies are cute',
      body: '<p data-block-key="97ug6">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.</p>',
      banner_type: 'Warning',
    },
    {
      title: 'This is an information level site wide banner. Puppies are cute',
      body: '<p data-block-key="97ug6">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.</p>',
      banner_type: 'Information',
    },
  ],
}
