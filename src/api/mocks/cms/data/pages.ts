import { PagesResponse } from '@/api/requests/cms/getPages'

export const pagesWithTopicTypeMock: PagesResponse = {
  meta: {
    total_count: 2,
  },
  items: [
    {
      id: 1,
      meta: {
        type: 'Dashboard',
        detail_url: '',
        html_url: '',
        slug: '',
        first_published_at: '2023-03-10T10:57:35.324472Z',
      },
      title: 'Respiratory viruses',
    },
    {
      id: 5,
      meta: {
        type: 'topic.TopicPage',
        detail_url: 'http://localhost/api/v2/pages/5/',
        html_url: 'http://localhost/current-viruses-in-circulation/influenza/',
        slug: 'influenza',
        first_published_at: '2023-03-10T10:57:35.324472Z',
      },
      title: 'Influenza',
    },
    {
      id: 6,
      meta: {
        type: 'topic.TopicPage',
        detail_url: 'http://localhost/api/v2/pages/5/',
        html_url: 'http://localhost/current-viruses-in-circulation/covid-19/',
        slug: 'sars-cov-2',
        first_published_at: '2023-02-10T10:57:35.324472Z',
      },
      title: 'SARS-CoV-2',
    },
  ],
}
