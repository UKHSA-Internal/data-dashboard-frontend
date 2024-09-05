import { expect, Page } from '@playwright/test'

export class AccessOurDataPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(page?: string) {
    await this.page.goto(page || '/access-our-data')
  }

  async hasMetadata(expectedTitle?: string) {
    const title = await this.page.title()
    await expect(title).toBe(
      title ? `${expectedTitle} - Access our data | UKHSA data dashboard` : 'Access our data | UKHSA data dashboard'
    )
  }

  async hasParentHeading() {
    await expect(this.page.getByRole('heading', { level: 1, name: /Access our data/ })).toBeVisible()
  }

  async hasParentContent() {
    await expect(this.page.getByText('Welcome to the Developers Guide for the UKHSA data dashboard API.')).toBeVisible()

    await expect(
      this.page.getByText(
        'Please see below for instructions initially on how to interact and use our API, as well as swagger API documentation detailing information about each endpoint including parameters and example response.'
      )
    ).toBeVisible()
  }

  async hasContentsSection() {
    await expect(this.page.getByRole('heading', { level: 2, name: /Contents/ })).toBeVisible()

    await expect(this.page.getByRole('link', { name: 'Overview' })).toHaveAttribute('href', '/access-our-data/overview')
    await expect(this.page.getByRole('link', { name: '— What is an API', exact: true })).toHaveAttribute(
      'href',
      '/access-our-data/what-is-an-api'
    )
    await expect(this.page.getByRole('link', { name: 'Getting started' })).toHaveAttribute(
      'href',
      '/access-our-data/getting-started'
    )
    await expect(this.page.getByRole('link', { name: 'API Authentication' })).toHaveAttribute(
      'href',
      '/access-our-data/api-authentication'
    )
    await expect(this.page.getByRole('link', { name: 'Data structure' })).toHaveAttribute(
      'href',
      '/access-our-data/data-structure'
    )
  }

  async selectContentsItem(name: string) {
    await this.page.getByRole('link', { name }).click()
  }

  async hasRelatedLinks() {
    await expect(this.page.getByRole('heading', { level: 2, name: /Related content/ })).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'View swagger documentation (opens in a new window)' })
    ).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'Contribute to our open source project (opens in a new window)' })
    ).toBeVisible()
  }

  async hasLastUpdated() {
    await expect(this.page.getByText(/Last updated on Thursday, 24 August 2023 at 04:53pm/)).toBeVisible()
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
