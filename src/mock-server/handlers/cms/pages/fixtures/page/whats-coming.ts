import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const whatsComingPageMock: PageResponse<PageType.Common> = {
  id: 11,
  meta: {
    seo_title: "What's coming | UKHSA data dashboard",
    search_description:
      'A list of all the new features and key pieces of data which will be added to the UKHSA data dashboard',
    type: 'common.CommonPage',
    detail_url: 'http://localhost:3005/api/pages/11/',
    html_url: 'http://localhost:3000/whats-coming/',
    slug: 'whats-coming',
    show_in_menus: true,
    first_published_at: '2023-09-06T17:25:43.801004+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.HomePage',
        detail_url: 'http://localhost:3000/api/pages/3/',
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  title: "What's coming",
  body: '<p data-block-key="z8uie">We regularly update the dashboard with new data and features. Here we&#x27;ll show a timeline of upcoming dashboard changes, outside of the weekly data refresh.</p>',
  last_published_at: '2023-09-06T17:26:15.439075+01:00',
  seo_change_frequency: 5,
  seo_priority: 0.5,
  last_updated_at: '2025-02-13T17:13:44.241609Z',
  related_links_layout: 'Footer',
  related_links: [
    {
      id: 18,
      meta: {
        type: 'common.CommonPageRelatedLink',
      },
      title: 'NHS: COVID-19',
      url: 'https://www.nhs.uk/conditions/covid-19/',
      body: '<p data-block-key="y3631">Get NHS advice on COVID-19, including symptoms, treatments, looking after yourself at home, how to avoid catching and spreading the virus, vaccinations and long-term effects.</p>',
    },
    {
      id: 19,
      meta: {
        type: 'common.CommonPageRelatedLink',
      },
      title: 'NHS: influenza',
      url: 'https://www.nhs.uk/conditions/flu/',
      body: '<p data-block-key="y3631">Get NHS advice on influenza (flu), including symptoms, how to treat it at home and when to seek medical advice.</p>',
    },
    {
      id: 20,
      meta: {
        type: 'common.CommonPageRelatedLink',
      },
      title: 'National flu and COVID-19 surveillance reports: 2023 to 2024 season',
      url: 'https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2023-to-2024-season',
      body: '<p data-block-key="y3631">National influenza and COVID-19 report, monitoring COVID-19 activity, seasonal flu and other seasonal respiratory illnesses.</p>',
    },
    {
      id: 21,
      meta: {
        type: 'common.CommonPageRelatedLink',
      },
      title: 'Sources of surveillance data for influenza, COVID-19 and other respiratory viruses',
      url: 'https://www.gov.uk/government/publications/sources-of-surveillance-data-for-influenza-covid-19-and-other-respiratory-viruses/sources-of-surveillance-data-for-influenza-covid-19-and-other-respiratory-v',
      body: '<p data-block-key="y3631">Read more about the sources of data for surveillance systems used to monitor COVID-19, influenza and other seasonal respiratory viruses in England.</p>',
    },
    {
      id: 22,
      meta: {
        type: 'common.CommonPageRelatedLink',
      },
      title: 'Respiratory syncytial virus (RSV): guidance, data and analysis',
      url: 'https://www.gov.uk/governhttps://www.gov.uk/government/collections/respiratory-syncytial-virus-rsv-guidance-data-and-analysisment/collections/human-parainfluenza-viruses-guidance-and-data',
      body: '<p data-block-key="y3631">Read more on RSV, including advice on symptoms, diagnosis, treatment and management.</p>',
    },
    {
      id: 23,
      meta: {
        type: 'common.CommonPageRelatedLink',
      },
      title: 'Human parainfluenza viruses: guidance and data',
      url: 'https://www.gov.uk/government/collections/human-parainfluenza-viruses-guidance-and-data',
      body: '<p data-block-key="mtnnz">Read more on the symptoms, diagnosis and management of human parainfluenza viruses (HPIVs).</p>',
    },
  ],
}
