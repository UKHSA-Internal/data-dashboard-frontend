import { cookies } from 'next/headers'

import { StatusSelect } from '@/app/(pages)/switchboard/components/StatusSelect'
import { heading } from '@/app/(pages)/switchboard/shared/constants'
import { getSwitchBoardState, syncState } from '@/app/(pages)/switchboard/shared/state'
import { Details } from '@/app/components/ui/govuk'
import { View } from '@/app/components/ui/ukhsa'
import { BackLink } from '@/app/components/ui/ukhsa/View/BackLink/Backlink'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

export default function SwitchBoard() {
  const cookieStore = cookies()

  const {
    api: { pages },
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
            pages: {
              list: {
                status: Number(form.get('pages.list.status')),
              },
              detail: {
                status: Number(form.get('pages.detail.status')),
                scenario: {
                  relatedLinksLayout: form.get('pages.detail.scenario.relatedLinksLayout'),
                },
              },
            },
          })
        }}
      >
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-6">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Pages</h2>
          </legend>
          <StatusSelect id="pages.list.status" name="pages.list.status" defaultValue={pages.list.status} />
        </fieldset>

        <fieldset className="govuk-fieldset govuk-!-margin-bottom-6">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Page</h2>
            <span className="govuk-hint">Overides all individual page requests</span>
          </legend>
          <StatusSelect id="pages.detail.status" name="pages.detail.status" defaultValue={pages.detail.status} />

          <Details label="Related Links" className="govuk-!-margin-top-5">
            <div className="govuk-radios govuk-radios--small" data-module="govuk-radios">
              <div className="govuk-radios__item">
                <input
                  defaultChecked={pages.detail.scenario.relatedLinksLayout === 'Sidebar'}
                  className="govuk-radios__input"
                  id="pages.detail.scenario.relatedLinksLayout.Sidebar"
                  name="pages.detail.scenario.relatedLinksLayout"
                  type="radio"
                  value="Sidebar"
                />
                <label
                  className="govuk-label govuk-radios__label"
                  htmlFor="pages.detail.scenario.relatedLinksLayout.Sidebar"
                >
                  Sidebar
                </label>
              </div>

              <div className="govuk-radios__item">
                <input
                  defaultChecked={pages.detail.scenario.relatedLinksLayout === 'Footer'}
                  className="govuk-radios__input"
                  id="pages.detail.scenario.relatedLinksLayout.Footer"
                  name="pages.detail.scenario.relatedLinksLayout"
                  type="radio"
                  value="Footer"
                />
                <label
                  className="govuk-label govuk-radios__label"
                  htmlFor="pages.detail.scenario.relatedLinksLayout.Footer"
                >
                  Footer
                </label>
              </div>
            </div>
          </Details>
        </fieldset>

        <button type="submit" className="govuk-button">
          Save changes
        </button>
      </form>
    </View>
  )
}
