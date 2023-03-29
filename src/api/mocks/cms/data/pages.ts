import { PagesResponse } from '@/api/requests/cms/getPages'

export const pagesWithHomeTypeMock: PagesResponse = {
  meta: {
    total_count: 1,
  },
  items: [
    {
      id: 1,
      meta: {
        type: 'home.HomePage',
        detail_url: 'http://localhost/api/v2/pages/1/',
        html_url: 'http://localhost/home-page/',
        slug: 'respiratory-viruses',
        first_published_at: '2023-03-10T10:57:35.324472Z',
      },
      title: 'Respiratory viruses',
    },
  ],
}

export const pagesWithCommonTypeMock: PagesResponse = {
  meta: {
    total_count: 1,
  },
  items: [
    {
      id: 7,
      meta: {
        type: 'common.CommonPage',
        detail_url: 'http://localhost/api/v2/pages/7/',
        html_url: 'http://localhost/home-page/about/',
        slug: 'about',
        first_published_at: '2023-03-10T10:57:35.324472Z',
      },
      title: 'About',
    },
    {
      id: 8,
      meta: {
        type: 'common.CommonPage',
        detail_url: 'http://localhost/api/v2/pages/8/',
        html_url: 'http://localhost/home-page/whats-new/',
        slug: 'whats-new',
        first_published_at: '2023-03-10T10:57:35.324472Z',
      },
      title: "What's new",
    },
    {
      id: 9,
      meta: {
        type: 'common.CommonPage',
        detail_url: 'http://localhost/api/v2/pages/9/',
        html_url: 'http://localhost/home-page/maps/',
        slug: 'maps',
        first_published_at: '2023-03-10T10:57:35.324472Z',
      },
      title: 'Maps',
    },
    {
      id: 10,
      meta: {
        type: 'common.CommonPage',
        detail_url: 'http://localhost/api/v2/pages/10/',
        html_url: 'http://localhost/home-page/how-to-use-this-data/',
        slug: 'how-to-use-this-data',
        first_published_at: '2023-03-10T10:57:35.324472Z',
      },
      title: 'How to use this data',
    },
  ],
}

export const pagesWithTopicTypeMock: PagesResponse = {
  meta: {
    total_count: 2,
  },
  items: [
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
        slug: 'coronavirus',
        first_published_at: '2023-02-10T10:57:35.324472Z',
      },
      title: 'SARS-CoV-2',
    },
  ],
}
