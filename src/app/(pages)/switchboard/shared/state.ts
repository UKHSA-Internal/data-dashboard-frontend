import { StatusCodes } from 'http-status-codes'
import { cookies } from 'next/headers'

import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { switchBoardSchema, type switchBoardSchema as switchBoardSchemaType } from './schema'

// This is the initial state of the switchboard and needs to be populated whenever new mocks are introduced
export const initialState: switchBoardSchemaType = {
  api: {
    alerts: {
      list: {
        status: StatusCodes.OK,
      },
      detail: {
        status: StatusCodes.OK,
      },
      scenario: 'RedAmberGreenYellow',
    },
    pages: {
      list: {
        status: StatusCodes.OK,
      },
      detail: {
        status: StatusCodes.OK,
        scenario: { relatedLinksLayout: 'Footer' },
      },
    },
    'global-banners': {
      scenario: 'Information',
      status: StatusCodes.OK,
    },
    menus: {
      scenario: 'MegaMenu',
      status: StatusCodes.OK,
    },
  },
  flags: {
    'example-flag': 'disabled',
  },
}

export const getSwitchBoardState = (cookies: string | undefined) => {
  if (!cookies) {
    return initialState
  }

  return switchBoardSchema.parse(JSON.parse(cookies))
}

export function syncState(newState: Record<string, unknown>, newFlags?: Record<string, string>) {
  const cookieStore = cookies()
  const switchBoardState = getSwitchBoardState(cookieStore.get(UKHSA_SWITCHBOARD_COOKIE_NAME)?.value)
  const mergedState = { ...switchBoardState.api, ...newState }
  const mergedFlags = { ...switchBoardState.flags, ...newFlags }

  cookieStore.set(
    UKHSA_SWITCHBOARD_COOKIE_NAME,
    JSON.stringify({
      ...switchBoardState,
      api: switchBoardSchema.shape.api.parse(mergedState),
      flags: switchBoardSchema.shape.flags.parse(mergedFlags),
    })
  )
}
