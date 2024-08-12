import { cookies } from 'next/headers'

import { View } from '@/app/components/ui/ukhsa'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { heading } from '../../shared/constants'
import { getSwitchBoardState, syncState } from '../../shared/state'

export default function SwitchBoard() {
  const cookieStore = cookies()

  const {
    flags: { 'adverse-weather': adverseWeather, 'new-landing-page': newLandingPage },
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
              'adverse-weather': form.get('flags.adverseWeather') as string,
              'new-landing-page': form.get('flags.newLandingPage') as string,
            }
          )
        }}
      >
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-6">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Feature flags</h2>
          </legend>
          <div className="govuk-radios govuk-radios--inline govuk-radios--small" data-module="govuk-radios">
            <label className="govuk-label w-full" htmlFor="flags.adverseWeather.Enabled">
              Weather health alert
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={adverseWeather === 'enabled'}
                className="govuk-radios__input"
                id="flags.adverseWeather.Enabled"
                name="flags.adverseWeather"
                type="radio"
                value="enabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.adverseWeather.Enabled">
                Enabled
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={adverseWeather === 'disabled'}
                className="govuk-radios__input"
                id="flags.adverseWeather.Disabled"
                name="flags.adverseWeather"
                type="radio"
                value="disabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.adverseWeather.Disabled">
                Disabled
              </label>
            </div>
          </div>

          <div
            className="govuk-radios govuk-radios--inline govuk-radios--small govuk-!-margin-top-4"
            data-module="govuk-radios"
          >
            <label className="govuk-label w-full" htmlFor="flags.newLandingPage.Enabled">
              New landing page
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={newLandingPage === 'enabled'}
                className="govuk-radios__input"
                id="flags.newLandingPage.Enabled"
                name="flags.newLandingPage"
                type="radio"
                value="enabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.newLandingPage.Enabled">
                Enabled
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={newLandingPage === 'disabled'}
                className="govuk-radios__input"
                id="flags.newLandingPage.Disabled"
                name="flags.newLandingPage"
                type="radio"
                value="disabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.newLandingPage.Disabled">
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
