import { DashboardPage, PageResponse } from '@/api/requests/cms/getPage'

export const dashboardPageMock: PageResponse<DashboardPage> = {
  id: 1,
  meta: {
    type: 'Dashboard',
    detail_url: '',
    html_url: '',
    slug: '',
    show_in_menus: false,
    seo_title: '',
    search_description: '',
    first_published_at: '2023-03-10T10:57:35.324472Z',
    alias_of: null,
    parent: {
      id: 0,
      meta: {
        type: '',
        detail_url: '',
        html_url: '',
      },
      title: '',
    },
  },
  date_posted: '2023-03-10',
  title: 'Respiratory viruses',
  body: 'Data and insights from the UKHSA on respiratory viruses.',
  related_links: [
    {
      id: 1,
      meta: {
        type: 'topic.TopicPageRelatedLink',
      },
      title:
        'National flu and COVID-19 surveillance reports: 2022 to 2023 season',
      body: '<p>National influenza and COVID-19 report, monitoring COVID-19 activity, seasonal flu and other seasonal respiratory illnesses.</p>',
      url: 'https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2022-to-2023-season',
    },
    {
      id: 2,
      meta: {
        type: 'topic.TopicPageRelatedLink',
      },
      title: 'Respiratory syncytial virus (RSV): guidance, data and analysis',
      body: '<p>These documents provide advice on the symptoms, diagnosis, treatment, management and epidemiology of respiratory syncytial virus.</p>',
      url: 'https://www.gov.uk/government/collections/respiratory-syncytial-virus-rsv-guidance-data-and-analysis',
    },
    {
      id: 3,
      meta: {
        type: 'topic.TopicPageRelatedLink',
      },
      title:
        'National norovirus and rotavirus report, week 1 report: data up to week 51 (25 December 2022)',
      body: '<p>Data reported here provide a summary of norovirus and rotavirus activity (including enteric virus (EV) outbreaks) in England up to reporting week 51 of the 2022/2023 season.</p>',
      url: 'https://www.gov.uk/government/statistics/national-norovirus-and-rotavirus-surveillance-reports-2022-to-2023-season/national-norovirus-and-rotavirus-report-week-1-report-data-up-to-week-51-25-december-2022',
    },
    {
      id: 4,
      meta: {
        type: 'topic.TopicPageRelatedLink',
      },
      title:
        'Hepatitis (liver inflammation) cases in children – latest updates',
      body: '<p>Regular UKHSA updates on the ongoing investigation into higher than usual rates of liver inflammation (hepatitis) in children across the UK.</p>',
      url: 'https://www.gov.uk/government/news/hepatitis-liver-inflammation-cases-in-children-latest-updates',
    },
    {
      id: 5,
      meta: {
        type: 'topic.TopicPageRelatedLink',
      },
      title: 'Human parainfluenza viruses: guidance and data',
      body: '<p>The symptoms, diagnosis, management and epidemiology of human parainfluenza viruses (HPIVs).</p>',
      url: 'https://www.gov.uk/government/collections/human-parainfluenza-viruses-guidance-and-data',
    },
  ],
}
