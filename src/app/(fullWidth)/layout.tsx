import { ReactNode } from 'react'

import LayoutBlackBanner from '../components/ui/ukhsa/Layout/LayoutBlackBanner'
import { LayoutFullWidth } from '../components/ui/ukhsa/Layout/LayoutFullWidth'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutBlackBanner>
      <LayoutFullWidth>{children}</LayoutFullWidth>
    </LayoutBlackBanner>
  )
}
