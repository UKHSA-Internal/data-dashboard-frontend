import { cookies } from 'next/headers'

import { View } from '@/app/components/ui/ukhsa'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { getSwitchBoardState } from './state'
import { handleSubmitAction } from './utils'

export default function SwitchBoard() {
  const cookieStore = cookies()

  const {
    api: { 'global-banners': globalBanner },
  } = getSwitchBoardState(cookieStore.get(UKHSA_SWITCHBOARD_COOKIE_NAME)?.value)

  return (
    <View heading="Switchboard" className="govuk-!-margin-top-5">
      <form className="govuk-!-margin-top-3" action={handleSubmitAction}>
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-9">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Global banner</h2>
          </legend>
          <input type="hidden" name="id" value="global-banners" />
          <div className="govuk-form-group mb-0 w-1/2">
            <label className="govuk-label" htmlFor="global-banners.status">
              Status
            </label>
            <select
              className="govuk-select"
              id="global-banners.status"
              name="global-banners.status"
              defaultValue={globalBanner.status}
            >
              <option value="200">200 - OK</option>
              <option value="400">400 - Application Error</option>
              <option value="401">401 - Unauthorized</option>
              <option value="500">500 - Internal Server Error</option>
            </select>
          </div>
          <div className="govuk-radios govuk-radios--small govuk-!-margin-top-6" data-module="govuk-radios">
            <label className="govuk-label" htmlFor="global-banners.selected.Information">
              Variant
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={globalBanner.selected === 'Information'}
                className="govuk-radios__input"
                id="global-banners.selected.Information"
                name="global-banners.selected"
                type="radio"
                value="Information"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="global-banners.selected.Information">
                Information
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={globalBanner.selected === 'Warning'}
                className="govuk-radios__input"
                id="global-banners.selected.Warning"
                name="global-banners.selected"
                type="radio"
                value="Warning"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="global-banners.selected.Warning">
                Warning
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={!globalBanner.selected}
                className="govuk-radios__input"
                id="global-banners.selected.Inactive"
                name="global-banners.selected"
                type="radio"
                value=""
              />
              <label className="govuk-label govuk-radios__label" htmlFor="global-banners.selected.Inactive">
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
