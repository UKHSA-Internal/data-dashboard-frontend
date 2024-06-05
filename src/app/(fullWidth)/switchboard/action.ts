'use server'

import { cookies } from 'next/headers'

import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { switchBoardSchema } from './schema'
import { getSwitchBoardState } from './state'

export async function action(form: FormData) {
  const cookieStore = cookies()

  const selected = form.get('global-banner.selected')
  const status = form.get('global-banner.status')

  const globalBanner = switchBoardSchema.shape.api.shape['global-banners'].parse({
    selected: selected !== '' ? selected : null,
    status,
  })

  const currentState = getSwitchBoardState(cookieStore.get(UKHSA_SWITCHBOARD_COOKIE_NAME)?.value)

  const newState: switchBoardSchema['api'] = {
    'global-banners': globalBanner,
  }

  cookieStore.set(
    UKHSA_SWITCHBOARD_COOKIE_NAME,
    JSON.stringify({
      ...currentState,
      api: {
        ...currentState.api,
        ...newState,
      },
    })
  )
}
