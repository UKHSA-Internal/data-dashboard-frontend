import { notFound, redirect } from 'next/navigation'

import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'

export default async function AccessOurData() {
  const { id } = await getPageBySlug('access-our-data', PageType.Composite)
  const childPages = await getPages(undefined, { child_of: id.toString() })

  if (!childPages.success || !childPages.data.items.length) {
    notFound()
  }

  redirect(`/access-our-data/${childPages.data.items[0].meta.slug}`)
}
