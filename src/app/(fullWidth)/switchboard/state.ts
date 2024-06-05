import { switchBoardSchema, type switchBoardSchema as switchBoardSchemaType } from './schema'

export const initialState: switchBoardSchemaType = {
  api: {
    'global-banners': {
      selected: 'Information',
      status: '200',
    },
  },
  flags: {
    'adverse-weather': {
      selected: true,
      status: '200',
    },
  },
}

export const getSwitchBoardState = (cookies: string | undefined) => {
  if (!cookies) {
    return initialState
  }

  return switchBoardSchema.parse(JSON.parse(cookies))
}
