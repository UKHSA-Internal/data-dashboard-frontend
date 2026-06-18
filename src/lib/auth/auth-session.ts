import { cache } from 'react'

export const getServerSession = cache(async () => {
  const { auth } = await import('@/auth')
  return await auth()
})

export const getClientSession = cache(async () => {
  const { getSession } = await import('next-auth/react')
  return await getSession()
})
