import { cookies } from 'next/headers'

import { View } from '@/app/components/ui/ukhsa'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { heading } from '../../shared/constants'
import { getSwitchBoardState, syncState } from '../../shared/state'

export default function SwitchBoard() {
  const cookieStore = cookies()

  const {
    flags: {
      'mega-menu': megaMenu,
      'landing-page-hero': landingPageHero,
      'landing-page-content': landingPageContent,
      'weather-health-summary-card': weatherHealthSummaryCard,
    },
  } = getSwitchBoardState(cookieStore.get(UKHSA_SWITCHBOARD_COOKIE_NAME)?.value)

  return (
    <View heading={heading} className="govuk-!-margin-top-5" backLink="/switchboard">
      <form
        className="govuk-!-margin-top-3"
        action={async (form) => {
          'use server'
          syncState(
            {},
            {
              'mega-menu': form.get('flags.megaMenu') as string,
              'landing-page-hero': form.get('flags.landingPageHero') as string,
              'landing-page-content': form.get('flags.landingPageContent') as string,
              'weather-health-summary-card': form.get('flags.weatherHealthSummaryCard') as string,
            }
          )
        }}
      >
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-6">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Feature flags</h2>
          </legend>

          <div
            className="govuk-radios govuk-radios--inline govuk-radios--small govuk-!-margin-top-4"
            data-module="govuk-radios"
          >
            <label className="govuk-label w-full" htmlFor="flags.megaMenu.Enabled">
              Mega menu
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={megaMenu === 'enabled'}
                className="govuk-radios__input"
                id="flags.megaMenu.Enabled"
                name="flags.megaMenu"
                type="radio"
                value="enabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.megaMenu.Enabled">
                Enabled
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={megaMenu === 'disabled'}
                className="govuk-radios__input"
                id="flags.megaMenu.Disabled"
                name="flags.megaMenu"
                type="radio"
                value="disabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.megaMenu.Disabled">
                Disabled
              </label>
            </div>
          </div>

          <div
            className="govuk-radios govuk-radios--inline govuk-radios--small govuk-!-margin-top-4"
            data-module="govuk-radios"
          >
            <label className="govuk-label w-full" htmlFor="flags.landingPageHero.Enabled">
              Landing page hero
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={landingPageHero === 'enabled'}
                className="govuk-radios__input"
                id="flags.landingPageHero.Enabled"
                name="flags.landingPageHero"
                type="radio"
                value="enabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.landingPageHero.Enabled">
                Enabled
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={landingPageHero === 'disabled'}
                className="govuk-radios__input"
                id="flags.landingPageHero.Disabled"
                name="flags.landingPageHero"
                type="radio"
                value="disabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.landingPageHero.Disabled">
                Disabled
              </label>
            </div>
          </div>

          <div
            className="govuk-radios govuk-radios--inline govuk-radios--small govuk-!-margin-top-4"
            data-module="govuk-radios"
          >
            <label className="govuk-label w-full" htmlFor="flags.landingPageContent.Enabled">
              Landing page content
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={landingPageContent === 'enabled'}
                className="govuk-radios__input"
                id="flags.landingPageContent.Enabled"
                name="flags.landingPageContent"
                type="radio"
                value="enabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.landingPageContent.Enabled">
                Enabled
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={landingPageContent === 'disabled'}
                className="govuk-radios__input"
                id="flags.landingPageContent.Disabled"
                name="flags.landingPageContent"
                type="radio"
                value="disabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.landingPageContent.Disabled">
                Disabled
              </label>
            </div>
          </div>

          <div
            className="govuk-radios govuk-radios--inline govuk-radios--small govuk-!-margin-top-4"
            data-module="govuk-radios"
          >
            <label className="govuk-label w-full" htmlFor="flags.weatherHealthSummaryCard.Enabled">
              Weather health summary card
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={weatherHealthSummaryCard === 'enabled'}
                className="govuk-radios__input"
                id="flags.weatherHealthSummaryCard.Enabled"
                name="flags.weatherHealthSummaryCard"
                type="radio"
                value="enabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.weatherHealthSummaryCard.Enabled">
                Enabled
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={weatherHealthSummaryCard === 'disabled'}
                className="govuk-radios__input"
                id="flags.weatherHealthSummaryCard.Disabled"
                name="flags.weatherHealthSummaryCard"
                type="radio"
                value="disabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.weatherHealthSummaryCard.Disabled">
                Disabled
              </label>
            </div>
          </div>
        </fieldset>
        <button type="submit" className="govuk-button">
          Save changes
        </button>
      </form>
    </View>
  )
}
