import type { Page } from '@playwright/test'

import { flags } from '@/app/constants/flags.constants'

type Flag = keyof typeof flags
type FlagStatus = 'Enabled' | 'Disabled'

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
}
