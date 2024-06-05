import { cookies } from 'next/headers'

import { View } from '@/app/components/ui/ukhsa'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { action } from './action'
import { getSwitchBoardState } from './state'

export default function SwitchBoard() {
  const cookieStore = cookies()

  const {
    api: { 'global-banners': globalBanner },
  } = getSwitchBoardState(cookieStore.get(UKHSA_SWITCHBOARD_COOKIE_NAME)?.value)

  return (
    <View heading="Switchboard" className="govuk-!-margin-top-5">
      <form className="govuk-!-margin-top-3" action={action}>
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-9">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Global banner</h2>
            <span className="govuk-hint govuk-!-margin-top-2">Select banner type</span>
          </legend>
          <div className="govuk-radios" data-module="govuk-radios">
            <div className="govuk-radios__item">
              <input
                defaultChecked={globalBanner.selected === 'Information'}
                className="govuk-radios__input"
                id="global-banner-info"
                name="global-banner.selected"
                type="radio"
                value="Information"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="global-banner-info">
                Information
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={globalBanner.selected === 'Warning'}
                className="govuk-radios__input"
                id="global-banner-warning"
                name="global-banner.selected"
                type="radio"
                value="Warning"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="global-banner-warning">
                Warning
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={!globalBanner.selected}
                className="govuk-radios__input"
                id="global-banner-inactive"
                name="global-banner.selected"
                type="radio"
                value=""
              />
              <label className="govuk-label govuk-radios__label" htmlFor="global-banner-inactive">
                Inactive
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
