import { flag } from '@unleash/nextjs'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { LayoutSideNav } from '@/app/components/ui/ukhsa/Layout/LayoutSideNav'
import { flags } from '@/app/constants/flags.constants'

export default async function Layout({ children }: { children: ReactNode }) {
  const { enabled } = await flag(flags.extremeEvents)

  console.log('Feature flag from unleash SDK:', enabled)

  const req = await fetch(`${process.env.UNLEASH_SERVER_API_URL}/client/features`, {
    headers: { Authorization: process.env.UNLEASH_SERVER_API_TOKEN },
  })
  const res = await req.json()

  console.log('Feature flag from fetch: ', res)

  if (!enabled) notFound()

  return <LayoutSideNav>{children}</LayoutSideNav>
}
