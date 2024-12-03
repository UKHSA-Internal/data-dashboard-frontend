import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const archiveDataPageMock: PageResponse<PageType.Composite> = {
  id: 157,
  meta: {
    type: 'composite.CompositePage',
    detail_url: 'http://localhost/api/pages/157/',
    html_url: 'http://localhost/covid-19-archive-data-download/',
    slug: 'covid-19-archive-data-download',
    show_in_menus: false,
    seo_title: 'COVID-19 Archive data download | UKHSA data dashboard',
    search_description: 'Mocked archive data page description',
    first_published_at: '2023-05-12T16:51:07.555450+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.LandingPage',
        detail_url: `http://localhost:3000/api/pages/3/`,
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  seo_change_frequency: 5,
  seo_priority: 0.5,
  last_updated_at: '2024-07-02T12:44:54.461914+01:00',
  title: 'COVID-19 Archive data download',
  body: [
    {
      type: 'text',
      value:
        '<p><strong>You can download all the historic data from the decommissioned Coronavirus (COVID-19) in the UK dashboard on this page by clicking the Download link.</strong></p><p data-block-key="fu3f7">This is useful if you want to analyse the data using your own tools. </p><p data-block-key="7bcc9">The data is available in a zip file format, which has a size of about 638MB so it should be quick to download even on slower internet connections (although you may prefer to download a subset of the data using the links below).</p>',
      id: '15d664a3-d3a5-4883-bce2-783a50b43d65',
    },
    {
      type: 'external_button',
      value: {
        text: 'Download all',
        url: 'https://archive.uat.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/covid-19-archive.zip',
        button_type: 'Primary',
        icon: '',
      },
      id: 'c2016016-6686-4497-a9d0-b9bacabcdaad',
    },
    {
      type: 'text',
      value:
        '<h2 data-block-key="vz2bz">Cases</h2><p data-block-key="6evab">If you want to download a subset of the historic data from the decommissioned Coronavirus (COVID-19) in the UK dashboard, you can download data relating to cases metrics here.</p><p data-block-key="8m7tk">The data is available in a zip file format, which has a size of about 438MB so it should be quick to download even on slower internet connections.</p>',
      id: '7fba06b4-d316-454a-9b81-1229f376c447',
    },
    {
      type: 'external_button',
      value: {
        text: 'Download',
        url: 'https://archive.uat.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/cases.zip',
        button_type: 'Secondary',
        icon: '',
      },
      id: '03f81a34-8f6d-45f9-9fcd-96f5715f9978',
    },
    {
      type: 'text',
      value:
        '<h2 data-block-key="vz2bz">Deaths</h2><p data-block-key="56qqa">If you want to download a subset of the historic data from the decommissioned Coronavirus (COVID-19) in the UK dashboard, you can download data relating to deaths metrics here.</p><p data-block-key="c8fvq">The data is available in a zip file format, which has a size of about 116MB so it should be quick to download even on slower internet connections.</p>',
      id: '71b13a75-235c-49da-8c4f-cd5e7919888c',
    },
    {
      type: 'external_button',
      value: {
        text: 'Download',
        url: 'https://archive.uat.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/deaths.zip',
        button_type: 'Secondary',
        icon: '',
      },
      id: 'eadd1e29-0148-400c-b7f9-62b17c7f69e9',
    },
    {
      type: 'text',
      value:
        '<h2 data-block-key="vz2bz">Healthcare</h2><p data-block-key="s6o9">If you want to download a subset of the historic data from the decommissioned Coronavirus (COVID-19) in the UK dashboard, you can download data relating to healthcare metrics here.</p><p data-block-key="d8di9">The data is available in a zip file format, which has a size of about 20MB so it should be quick to download even on slower internet connections.</p>',
      id: '1a589351-83fb-434a-88c3-33bd2728f0e9',
    },
    {
      type: 'external_button',
      value: {
        text: 'Download',
        url: 'https://archive.uat.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/healthcare.zip',
        button_type: 'Secondary',
        icon: '',
      },
      id: '66305ac0-eef8-4eb3-8f9c-6f39406914af',
    },
    {
      type: 'text',
      value:
        '<h2 data-block-key="vz2bz">Testing</h2><p data-block-key="25dk8">If you want to download a subset of the historic data from the decommissioned Coronavirus (COVID-19) in the UK dashboard, you can download data relating to testing metrics here.</p><p data-block-key="dfljs">The data is available in a zip file format, which has a size of about 54MB so it should be quick to download even on slower internet connections.</p>',
      id: '03ce8718-c4f3-4822-a0cd-2d6199532b32',
    },
    {
      type: 'external_button',
      value: {
        text: 'Download',
        url: 'https://archive.uat.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/testing.zip',
        button_type: 'Secondary',
        icon: '',
      },
      id: '8a317bc3-b770-47df-9b94-e05f2f02292f',
    },
    {
      type: 'text',
      value:
        '<h2 data-block-key="vz2bz">Vaccinations</h2><p data-block-key="fjbf4">If you want to download a subset of the historic data from the decommissioned Coronavirus (COVID-19) in the UK dashboard, you can download data relating to vaccination metrics here.</p><p data-block-key="988uk">The data is available in a zip file format, which has a size of about 18MB so it should be quick to download even on slower internet connections.</p>',
      id: '79131d52-180c-4715-88b0-d71844a74c45',
    },
    {
      type: 'external_button',
      value: {
        text: 'Download',
        url: 'https://archive.uat.ukhsa-dashboard.data.gov.uk/coronavirus-dashboard/vaccinations.zip',
        button_type: 'Secondary',
        icon: '',
      },
      id: '527e50f0-2429-44e7-a0a2-fbcbbf7a5d0a',
    },
  ],
  last_published_at: '2024-03-13T11:08:26.858539Z',
  related_links: [],
  related_links_layout: 'Footer',
}
