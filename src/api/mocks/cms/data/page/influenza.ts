import { PageResponse, TopicPage } from '@/api/requests/cms/getPage'
import { relatedLinksMock } from '../elements'

export const influenzaPageMock: PageResponse<TopicPage> = {
  id: 5,
  meta: {
    type: 'topic.TopicPage',
    detail_url: 'http://localhost/api/v2/pages/1/',
    html_url: 'http://localhost/',
    slug: 'influenza',
    show_in_menus: false,
    seo_title: '',
    search_description: '',
    first_published_at: '2023-03-10T10:57:35.324472Z',
    alias_of: null,
    parent: {
      id: 4,
      meta: {
        type: 'topic.TopicIndexPage',
        detail_url: 'http://localhost/api/v2/pages/4/',
        html_url: 'http://localhost/current-viruses-in-circulation/',
      },
      title: 'Viruses',
    },
  },
  title: 'Influenza',
  body: 'Influenza (commonly known) as flu is an infection of the nose, throat and lungs.',
  date_posted: '2023-03-10',
  symptoms: 'Runny nose',
  transmission: 'Airborne',
  treatment: 'Rest',
  prevention: 'Vaccines',
  surveillance_and_reporting: 'Hospitalizations only',
  related_links: relatedLinksMock,
}
