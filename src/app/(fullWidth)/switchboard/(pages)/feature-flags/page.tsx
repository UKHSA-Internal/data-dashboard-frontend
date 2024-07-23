import { cookies } from 'next/headers'

import { View } from '@/app/components/ui/ukhsa'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { heading } from '../../shared/constants'
import { getSwitchBoardState, syncState } from '../../shared/state'

export default function SwitchBoard() {
  const cookieStore = cookies()

  const {
    flags: { 'adverse-weather': adverseWeather, 'map-tile-provider': mapTileProvider },
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
              'map-tile-provider': form.get('flags.mapTileProvider') as string,
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
          <div className="govuk-radios govuk-radios--small govuk-!-margin-top-6" data-module="govuk-radios">
            <label className="govuk-label w-full" htmlFor="flags.mapTileProvider.Enabled">
              Map Tile Provider
            </label>
            <div className="govuk-radios__item">
              <input
                defaultChecked={mapTileProvider === 'OpenStreetMaps'}
                className="govuk-radios__input"
                id="flags.mapTileProvider.OpenStreetMaps"
                name="flags.mapTileProvider"
                type="radio"
                value="OpenStreetMaps"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.mapTileProvider.OpenStreetMaps">
                Open Street Maps
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={mapTileProvider === 'OrdinanceSurveyMaps'}
                className="govuk-radios__input"
                id="flags.mapTileProvider.OrdinanceSurveyMaps"
                name="flags.mapTileProvider"
                type="radio"
                value="OrdinanceSurveyMaps"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.mapTileProvider.OrdinanceSurveyMaps">
                Ordinance Survey Maps
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                defaultChecked={mapTileProvider === 'ArcGISEsri'}
                className="govuk-radios__input"
                id="flags.mapTileProvider.ArcGISEsri"
                name="flags.mapTileProvider"
                type="radio"
                value="ArcGISEsri"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="flags.mapTileProvider.ArcGISEsri">
                ArcGIS Esri
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
