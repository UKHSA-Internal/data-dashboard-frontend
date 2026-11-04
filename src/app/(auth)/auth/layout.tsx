import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { NO_INDEX_ROBOTS } from '@/app/utils/seo.utils'

export const metadata: Metadata = {
  robots: NO_INDEX_ROBOTS,
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return children
}
