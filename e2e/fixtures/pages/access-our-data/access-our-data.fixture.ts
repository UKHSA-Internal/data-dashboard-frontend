import { expect, Page } from '@playwright/test'

export class AccessOurDataPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(page?: string) {
    await this.page.goto(page || '/access-our-data')
  }

  async hasParentHeading() {
    await expect(this.page.getByRole('heading', { level: 1, name: /Access our data/ })).toBeVisible()
  }

  async hasParentContent() {
    await expect(this.page.getByText('Welcome to the Developers Guide for the UKHSA data dashboard API.')).toBeVisible()

    await expect(
      this.page.getByText(
        'Please see below for instructions initially on how to interact and use our API, as well as swagger API documentation detailing information about each endpoint including parameters and example responses'
      )
    ).toBeVisible()
  }

  async hasContentsSection() {
    await expect(this.page.getByRole('heading', { level: 2, name: /Contents/ })).toBeVisible()

    // TODO: Fix length expectation
    // await expect(this.page.getByRole('navigation', { name: /Contents/ })).toHaveLength(5)
  }

  async selectContentsItem(name: string) {
    await this.page.getByRole('link', { name }).click()
  }

  async hasRelatedLinks() {
    await expect(this.page.getByRole('heading', { level: 2, name: /Related Links/ })).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'View swagger documentation (opens in a new window)' })
    ).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'Contribute to our open source project (opens in a new window)' })
    ).toBeVisible()
  }

  async hasChildHeading(heading: string) {
    await expect(this.page.getByRole('heading', { level: 2, name: heading })).toBeVisible()
  }

  async hasChildContent(content: string) {
    await expect(this.page.getByText(content)).toBeVisible()
  }

  async hasPreviousLink(name: string) {
    await expect(this.page.getByRole('link', { name: `Previous page : ${name}` })).toBeVisible()
  }
  async noPreviousLink() {
    await expect(this.page.getByRole('link', { name: 'Previous page :', exact: false })).toBeHidden()
  }
  async clickPreviousLink(name: string) {
    await this.page.getByRole('link', { name: `Previous page : ${name}` }).click()
  }

  async hasNextLink(name: string) {
    await expect(this.page.getByRole('link', { name: `Next page : ${name}` })).toBeVisible()
  }
  async noNextLink() {
    await expect(this.page.getByRole('link', { name: 'Next page :', exact: false })).toBeHidden()
  }
  async clickNextLink(name: string) {
    await this.page.getByRole('link', { name: `Next page : ${name}` }).click()
  }
}
