import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture.non.public'

const respiratoryTopicPages = [
  {
    name: 'COVID-19',
    path: '/respiratory-viruses/covid-19',
    heading: 'COVID-19',
  },
  {
    name: 'Influenza',
    path: '/respiratory-viruses/influenza',
    heading: 'Influenza',
  },
  {
    name: 'Other respiratory viruses',
    path: '/respiratory-viruses/other-respiratory-viruses',
    heading: 'Other respiratory viruses',
  },
]

test.describe('Respiratory topic pages - non-public @non-public', () => {
  test.use({ viewport: viewports.desktop })

  for (const topicPage of respiratoryTopicPages) {
    test(`${topicPage.name} shows the classification banner`, async ({ app, authEnabled, page, switchboardPage }) => {
      // Reason: All tests here are only relevant when auth has been enabled
      test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')

      await switchboardPage.setTopicPageIsPublic(false)
      await page.goto(topicPage.path)

      await app.hasHeading(topicPage.heading)
      await app.hasClassificationBanner()
      await app.checkClassificationBannerContent()
    })
  }
})
