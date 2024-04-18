import { cookies } from 'next/headers'

import { View } from '@/app/components/ui/ukhsa'

const SWITCHBOARD_COOKIE_KEY = 'UKHSASwitchboard'

const getCurrentState = (cookieStore: ReturnType<typeof cookies>): SwitchboardState => {
  if (cookieStore.has(SWITCHBOARD_COOKIE_KEY) && cookieStore.get(SWITCHBOARD_COOKIE_KEY)?.value) {
    return JSON.parse(cookieStore.get(SWITCHBOARD_COOKIE_KEY)?.value as string)
  }
  return {} as SwitchboardState
}

interface SwitchboardState {
  globalBanner: {
    type: 'Information' | 'Warning' | 'Inactive'
  }
}

export default function SwitchBoard() {
  const cookieStore = cookies()

  console.log('cookieStore', cookieStore.get(SWITCHBOARD_COOKIE_KEY))

  const initialState = getCurrentState(cookieStore)

  console.log('initialState', initialState.globalBanner.type)

  return (
    <View heading="Switchboard" className="govuk-!-margin-top-5">
      <form
        className="govuk-!-margin-top-3"
        action={async (form) => {
          'use server'

          const cookieStore = cookies()
          // cookieStore.delete(SWITCHBOARD_COOKIE_KEY)

          cookieStore.set(
            SWITCHBOARD_COOKIE_KEY,
            JSON.stringify({
              ...getCurrentState(cookieStore),
              globalBanner: {
                type: form.get('global-banner-type'),
              },
            })
          )
        }}
      >
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-9">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Global banner</h2>
            <span className="govuk-hint govuk-!-margin-top-2">Select banner type</span>
          </legend>
          <div className="govuk-radios" data-module="govuk-radios">
            <div className="govuk-radios__item">
              <input
                defaultChecked={initialState.globalBanner.type === 'Information'}
                className="govuk-radios__input"
                id="global-banner-info"
                name="global-banner-type"
                type="radio"
                value="Information"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="global-banner-info">
                Information
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={initialState.globalBanner.type === 'Warning'}
                className="govuk-radios__input"
                id="global-banner-warning"
                name="global-banner-type"
                type="radio"
                value="Warning"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="global-banner-warning">
                Warning
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={initialState.globalBanner.type === 'Inactive'}
                className="govuk-radios__input"
                id="global-banner-inactive"
                name="global-banner-type"
                type="radio"
                value="Inactive"
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
