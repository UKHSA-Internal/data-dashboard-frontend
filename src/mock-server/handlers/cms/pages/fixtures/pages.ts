import { PagesResponse, WhatsNewPagesResponse } from '@/api/requests/cms/getPages'

import {
  aboutPageMock,
  accessibilityStatementPageMock,
  archiveDataPageMock,
  bulkDownloadsPageMock,
  compliancePageMock,
  cookiesPageMock,
  covid19PageMock,
  feedbackMock,
  influenzaPageMock,
  landingPageMock,
  metricsChildMocks,
  metricsParentMock,
  otherRespiratoryVirusesPageMock,
  respiratoryVirusesMock,
  whatsComingPageMock,
  whatsNewChildMocks,
  whatsNewParentMock,
} from './page'
import { accessOurDataChildMocks, accessOurDataParentMock } from './page/access-our-data'
import { weatherHealthAlertsChildMocks, weatherHealthAlertsParentMock } from './page/weather-health-alerts'

export const pagesWithLandingTypeMock: PagesResponse = {
  meta: {
    total_count: 1,
  },
  items: [
    {
      id: landingPageMock.id,
      meta: {
        type: landingPageMock.meta.type,
        detail_url: landingPageMock.meta.detail_url,
        html_url: landingPageMock.meta.html_url,
        slug: landingPageMock.meta.slug,
        show_in_menus: landingPageMock.meta.show_in_menus,
        first_published_at: landingPageMock.meta.first_published_at,
        search_description: landingPageMock.meta.search_description,
      },
      seo_change_frequency: landingPageMock.seo_change_frequency,
      seo_priority: landingPageMock.seo_priority,
      title: landingPageMock.title,
    },
  ],
}

export const pagesWithFeedbackTypeMock: PagesResponse = {
  meta: {
    total_count: 1,
  },
  items: [
    {
      id: feedbackMock.id,
      meta: {
        type: feedbackMock.meta.type,
        detail_url: feedbackMock.meta.detail_url,
        html_url: feedbackMock.meta.html_url,
        slug: feedbackMock.meta.slug,
        show_in_menus: feedbackMock.meta.show_in_menus,
        first_published_at: feedbackMock.meta.first_published_at,
        search_description: feedbackMock.meta.search_description,
      },
      seo_change_frequency: feedbackMock.seo_change_frequency,
      seo_priority: feedbackMock.seo_priority,
      title: feedbackMock.title,
    },
  ],
}

export const pagesWithCommonTypeMock: PagesResponse = {
  meta: {
    total_count: 4,
  },
  items: [
    {
      id: aboutPageMock.id,
      meta: {
        type: aboutPageMock.meta.type,
        detail_url: aboutPageMock.meta.detail_url,
        html_url: aboutPageMock.meta.html_url,
        slug: aboutPageMock.meta.slug,
        search_description: aboutPageMock.meta.search_description,
        show_in_menus: aboutPageMock.meta.show_in_menus,
        first_published_at: aboutPageMock.meta.first_published_at,
      },
      seo_change_frequency: aboutPageMock.seo_change_frequency,
      seo_priority: aboutPageMock.seo_priority,
      title: aboutPageMock.title,
    },
    {
      id: whatsComingPageMock.id,
      meta: {
        type: whatsComingPageMock.meta.type,
        detail_url: whatsComingPageMock.meta.detail_url,
        html_url: whatsComingPageMock.meta.html_url,
        slug: whatsComingPageMock.meta.slug,
        search_description: whatsComingPageMock.meta.search_description,
        show_in_menus: whatsComingPageMock.meta.show_in_menus,
        first_published_at: whatsComingPageMock.meta.first_published_at,
      },
      seo_change_frequency: whatsComingPageMock.seo_change_frequency,
      seo_priority: whatsComingPageMock.seo_priority,
      title: whatsComingPageMock.title,
    },
    {
      id: cookiesPageMock.id,
      meta: {
        type: cookiesPageMock.meta.type,
        detail_url: cookiesPageMock.meta.detail_url,
        html_url: cookiesPageMock.meta.html_url,
        slug: cookiesPageMock.meta.slug,
        search_description: cookiesPageMock.meta.search_description,
        show_in_menus: cookiesPageMock.meta.show_in_menus,
        first_published_at: cookiesPageMock.meta.first_published_at,
      },
      seo_change_frequency: cookiesPageMock.seo_change_frequency,
      seo_priority: cookiesPageMock.seo_priority,
      title: cookiesPageMock.title,
    },
    {
      id: accessibilityStatementPageMock.id,
      meta: {
        type: accessibilityStatementPageMock.meta.type,
        detail_url: accessibilityStatementPageMock.meta.detail_url,
        html_url: accessibilityStatementPageMock.meta.html_url,
        slug: accessibilityStatementPageMock.meta.slug,
        search_description: accessibilityStatementPageMock.meta.search_description,
        show_in_menus: accessibilityStatementPageMock.meta.show_in_menus,
        first_published_at: accessibilityStatementPageMock.meta.first_published_at,
      },
      seo_change_frequency: accessibilityStatementPageMock.seo_change_frequency,
      seo_priority: accessibilityStatementPageMock.seo_priority,
      title: accessibilityStatementPageMock.title,
    },
    {
      id: compliancePageMock.id,
      meta: {
        type: compliancePageMock.meta.type,
        detail_url: compliancePageMock.meta.detail_url,
        html_url: compliancePageMock.meta.html_url,
        slug: compliancePageMock.meta.slug,
        search_description: compliancePageMock.meta.search_description,
        show_in_menus: compliancePageMock.meta.show_in_menus,
        first_published_at: compliancePageMock.meta.first_published_at,
      },
      seo_change_frequency: compliancePageMock.seo_change_frequency,
      seo_priority: compliancePageMock.seo_priority,
      title: compliancePageMock.title,
    },
  ],
}

export const pagesWithCompositeTypeMock: PagesResponse = {
  meta: {
    total_count: 4 + accessOurDataChildMocks.length,
  },
  items: [
    {
      id: archiveDataPageMock.id,
      meta: {
        type: archiveDataPageMock.meta.type,
        detail_url: archiveDataPageMock.meta.detail_url,
        html_url: archiveDataPageMock.meta.html_url,
        slug: archiveDataPageMock.meta.slug,
        search_description: archiveDataPageMock.meta.search_description,
        show_in_menus: archiveDataPageMock.meta.show_in_menus,
        first_published_at: archiveDataPageMock.meta.first_published_at,
      },
      seo_change_frequency: archiveDataPageMock.seo_change_frequency,
      seo_priority: archiveDataPageMock.seo_priority,
      title: archiveDataPageMock.title,
    },
    {
      id: bulkDownloadsPageMock.id,
      meta: {
        type: bulkDownloadsPageMock.meta.type,
        detail_url: bulkDownloadsPageMock.meta.detail_url,
        html_url: bulkDownloadsPageMock.meta.html_url,
        slug: bulkDownloadsPageMock.meta.slug,
        search_description: bulkDownloadsPageMock.meta.search_description,
        show_in_menus: bulkDownloadsPageMock.meta.show_in_menus,
        first_published_at: bulkDownloadsPageMock.meta.first_published_at,
      },
      seo_change_frequency: bulkDownloadsPageMock.seo_change_frequency,
      seo_priority: bulkDownloadsPageMock.seo_priority,
      title: bulkDownloadsPageMock.title,
    },
    {
      id: accessOurDataParentMock.id,
      meta: {
        type: accessOurDataParentMock.meta.type,
        detail_url: accessOurDataParentMock.meta.detail_url,
        html_url: accessOurDataParentMock.meta.html_url,
        slug: accessOurDataParentMock.meta.slug,
        search_description: accessOurDataParentMock.meta.search_description,
        show_in_menus: accessOurDataParentMock.meta.show_in_menus,
        first_published_at: accessOurDataParentMock.meta.first_published_at,
      },
      seo_change_frequency: accessOurDataParentMock.seo_change_frequency,
      seo_priority: accessOurDataParentMock.seo_priority,
      title: accessOurDataParentMock.title,
    },
    {
      id: respiratoryVirusesMock.id,
      meta: {
        type: respiratoryVirusesMock.meta.type,
        detail_url: respiratoryVirusesMock.meta.detail_url,
        html_url: respiratoryVirusesMock.meta.html_url,
        slug: respiratoryVirusesMock.meta.slug,
        search_description: respiratoryVirusesMock.meta.search_description,
        show_in_menus: respiratoryVirusesMock.meta.show_in_menus,
        first_published_at: respiratoryVirusesMock.meta.first_published_at,
      },
      seo_change_frequency: respiratoryVirusesMock.seo_change_frequency,
      seo_priority: respiratoryVirusesMock.seo_priority,
      title: respiratoryVirusesMock.title,
    },
    ...accessOurDataChildMocks.map(
      ({
        id,
        meta: { type, detail_url, html_url, slug, search_description, show_in_menus, first_published_at },
        seo_change_frequency,
        seo_priority,
        title,
      }) => ({
        id,
        meta: {
          type,
          detail_url,
          html_url,
          slug,
          search_description,
          show_in_menus,
          first_published_at,
        },
        seo_change_frequency,
        seo_priority,
        title,
      })
    ),
    {
      id: weatherHealthAlertsParentMock.id,
      meta: {
        type: weatherHealthAlertsParentMock.meta.type,
        detail_url: weatherHealthAlertsParentMock.meta.detail_url,
        html_url: weatherHealthAlertsParentMock.meta.html_url,
        slug: weatherHealthAlertsParentMock.meta.slug,
        search_description: weatherHealthAlertsParentMock.meta.search_description,
        show_in_menus: weatherHealthAlertsParentMock.meta.show_in_menus,
        first_published_at: weatherHealthAlertsParentMock.meta.first_published_at,
      },
      seo_change_frequency: weatherHealthAlertsParentMock.seo_change_frequency,
      seo_priority: weatherHealthAlertsParentMock.seo_priority,
      title: weatherHealthAlertsParentMock.title,
    },
    ...weatherHealthAlertsChildMocks.map(
      ({
        id,
        meta: { type, detail_url, html_url, slug, search_description, show_in_menus, first_published_at },
        seo_change_frequency,
        seo_priority,
        title,
      }) => ({
        id,
        meta: {
          type,
          detail_url,
          html_url,
          slug,
          search_description,
          show_in_menus,
          first_published_at,
        },
        seo_change_frequency,
        seo_priority,
        title,
      })
    ),
  ],
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
        search_description: covid19PageMock.meta.search_description,
        show_in_menus: covid19PageMock.meta.show_in_menus,
        first_published_at: covid19PageMock.meta.first_published_at,
      },
      seo_change_frequency: covid19PageMock.seo_change_frequency,
      seo_priority: covid19PageMock.seo_priority,
      title: covid19PageMock.title,
    },
    {
      id: influenzaPageMock.id,
      meta: {
        type: influenzaPageMock.meta.type,
        detail_url: influenzaPageMock.meta.detail_url,
        html_url: influenzaPageMock.meta.html_url,
        slug: influenzaPageMock.meta.slug,
        search_description: influenzaPageMock.meta.search_description,
        show_in_menus: influenzaPageMock.meta.show_in_menus,
        first_published_at: influenzaPageMock.meta.first_published_at,
      },
      seo_change_frequency: influenzaPageMock.seo_change_frequency,
      seo_priority: influenzaPageMock.seo_priority,
      title: influenzaPageMock.title,
    },
    {
      id: otherRespiratoryVirusesPageMock.id,
      meta: {
        type: otherRespiratoryVirusesPageMock.meta.type,
        detail_url: otherRespiratoryVirusesPageMock.meta.detail_url,
        html_url: otherRespiratoryVirusesPageMock.meta.html_url,
        slug: otherRespiratoryVirusesPageMock.meta.slug,
        search_description: otherRespiratoryVirusesPageMock.meta.search_description,
        show_in_menus: otherRespiratoryVirusesPageMock.meta.show_in_menus,
        first_published_at: otherRespiratoryVirusesPageMock.meta.first_published_at,
      },
      seo_change_frequency: otherRespiratoryVirusesPageMock.seo_change_frequency,
      seo_priority: otherRespiratoryVirusesPageMock.seo_priority,
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
        search_description: whatsNewParentMock.meta.search_description,
        show_in_menus: whatsNewParentMock.meta.show_in_menus,
        first_published_at: whatsNewParentMock.meta.first_published_at,
      },
      seo_change_frequency: whatsNewParentMock.seo_change_frequency,
      seo_priority: whatsNewParentMock.seo_priority,
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
      seo_priority,
      seo_change_frequency,
      meta: { type, detail_url, html_url, slug, search_description, show_in_menus, first_published_at },
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
        search_description,
        show_in_menus,
        first_published_at,
      },
      seo_priority,
      seo_change_frequency,
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
        search_description: metricsParentMock.meta.search_description,
        show_in_menus: metricsParentMock.meta.show_in_menus,
        first_published_at: metricsParentMock.meta.first_published_at,
      },
      seo_change_frequency: metricsParentMock.seo_change_frequency,
      seo_priority: metricsParentMock.seo_priority,
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
      seo_change_frequency,
      seo_priority,
      meta: { type, detail_url, html_url, slug, search_description, show_in_menus, first_published_at },
      page_description,
      metric_group,
      topic,
      metric,
      last_published_at,
      body,
    }) => ({
      id,
      title,
      seo_change_frequency,
      seo_priority,
      meta: { type, detail_url, html_url, slug, search_description, show_in_menus, first_published_at },
      page_description,
      metric_group,
      topic,
      metric,
      last_published_at,
      body,
    })
  ),
}

const items = [
  ...pagesWithLandingTypeMock.items,
  ...pagesWithCommonTypeMock.items,
  ...pagesWithCompositeTypeMock.items,
  ...pagesWithTopicTypeMock.items,
  ...pagesWithWhatsNewParentTypeMock.items,
  ...pagesWithWhatsNewChildTypeMock.items,
  ...pagesWithMetricsParentTypeMock.items,
  ...pagesWithMetricsChildTypeMock.items,
  ...pagesWithFeedbackTypeMock.items,
]

export const allPagesMock: PagesResponse = {
  meta: {
    total_count: items.length,
  },
  items,
}
