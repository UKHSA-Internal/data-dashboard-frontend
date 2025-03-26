import { cookies } from 'next/headers'

import { View } from '@/app/components/ui/ukhsa'
import { BackLink } from '@/app/components/ui/ukhsa/View/BackLink/Backlink'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import GlobalBannerRadio from '../../components/GlobalBannerRadio'
import { StatusSelect } from '../../components/StatusSelect'
import { heading } from '../../shared/constants'
import { getSwitchBoardState, syncState } from '../../shared/state'

export default function SwitchBoard() {
  const cookieStore = cookies()

  const {
    api: { 'global-banners': globalBanner },
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
            'global-banners': {
              status: Number(form.get('global-banners.status')),
              scenario: form.get('global-banners.scenario'),
            },
          })
        }}
      >
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-6">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Global banner</h2>
          </legend>
          <StatusSelect id="global-banners.status" name="global-banners.status" defaultValue={globalBanner.status} />
          <div className="govuk-radios govuk-radios--small govuk-!-margin-top-6" data-module="govuk-radios">
            <label className="govuk-label" htmlFor="global-banners.scenario.Information">
              Variant
            </label>
            <GlobalBannerRadio globalBannerScenario={globalBanner.scenario} radioOption="Information" />
            <GlobalBannerRadio globalBannerScenario={globalBanner.scenario} radioOption="Warning" />
            <GlobalBannerRadio globalBannerScenario={globalBanner.scenario} radioOption="Multiple" />
            <GlobalBannerRadio globalBannerScenario={globalBanner.scenario} radioOption="Inactive" />
          </div>
        </fieldset>
        <button type="submit" className="govuk-button">
          Save changes
        </button>
      </form>
    </View>
  )
}
