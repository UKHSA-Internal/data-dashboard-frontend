import { ReactNode } from 'react'

import { LayoutFullWidth } from '@/app/components/ui/ukhsa/Layout/LayoutFullWidth'

export default async function Layout({ children }: { children: ReactNode }) {
  return <LayoutFullWidth>{children}</LayoutFullWidth>
}
