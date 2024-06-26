import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Contents, ContentsLink } from '@/app/components/ui/ukhsa'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

export default async function ParentView() {
  const { id, body } = await getPageBySlug<PageType.Composite>('access-our-data')

  const childPages = await getPages({ child_of: id.toString() })

  return (
    <>
      {body.map(renderCompositeBlock)}

      {childPages.success && (
        <Contents>
          {childPages.data.items.map((item) => (
            <ContentsLink key={item.id} href={`/access-our-data/${item.meta.slug}`}>
              {item.title}
            </ContentsLink>
          ))}
        </Contents>
      )}
    </>
  )
}
