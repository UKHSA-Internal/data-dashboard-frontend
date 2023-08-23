import { PagesResponse } from '@/api/requests/cms/getPages'

import { aboutPageMock } from './page/about'
import { cookiePolicyPageMock } from './page/cookie-policy'
import { covid19PageMock } from './page/covid-19'
import { howToUseThisDataPageMock } from './page/how-to-use-this-data'
import { influenzaPageMock } from './page/influenza'
import { mapsPageMock } from './page/maps'
import { otherRespiratoryVirusesPageMock } from './page/other-respiratory-viruses'
import { respiratoryVirusesMock } from './page/respiratory-viruses'
import { whatsNewPageMock } from './page/whats-new'

export const pagesWithHomeTypeMock: PagesResponse = {
  meta: {
    total_count: 1,
  },
  items: [
    {
      id: respiratoryVirusesMock.id,
      meta: {
        type: respiratoryVirusesMock.meta.type,
        detail_url: respiratoryVirusesMock.meta.detail_url,
        html_url: respiratoryVirusesMock.meta.html_url,
        slug: respiratoryVirusesMock.meta.slug,
        show_in_menus: respiratoryVirusesMock.meta.show_in_menus,
        first_published_at: respiratoryVirusesMock.meta.first_published_at,
      },
      title: respiratoryVirusesMock.title,
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
      id: whatsNewPageMock.id,
      meta: {
        type: whatsNewPageMock.meta.type,
        detail_url: whatsNewPageMock.meta.detail_url,
        html_url: whatsNewPageMock.meta.html_url,
        slug: whatsNewPageMock.meta.slug,
        show_in_menus: whatsNewPageMock.meta.show_in_menus,
        first_published_at: whatsNewPageMock.meta.first_published_at,
      },
      title: whatsNewPageMock.title,
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
      id: cookiePolicyPageMock.id,
      meta: {
        type: cookiePolicyPageMock.meta.type,
        detail_url: cookiePolicyPageMock.meta.detail_url,
        html_url: cookiePolicyPageMock.meta.html_url,
        slug: cookiePolicyPageMock.meta.slug,
        show_in_menus: cookiePolicyPageMock.meta.show_in_menus,
        first_published_at: cookiePolicyPageMock.meta.first_published_at,
      },
      title: cookiePolicyPageMock.title,
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

export const allPagesMock: PagesResponse = {
  meta: {
    total_count: 7,
  },
  items: [...pagesWithHomeTypeMock.items, ...pagesWithCommonTypeMock.items, ...pagesWithTopicTypeMock.items],
}
