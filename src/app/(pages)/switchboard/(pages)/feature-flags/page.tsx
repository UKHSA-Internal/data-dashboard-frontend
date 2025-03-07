import { cookies } from 'next/headers'

import { View } from '@/app/components/ui/ukhsa'
import { BackLink } from '@/app/components/ui/ukhsa/View/BackLink/Backlink'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { heading } from '../../shared/constants'
import { getSwitchBoardState, syncState } from '../../shared/state'

export default function SwitchBoard() {
  const cookieStore = cookies()

  const {
    flags: { 'example-flag': exampleFlag },
  } = getSwitchBoardState(cookieStore.get(UKHSA_SWITCHBOARD_COOKIE_NAME)?.value)

  return (
    <View className="govuk-!-margin-top-5">
      <BackLink backlink="/switchboard" />
      <Heading heading={heading} />
      <form
        className="govuk-!-margin-top-3"
        action={async (form) => {
          'use server'
          syncState(
            {},
            {
              'example-flag': form.get('flags.exampleFlag') as string,
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
            <label className="govuk-label w-full" htmlFor="flags.exampleFlag.Enabled">
              Example flag
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={exampleFlag === 'enabled'}
                className="govuk-radios__input"
                id="flags.exampleFlag.Enabled"
                name="flags.exampleFlag"
                type="radio"
                value="enabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.exampleFlag.Enabled">
                Enabled
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={exampleFlag === 'disabled'}
                className="govuk-radios__input"
                id="flags.exampleFlag.Disabled"
                name="flags.exampleFlag"
                type="radio"
                value="disabled"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.exampleFlag.Disabled">
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
