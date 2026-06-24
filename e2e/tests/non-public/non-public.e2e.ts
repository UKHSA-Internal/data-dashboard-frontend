import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture.non.public'

const respiritoryTopicPages = [
  {
    name: 'COVID-19',
    path: '/respiritory-viruses/covid-19',
    heading: 'COVID-19',
  },
  {
    name: 'Influenza',
    path: '/respiritory-viruses/influenza',
    heading: 'Influenza',
  },
  {
    name: 'Other respiritory viruses',
    path: '/respiritory-viruses/other-respiritory-viruses',
    heading: 'Other respiritory viruses',
  },
]

test.describe('Respiritory topic pages - non-public @non-public', () => {
  test.use({ viewport: viewports.desktop })

  for (const topicPage of respiritoryTopicPages) {
    test(`${topicPage.name} shows the classification banner`, async ({ app, authEnabled, page, switchboardPage }) => {Expand annotationCheck failure on line R27
      test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')Expand annotationCheck warning on line R28

      await switchboardPage.setTopicPageIsPublic(false)
      await page.goto(topicPage.path)

      await app.hasHeading(topicPage.heading)
      await app.hasClassificationBanner()
      await app.checkClassificationBannerContent()
    })
  }
})
