import type { Metadata } from 'next'

import StartPage from '@/app/components/cms/pages/Start'
import { PageParams, SearchParams } from '@/app/types'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default async function Page(props: { params: Promise<PageParams>; searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { slug = [] } = params

  return <StartPage slug={slug} searchParams={searchParams} />
}
