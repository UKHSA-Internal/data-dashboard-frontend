import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { LayoutSideNav } from '@/app/components/ui/ukhsa/Layout/LayoutSideNav'
import { flags } from '@/app/constants/flags.constants'
import { getFeatureFlag } from '@/app/utils/flags.utils'

export default async function Layout({ children }: { children: ReactNode }) {
  const { enabled } = await getFeatureFlag(flags.weatherHealthAlert)

  if (!enabled) notFound()

  return <LayoutSideNav>{children}</LayoutSideNav>
}
