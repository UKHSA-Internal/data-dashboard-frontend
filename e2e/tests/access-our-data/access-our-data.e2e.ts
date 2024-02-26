import { test } from '../../fixtures/app.fixture'

test.describe('Access our data', () => {
  test('Parent page', async ({ accessOurDataPage }) => {
    await accessOurDataPage.goto()
  })

  test('Overview page (first page)', async ({ accessOurDataPage }) => {
    await test.step('loads the page', async () => {
      await accessOurDataPage.goto('/access-our-data/overview')
    })
    await test.step('displays parent heading', async () => {
      await accessOurDataPage.hasParentHeading()
    })
    await test.step('displays parent body content', async () => {
      await accessOurDataPage.hasParentContent()
    })
    await test.step('displays contents menu', async () => {
      await accessOurDataPage.hasContentsSection()
    })
    await test.step('displays related links menu', async () => {
      await accessOurDataPage.hasRelatedLinks()
    })
    await test.step('displays child heading', async () => {
      await accessOurDataPage.hasChildHeading('Overview')
    })
    await test.step('displays child content', async () => {
      await accessOurDataPage.hasChildContent(
        'The UK Health Security Agency (UKHSA) is responsible for protecting every member of every community from the impact of infectious diseases, chemical, biological, radiological and nuclear incidents and other health threats.'
      )
      await accessOurDataPage.hasChildContent(
        'UKHSA is an executive agency, sponsored by the Department of Health and Social Care'
      )
      await accessOurDataPage.hasChildContent(
        'The UKHSA data dashboard API is designed to support developers and other users to easily extract and save data, that is present in the dashboard. It allows for easy access to data, integration with software, tailed responses for each use case'
      )
    })
    await test.step('Shows only next link', async () => {
      await accessOurDataPage.noPreviousLink()
      await accessOurDataPage.hasNextLink('What is an API')
    })
  })

  test('Getting started page (middle page)', async ({ accessOurDataPage }) => {
    await test.step('loads the page', async () => {
      await accessOurDataPage.goto('/access-our-data/getting-started')
    })
    await test.step('displays child heading', async () => {
      await accessOurDataPage.hasChildHeading('Getting started')
    })
    await test.step('displays child content', async () => {
      await accessOurDataPage.hasChildContent(
        'This API is useful for applications that incorporate content from the UKHSA data dasbhoard, and for keeping that content up to date. It provides a more accessible and predictable interface that what can be achieved through scraping HTML pages.'
      )
      await accessOurDataPage.hasChildContent(
        'The content within thie API is limited to data provided in the UKHSA data dashboard, and does not include other websites or areas of gov.uk'
      )
      await accessOurDataPage.hasChildContent(
        'Not all content is available, there will be some selections (such as when filtering by location) that either do not have data yet, or will never have data. UKHSA relies on external data (from NHS/ government sources) for the data dashboard.'
      )
    })
    await test.step('displays next and previous links', async () => {
      await accessOurDataPage.hasPreviousLink('What is an API')
      await accessOurDataPage.hasNextLink('API Authentication')
    })
  })

  test('Data structure page (last page)', async ({ accessOurDataPage }) => {
    await test.step('loads the page', async () => {
      await accessOurDataPage.goto('/access-our-data/data-structure')
    })
    await test.step('displays child heading', async () => {
      await accessOurDataPage.hasChildHeading('Data structure')
    })
    await test.step('displays child content', async () => {
      await accessOurDataPage.hasChildContent(
        'The structure of the URL stays the same for each API query, following the filtering selection process. For Example:'
      )
      await accessOurDataPage.hasChildContent(
        'The overall category is plural (in this example, themes) which is then followed by the detail selected (in this example, infectious_diseases). You cannot extract all the data across a topic or geography type, the API is designed for you to be selective by data type, topic, geography and metric.'
      )
    })
    await test.step('displays next and previous links', async () => {
      await accessOurDataPage.hasPreviousLink('API Authentication')
      await accessOurDataPage.noNextLink()
    })
  })

  test('Contents navigation works', async ({ accessOurDataPage }) => {
    await test.step('loads the page', async () => {
      await accessOurDataPage.goto('/access-our-data/overview')
    })
    await test.step('click contents item', async () => {
      await accessOurDataPage.selectContentsItem('Getting started')
    })
    await test.step('displays updated page', async () => {
      await accessOurDataPage.hasChildHeading('Getting started')
    })
  })

  test('Next & previous navigation works as expected', async ({ accessOurDataPage }) => {
    await test.step('loads the page', async () => {
      await accessOurDataPage.goto('/access-our-data/overview')
    })
    await test.step('displays initial heading', async () => {
      await accessOurDataPage.hasChildHeading('Overview')
    })
    await test.step("click 'next' navigation button", async () => {
      await accessOurDataPage.clickNextLink('What is an API')
    })
    await test.step('displays updated page', async () => {
      await accessOurDataPage.hasChildHeading('What is an API')
    })
    await test.step("click 'previous' navigation button", async () => {
      await accessOurDataPage.clickPreviousLink('Overview')
    })
    await test.step('displays updated page', async () => {
      await accessOurDataPage.hasChildHeading('Overview')
    })
  })
})

// use related links tests?
