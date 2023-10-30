import { PagesResponse } from '@/api/requests/cms/getPages'

import { aboutPageMock } from './page/about'
import { accessibilityStatementPageMock } from './page/accessibility-statement'
import { compliancePageMock } from './page/complaince'
import { cookiesPageMock } from './page/cookies'
import { covid19PageMock } from './page/covid-19'
import { dashboardMock } from './page/dashboard'
import { howToUseThisDataPageMock } from './page/how-to-use-this-data'
import { influenzaPageMock } from './page/influenza'
import { mapsPageMock } from './page/maps'
import { otherRespiratoryVirusesPageMock } from './page/other-respiratory-viruses'
import { whatsNewChildMocks, whatsNewParentMock, whatsNewV1PageMock } from './page/whats-new'

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
        show_in_menus: aboutPageMock.meta.show_in_menus,
        first_published_at: aboutPageMock.meta.first_published_at,
      },
      title: aboutPageMock.title,
    },
    {
      id: whatsNewV1PageMock.id,
      meta: {
        type: whatsNewV1PageMock.meta.type,
        detail_url: whatsNewV1PageMock.meta.detail_url,
        html_url: whatsNewV1PageMock.meta.html_url,
        slug: whatsNewV1PageMock.meta.slug,
        show_in_menus: whatsNewV1PageMock.meta.show_in_menus,
        first_published_at: whatsNewV1PageMock.meta.first_published_at,
      },
      title: whatsNewV1PageMock.title,
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

export const pagesWithWhatsNewChildTypeMock: PagesResponse = {
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
    })
  ),
}

const items = [
  ...pagesWithHomeTypeMock.items,
  ...pagesWithCommonTypeMock.items,
  ...pagesWithTopicTypeMock.items,
  ...pagesWithWhatsNewParentTypeMock.items,
  ...pagesWithWhatsNewChildTypeMock.items,
]

export const allPagesMock: PagesResponse = {
  meta: {
    total_count: items.length,
  },
  items,
}
