import assert from 'assert'
import { cookies } from 'next/headers'

import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'

import { switchBoardSchema } from './schema'
import { getSwitchBoardState, initialState } from './state'

const apiSchema = switchBoardSchema.shape.api

export type FieldId = keyof (typeof initialState)['api']

function pickFieldState(fieldId: FieldId, form: FormData) {
  assert(fieldId)
  assert(form)

  const selected = form.get(`${fieldId}.selected`)
  const status = form.get(`${fieldId}.status`)

  return apiSchema.shape[fieldId].parse({
    selected: selected !== '' ? selected : null,
    status,
  })
}

export function mergeFieldState(fieldId: FieldId, form: FormData) {
  assert(fieldId)
  assert(form)

  const cookieStore = cookies()
  const fieldState = pickFieldState(fieldId, form)
  const switchBoardState = getSwitchBoardState(cookieStore.get(UKHSA_SWITCHBOARD_COOKIE_NAME)?.value)
  const newState: switchBoardSchema['api'] = {
    [fieldId]: fieldState,
  }

  cookieStore.set(
    UKHSA_SWITCHBOARD_COOKIE_NAME,
    JSON.stringify({
      ...switchBoardState,
      api: {
        ...switchBoardState.api,
        ...newState,
      },
    })
  )
}

export const handleSubmitAction = async (form: FormData) => {
  'use server'
  const id = form.get('id') as FieldId
  assert(id)
  mergeFieldState(id, form)
}
