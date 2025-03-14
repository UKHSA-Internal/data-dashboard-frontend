import StartPage from '@/app/components/cms/pages/Start'
import { PageParams, SearchParams } from '@/app/types'

export default async function Page({ params, searchParams }: { params: PageParams; searchParams: SearchParams }) {
  const { slug = [] } = params

  return <StartPage slug={slug} searchParams={searchParams} />
}
