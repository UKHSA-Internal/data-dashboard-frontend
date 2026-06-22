import { viewports } from "e2e/constants/viewports.constants";

import { test } from "../../fixtures/app.fixture.non.public"

test.describe('COVID-19 page - non-public @non-public', () => {
    test.use({ viewport: viewports.desktop })

    test('render the COVID-19 topic page as non-public', async ( app, authEnabled, covid19Page, switchboardPage ) => {
        test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')

        await switchboardPage.setTopicPageIsPublic(false)
        await covid19Page.goto()

        await app.hasHeading('COVID-19')
        await covid19Page.hasClassificationBanner()
    })
})