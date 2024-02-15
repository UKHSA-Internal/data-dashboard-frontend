import { PagesResponse, WhatsNewPagesResponse } from '@/api/requests/cms/getPages'

import {
  aboutPageMock,
  accessibilityStatementPageMock,
  bulkDownloadsPageMock,
  compliancePageMock,
  cookiesPageMock,
  covid19PageMock,
  dashboardMock,
  howToUseThisDataPageMock,
  influenzaPageMock,
  mapsPageMock,
  metricsChildMocks,
  metricsParentMock,
  otherRespiratoryVirusesPageMock,
  whatsNewChildMocks,
  whatsNewParentMock,
} from './page'
import { accessOurDataChildMocks, accessOurDataParentMock } from './page/access-our-data'

export const pagesWithHomeTypeMock: PagesResponse = {
  meta: {
    total_count: 1,
  },
  items: [
    {
      id: dashboardMock.id,
      meta: {
        type: dashboardMock.meta.type,
        detail_url: dashboardMock.meta.detail_url,
        html_url: dashboardMock.meta.html_url,
        slug: dashboardMock.meta.slug,
        show_in_menus: dashboardMock.meta.show_in_menus,
        first_published_at: dashboardMock.meta.first_published_at,
      },
      title: dashboardMock.title,
    },
  ],
}

export const pagesWithCommonTypeMock: PagesResponse = {
  meta: {
    total_count: 6,
  },
  items: [
    {
      id: aboutPageMock.id,
      meta: {
        type: aboutPageMock.meta.type,
        detail_url: aboutPageMock.meta.detail_url,
        html_url: aboutPageMock.meta.html_url,
        slug: aboutPageMock.meta.slug,
        show_in_menus: aboutPageMock.meta.show_in_menus,
        first_published_at: aboutPageMock.meta.first_published_at,
      },
      title: aboutPageMock.title,
    },
    {
      id: mapsPageMock.id,
      meta: {
        type: mapsPageMock.meta.type,
        detail_url: mapsPageMock.meta.detail_url,
        html_url: mapsPageMock.meta.html_url,
        slug: mapsPageMock.meta.slug,
        show_in_menus: mapsPageMock.meta.show_in_menus,
        first_published_at: mapsPageMock.meta.first_published_at,
      },
      title: mapsPageMock.title,
    },
    {
      id: howToUseThisDataPageMock.id,
      meta: {
        type: howToUseThisDataPageMock.meta.type,
        detail_url: howToUseThisDataPageMock.meta.detail_url,
        html_url: howToUseThisDataPageMock.meta.html_url,
        slug: howToUseThisDataPageMock.meta.slug,
        show_in_menus: howToUseThisDataPageMock.meta.show_in_menus,
        first_published_at: howToUseThisDataPageMock.meta.first_published_at,
      },
      title: howToUseThisDataPageMock.title,
    },
    {
      id: cookiesPageMock.id,
      meta: {
        type: cookiesPageMock.meta.type,
        detail_url: cookiesPageMock.meta.detail_url,
        html_url: cookiesPageMock.meta.html_url,
        slug: cookiesPageMock.meta.slug,
        show_in_menus: cookiesPageMock.meta.show_in_menus,
        first_published_at: cookiesPageMock.meta.first_published_at,
      },
      title: cookiesPageMock.title,
    },
    {
      id: accessibilityStatementPageMock.id,
      meta: {
        type: accessibilityStatementPageMock.meta.type,
        detail_url: accessibilityStatementPageMock.meta.detail_url,
        html_url: accessibilityStatementPageMock.meta.html_url,
        slug: accessibilityStatementPageMock.meta.slug,
        show_in_menus: accessibilityStatementPageMock.meta.show_in_menus,
        first_published_at: accessibilityStatementPageMock.meta.first_published_at,
      },
      title: accessibilityStatementPageMock.title,
    },
    {
      id: compliancePageMock.id,
      meta: {
        type: compliancePageMock.meta.type,
        detail_url: compliancePageMock.meta.detail_url,
        html_url: compliancePageMock.meta.html_url,
        slug: compliancePageMock.meta.slug,
        show_in_menus: compliancePageMock.meta.show_in_menus,
        first_published_at: compliancePageMock.meta.first_published_at,
      },
      title: compliancePageMock.title,
    },
  ],
}

// Pages with composite type mock, map children then append static pages
const accessOurDataChildPages = accessOurDataChildMocks.map(
  ({ id, meta: { type, detail_url, html_url, slug, show_in_menus, first_published_at }, title }) => ({
    id,
    meta: { type, detail_url, html_url, slug, show_in_menus, first_published_at },
    title,
  })
)

accessOurDataChildPages.push(
  {
    id: bulkDownloadsPageMock.id,
    meta: {
      type: bulkDownloadsPageMock.meta.type,
      detail_url: bulkDownloadsPageMock.meta.detail_url,
      html_url: bulkDownloadsPageMock.meta.html_url,
      slug: bulkDownloadsPageMock.meta.slug,
      show_in_menus: bulkDownloadsPageMock.meta.show_in_menus,
      first_published_at: bulkDownloadsPageMock.meta.first_published_at,
    },
    title: bulkDownloadsPageMock.title,
  },
  {
    id: accessOurDataParentMock.id,
    meta: {
      type: accessOurDataParentMock.meta.type,
      detail_url: accessOurDataParentMock.meta.detail_url,
      html_url: accessOurDataParentMock.meta.html_url,
      slug: accessOurDataParentMock.meta.slug,
      show_in_menus: accessOurDataParentMock.meta.show_in_menus,
      first_published_at: accessOurDataParentMock.meta.first_published_at,
    },
    title: accessOurDataParentMock.title,
  }
)

export const pagesWithCompositeTypeMock: PagesResponse = {
  meta: {
    total_count: accessOurDataChildMocks.length + 2,
  },
  items: accessOurDataChildPages,
}

export const pagesWithTopicTypeMock: PagesResponse = {
  meta: {
    total_count: 3,
  },
  items: [
    {
      id: covid19PageMock.id,
      meta: {
        type: covid19PageMock.meta.type,
        detail_url: covid19PageMock.meta.detail_url,
        html_url: covid19PageMock.meta.html_url,
        slug: covid19PageMock.meta.slug,
        show_in_menus: covid19PageMock.meta.show_in_menus,
        first_published_at: covid19PageMock.meta.first_published_at,
      },
      title: covid19PageMock.title,
    },
    {
      id: influenzaPageMock.id,
      meta: {
        type: influenzaPageMock.meta.type,
        detail_url: influenzaPageMock.meta.detail_url,
        html_url: influenzaPageMock.meta.html_url,
        slug: influenzaPageMock.meta.slug,
        show_in_menus: influenzaPageMock.meta.show_in_menus,
        first_published_at: influenzaPageMock.meta.first_published_at,
      },
      title: influenzaPageMock.title,
    },
    {
      id: otherRespiratoryVirusesPageMock.id,
      meta: {
        type: otherRespiratoryVirusesPageMock.meta.type,
        detail_url: otherRespiratoryVirusesPageMock.meta.detail_url,
        html_url: otherRespiratoryVirusesPageMock.meta.html_url,
        slug: otherRespiratoryVirusesPageMock.meta.slug,
        show_in_menus: otherRespiratoryVirusesPageMock.meta.show_in_menus,
        first_published_at: otherRespiratoryVirusesPageMock.meta.first_published_at,
      },
      title: otherRespiratoryVirusesPageMock.title,
    },
  ],
}

export const pagesWithWhatsNewParentTypeMock: PagesResponse = {
  meta: {
    total_count: 1,
  },
  items: [
    {
      id: whatsNewParentMock.id,
      meta: {
        type: whatsNewParentMock.meta.type,
        detail_url: whatsNewParentMock.meta.detail_url,
        html_url: whatsNewParentMock.meta.html_url,
        slug: whatsNewParentMock.meta.slug,
        show_in_menus: whatsNewParentMock.meta.show_in_menus,
        first_published_at: whatsNewParentMock.meta.first_published_at,
      },
      title: whatsNewParentMock.title,
    },
  ],
}

export const pagesWithWhatsNewChildTypeMock: WhatsNewPagesResponse = {
  meta: {
    total_count: whatsNewChildMocks.length,
  },
  items: whatsNewChildMocks.map(
    ({
      id,
      title,
      meta: { type, detail_url, html_url, slug, show_in_menus, first_published_at },
      date_posted,
      additional_details,
      badge,
      body,
      last_published_at,
    }) => ({
      id,
      meta: {
        type,
        detail_url,
        html_url,
        slug,
        show_in_menus,
        first_published_at,
      },
      title,
      date_posted,
      additional_details,
      badge,
      body,
      last_published_at,
    })
  ),
}

export const pagesWithMetricsParentTypeMock: PagesResponse = {
  meta: {
    total_count: 1,
  },
  items: [
    {
      id: metricsParentMock.id,
      meta: {
        type: metricsParentMock.meta.type,
        detail_url: metricsParentMock.meta.detail_url,
        html_url: metricsParentMock.meta.html_url,
        slug: metricsParentMock.meta.slug,
        show_in_menus: metricsParentMock.meta.show_in_menus,
        first_published_at: metricsParentMock.meta.first_published_at,
      },
      title: metricsParentMock.title,
    },
  ],
}

export const pagesWithMetricsChildTypeMock: PagesResponse = {
  meta: {
    total_count: metricsChildMocks.length,
  },
  items: metricsChildMocks.map(
    ({
      id,
      title,
      meta: { type, detail_url, html_url, slug, show_in_menus, first_published_at },
      page_description,
      metric_group,
      topic,
      metric,
      last_published_at,
      date_posted,
      body,
    }) => ({
      id,
      title,
      meta: { type, detail_url, html_url, slug, show_in_menus, first_published_at },
      page_description,
      metric_group,
      topic,
      metric,
      last_published_at,
      date_posted,
      body,
    })
  ),
}

const items = [
  ...pagesWithHomeTypeMock.items,
  ...pagesWithCommonTypeMock.items,
  ...pagesWithCompositeTypeMock.items,
  ...pagesWithTopicTypeMock.items,
  ...pagesWithWhatsNewParentTypeMock.items,
  ...pagesWithWhatsNewChildTypeMock.items,
  ...pagesWithMetricsParentTypeMock.items,
  ...pagesWithMetricsChildTypeMock.items,
]

export const allPagesMock: PagesResponse = {
  meta: {
    total_count: items.length,
  },
  items,
}
