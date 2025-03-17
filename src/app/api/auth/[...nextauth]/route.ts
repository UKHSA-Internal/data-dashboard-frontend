import { handlers } from '@/auth'
import { authEnabled } from '@/config/constants'

//export const { GET, POST } = handlers
export const GET = authEnabled ? handlers.GET : undefined
export const POST = authEnabled ? handlers.POST : undefined
