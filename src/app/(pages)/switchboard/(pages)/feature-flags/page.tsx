import { cookies } from 'next/headers'

import { View } from '@/app/components/ui/ukhsa'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { heading } from '../../shared/constants'
import { getSwitchBoardState, syncState } from '../../shared/state'

export default function SwitchBoard() {
  const cookieStore = cookies()

  const {
    flags: {
      'landing-page-hero': landingPageHero,
      'interactive-charts': interactiveCharts,
      'feedback-form': feedbackForm,
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
              'landing-page-hero': form.get('flags.landingPageHero') as string,
              'interactive-charts': form.get('flags.interactiveCharts') as string,
              'feedback-form': form.get('flags.feedbackForm') as string,
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
            <label className="govuk-label w-full" htmlFor="flags.interactiveCharts.Enabled">
              Interactive charts
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={interactiveCharts === 'enabled'}
                className="govuk-radios__input"
                id="flags.interactiveCharts.Enabled"
                name="flags.interactiveCharts"
                type="radio"
                value="enabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.interactiveCharts.Enabled">
                Enabled
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={interactiveCharts === 'disabled'}
                className="govuk-radios__input"
                id="flags.interactiveCharts.Disabled"
                name="flags.interactiveCharts"
                type="radio"
                value="disabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.interactiveCharts.Disabled">
                Disabled
              </label>
            </div>
          </div>

          <div
            className="govuk-radios govuk-radios--inline govuk-radios--small govuk-!-margin-top-4"
            data-module="govuk-radios"
          >
            <label className="govuk-label w-full" htmlFor="flags.feedbackForm.Enabled">
              Feedback form
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={feedbackForm === 'enabled'}
                className="govuk-radios__input"
                id="flags.feedbackForm.Enabled"
                name="flags.feedbackForm"
                type="radio"
                value="enabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.feedbackForm.Enabled">
                Enabled
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={feedbackForm === 'disabled'}
                className="govuk-radios__input"
                id="flags.feedbackForm.Disabled"
                name="flags.feedbackForm"
                type="radio"
                value="disabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.feedbackForm.Disabled">
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
