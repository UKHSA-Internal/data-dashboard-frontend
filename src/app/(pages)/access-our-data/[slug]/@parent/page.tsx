import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Contents, ContentsLink } from '@/app/components/ui/ukhsa'
import { Announcement } from '@/app/components/ui/ukhsa/Announcement/Announcement'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

export default async function ParentView() {
  const { id, body } = await getPageBySlug<PageType.Composite>('access-our-data')

  const childPages = await getPages({ child_of: id.toString() })

  return (
    <>
      <Announcement
        variant="Information"
        heading="Data for COVID-19 is delayed"
        summary="Data is only current up to 20th December 2023. We apologise for the inconvenience and aim to get this resolved
        as soon as possible"
        className="govuk-!-margin-bottom-3"
      />

      <Announcement
        variant="Warning"
        heading="UKHSA data dashboard is being replaced"
        summary="22nd December 2023 - The UKHSA data dashboard is being replaced by the gov.uk dashboard"
        className="govuk-!-margin-bottom-3"
      />

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
