import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { isWellKnownEnvironment } from '@/app/utils/app.utils'

export function generateMetadata(): Metadata {
  return isWellKnownEnvironment()
    ? {
        title: 'Page not found | UKHSA data dashboard',
        description: 'Error - Page not found',
      }
    : {
        title: 'Switchboard | UKHSA data dashboard',
      }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  // Switchboard shouldn't be accessible in deployed environments.
  if (isWellKnownEnvironment()) return notFound()

  return children
}
