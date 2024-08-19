import { ReactNode } from 'react'

import LayoutBlackBanner from '@/app/components/ui/ukhsa/Layout/LayoutBlackBanner'
import { LayoutSideNav } from '@/app/components/ui/ukhsa/Layout/LayoutSideNav'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutBlackBanner>
      <LayoutSideNav>{children}</LayoutSideNav>
    </LayoutBlackBanner>
  )
}
