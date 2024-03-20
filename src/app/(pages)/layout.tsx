import { ReactNode } from 'react'

import { LayoutSideNav } from '../components/ui/ukhsa/Layout/LayoutSideNav'

export default async function Layout({ children }: { children: ReactNode }) {
  return <LayoutSideNav>{children}</LayoutSideNav>
}
