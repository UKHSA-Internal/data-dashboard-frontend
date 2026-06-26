import { cookies } from 'next/headers'

import { View } from '@/app/components/ui/ukhsa'
import { BackLink } from '@/app/components/ui/ukhsa/View/BackLink/Backlink'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { StatusSelect } from '../../components/StatusSelect'
import { heading } from '../../shared/constants'
import { getSwitchBoardState, syncState } from '../../shared/state'

export default async function SwitchBoard() {
  const cookieStore = await cookies()

  const {
    api: { menus },
  } = getSwitchBoardState(cookieStore.get(UKHSA_SWITCHBOARD_COOKIE_NAME)?.value)

  return (
    <View className="govuk-!-margin-top-5">
      <BackLink backlink="/switchboard" />
      <Heading heading={heading} />
      <form
        className="govuk-!-margin-top-3"
        action={async (form) => {
          'use server'

          syncState({
            menus: {
              status: Number(form.get('menus.status')),
              scenario: form.get('menus.scenario'),
            },
          })
        }}
      >
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-6">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Menus</h2>
          </legend>
          <StatusSelect id="menus.status" name="menus.status" defaultValue={menus.status} />
          <div className="govuk-radios govuk-radios--small govuk-!-margin-top-6" data-module="govuk-radios">
            <label className="govuk-label" htmlFor="menus.scenario.Information">
              Variant
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={menus.scenario === 'Inactive'}
                className="govuk-radios__input"
                id="menus.scenario.Inactive"
                name="menus.scenario"
                type="radio"
                value="Inactive"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="menus.scenario.Inactive">
                Inactive
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={menus.scenario === 'MegaMenu'}
                className="govuk-radios__input"
                id="menus.scenario.MegaMenu"
                name="menus.scenario"
                type="radio"
                value="MegaMenu"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="menus.scenario.MegaMenu">
                Mega Menu
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
