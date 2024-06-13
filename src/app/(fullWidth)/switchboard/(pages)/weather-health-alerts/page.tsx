import { cookies } from 'next/headers'

import { View } from '@/app/components/ui/ukhsa'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { StatusSelect } from '../../components/StatusSelect'
import { heading } from '../../shared/constants'
import { getSwitchBoardState, syncState } from '../../shared/state'

export default function SwitchBoard() {
  const cookieStore = cookies()

  const {
    api: { alerts },
  } = getSwitchBoardState(cookieStore.get(UKHSA_SWITCHBOARD_COOKIE_NAME)?.value)

  return (
    <View
      heading={heading}
      className="govuk-!-margin-top-5"
      breadcrumbs={[
        { name: 'Switchboard', link: '/switchboard' },
        { name: 'Weather Health Alerts', link: '/switchboard/weather-health-alerts' },
      ]}
    >
      <form
        className="govuk-!-margin-top-3"
        action={async (form) => {
          'use server'
          syncState({
            alerts: {
              list: { status: Number(form.get('alerts-list.status')) },
              detail: { status: Number(form.get('alerts-detail.status')) },
              scenario: form.get('alerts.scenario'),
            },
          })
        }}
      >
        <input type="hidden" name="id" value="alerts" />
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-6">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Weather Health Alerts</h2>
          </legend>

          <StatusSelect
            id="alerts-list.status"
            name="alerts-list.status"
            defaultValue={alerts.list.status}
            label="Alert list"
            hint="/api/alerts/v1/:geography_type"
          />

          <StatusSelect
            className="govuk-!-margin-top-6"
            id="alerts-detail.status"
            name="alerts-detail.status"
            defaultValue={alerts.detail.status}
            label="Alert detail"
            hint="/api/alerts/v1/:geography_type/:geography_code"
          />

          <div className="govuk-radios govuk-radios--small govuk-!-margin-top-6" data-module="govuk-radios">
            <label className="govuk-label font-bold" htmlFor="alerts.scenario.Information">
              Scenario
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={alerts.scenario === 'Green'}
                className="govuk-radios__input"
                id="alerts.scenario.Green"
                name="alerts.scenario"
                type="radio"
                value="Green"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="alerts.scenario.Green">
                Green
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={alerts.scenario === 'RedAmberGreenYellow'}
                className="govuk-radios__input"
                id="alerts.scenario.RedAmberGreenYellow"
                name="alerts.scenario"
                type="radio"
                value="RedAmberGreenYellow"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="alerts.scenario.RedAmberGreenYellow">
                Green, Amber, Yellow & Red
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={alerts.scenario === 'RedAmber'}
                className="govuk-radios__input"
                id="alerts.scenario.RedAmber"
                name="alerts.scenario"
                type="radio"
                value="RedAmber"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="alerts.scenario.RedAmber">
                Red & Amber
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={alerts.scenario === 'NoAlertsYet'}
                className="govuk-radios__input"
                id="alerts.scenario.NoAlertsYet"
                name="alerts.scenario"
                type="radio"
                value="NoAlertsYet"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="alerts.scenario.NoAlertsYet">
                No alerts issued yet
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
