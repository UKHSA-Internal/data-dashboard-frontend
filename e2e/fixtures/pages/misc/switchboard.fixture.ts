import type { Page } from '@playwright/test'

import { flags } from '@/app/constants/flags.constants'

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
    await this.page.goto('/switchboard/pages')
    await this.page.getByText('Topic page visibility').click()
    await this.page.locator(`input[id="pages.detail.scenario.topicPageIsPublic.${isPublic}"]`).check()
    await this.page.getByRole('button', { name: 'Save changes' }).click()
    await this.page.reload()
  }
}
