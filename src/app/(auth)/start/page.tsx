import type { Metadata } from 'next'

import StartPage from '@/app/components/cms/pages/Start'
import { PageParams, SearchParams } from '@/app/types'
import { authEnabled } from '@/config/constants'

export const metadata: Metadata = authEnabled
  ? { title: 'Sign in' }
  : {
      title: 'Page not found | UKHSA data dashboard',
      description: 'Error - Page not found',
    }

export default async function Page(props: { params: Promise<PageParams>; searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { slug = [] } = params

  return <StartPage slug={slug} searchParams={searchParams} />
}
