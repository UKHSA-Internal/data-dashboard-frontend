import { redirect } from 'next/navigation'

import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'

export default async function AccessOurData() {
  const { meta } = await getPageBySlug('access-our-data', PageType.Composite)
  const childPages = await getPages(PageType.Composite, { child_of: meta.parent.id.toString() })

  const firstChild = childPages.success && childPages.data.items[0].meta.slug

  redirect(`/access-our-data/${firstChild}`)
}
