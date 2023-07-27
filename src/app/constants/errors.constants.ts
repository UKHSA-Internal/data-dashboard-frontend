import { ErrorMessageOptions } from 'zod-error'

export const zodErrorMessageOptions: ErrorMessageOptions = {
  maxErrors: 2,
  delimiter: {
    component: ' - ',
  },
  path: {
    enabled: true,
    type: 'zodPathArray',
    label: 'Zod Path: ',
  },
  code: {
    enabled: false,
  },
  message: {
    enabled: true,
    label: '',
  },
} as const
