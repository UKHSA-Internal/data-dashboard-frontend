import { ReactNode } from 'react'

import { LayoutSideNav } from '@/app/components/ui/ukhsa/Layout/LayoutSideNav'

import LayoutBlackBanner from '../components/ui/ukhsa/Layout/LayoutBlackBanner'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutBlackBanner>
      <LayoutSideNav>{children}</LayoutSideNav>
    </LayoutBlackBanner>
  )
}
