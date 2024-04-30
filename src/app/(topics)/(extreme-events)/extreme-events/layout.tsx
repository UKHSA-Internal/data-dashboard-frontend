import { flag } from '@unleash/nextjs'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { LayoutSideNav } from '@/app/components/ui/ukhsa/Layout/LayoutSideNav'
import { flags } from '@/app/constants/flags.constants'

export default async function Layout({ children }: { children: ReactNode }) {
  const { enabled } = await flag(flags.extremeEvents)
  console.log('enabled', enabled)

  if (!enabled) notFound()

  return <LayoutSideNav>{children}</LayoutSideNav>
}
