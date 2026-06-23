import type { Page } from '@playwright/test'

import { flags } from '@/app/constants/flags.constants'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

type Flag = keyof typeof flags
type FlagStatus = 'Enabled' | 'Disabled'
type MenuStatus = 'Inactive' | 'MegaMenu'

export class SwitchboardPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async setFeatureFlag(flag: Flag, status: FlagStatus) {
    await this.page.goto('/switchboard/feature-flags')
    await this.page.click(`input[id="flags.${flag}.${status}"]`)
    await this.page.getByRole('button', { name: 'Save changes' }).click()
    await this.page.reload()
  }

  async setMenus(status: MenuStatus) {
    await this.page.goto('/switchboard/menus')
    await this.page.click(`input[id="menus.scenario.${status}"]`)
    await this.page.getByRole('button', { name: 'Save changes' }).click()
    await this.page.reload()
  }

  async setTopicPageIsPublic(isPublic: boolean) {
    const baseURL = process.env.baseURL || 'http://localhost:3000'
    const domain = (() => {
      try {
        return new URL(baseURL).hostname
      } catch {
        return 'localhost'
      }
    })()

    await this.page.context().addCookies([
      {
        name: UKHSA_SWITCHBOARD_COOKIE_NAME,
        value: JSON.stringify({
          api: {
            alerts: {
              list: { status: 200 },
              detail: { status: 200 },
              scenario: 'RedAmberGreenYellow',
            },
            pages: {
              list: { status: 200 },
              detail: {
                status: 200,
                scenario: {
                  relatedLinksLayout: 'Footer',
                  topicPageIsPublic: isPublic,
                },
              },
            },
            'global-banners': {
              scenario: 'Information',
              status: 200,
            },
            menus: {
              scenario: 'MegaMenu',
              status: 200,
            },
          },
          flags: {
            'example-flag': 'disabled',
          },
        }),
        domain,
        path: '/',
        httpOnly: false,
        secure: baseURL.startsWith('https://'),
        sameSite: 'Lax',
      },
    ])

    // await this.page.goto('/switchboard/pages')
    // await this.page.click(`input[id="pages.detail.scenario.topicPageIsPublic.${isPublic}"]`)
    // await this.page.getByRole('button', { name: 'Save changes' }).click()
    // await this.page.reload()
  }
}
