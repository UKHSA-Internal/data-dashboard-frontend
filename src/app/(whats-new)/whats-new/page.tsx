import dayjs from 'dayjs'
import Link from 'next/link'

import { getPages, PagesResponse, PageType } from '@/api/requests/cms/getPages'
import { Details } from '@/app/components/ui/govuk'
import { View } from '@/app/components/ui/ukhsa'

export const dynamic = 'force-dynamic'

// export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
//   const {
//     meta: { seo_title, search_description },
//   } = await getPageBySlug(slug, PageType.Common)

//   return {
//     title: seo_title,
//     description: search_description,
//   }
// }

export default async function WhatsNewPage({ params: { slug } }: { params: { slug: string } }) {
  // const {
  //   title,
  //   body,
  //   last_published_at: lastUpdated,
  //   related_links: relatedLinks,
  // } = await getPageBySlug(slug, PageType.Common)

  const whatsNewPageIds = [15, 16, 17]

  const allPages = await getPages(PageType.Common)

  if (allPages.success) {
    console.log('pages: ', allPages.data)

    const whatsNewPages = allPages.data.items.filter((page) => whatsNewPageIds.includes(page.id))

    const pagesByMonth: PagesResponse['items'][number][][] = [[]]

    let currentMonth = null

    for (const page of whatsNewPages) {
      if (dayjs(currentMonth).diff(dayjs(page.meta.first_published_at), 'month')) {
        pagesByMonth.push([])
      }

      pagesByMonth[pagesByMonth.length - 1].push(page)

      currentMonth = dayjs(page.meta.first_published_at)
    }

    return (
      <View heading="What's new">
        <p>We regularly update the dashboard with new data and features. Here is a timeline of changes.</p>
        <ul className="govuk-list">
          {pagesByMonth.map((month, index) => {
            return (
              <li key={index}>
                <header className="govuk-heading-m">
                  {dayjs(month[0].meta.first_published_at).format('MMMM YYYY')}
                </header>
                <ul>
                  {month.map((page) => {
                    return (
                      <li key={page.id} className="govuk-!-margin-bottom-7">
                        <p className="govuk-body-m govuk-!-margin-bottom-1 text-dark-grey">
                          {dayjs(page.meta.first_published_at).format('D MMMM YYYY')}
                        </p>
                        <span className="govuk-tag govuk-tag--grey govuk-!-margin-right-2">DATA ISSUE</span>
                        <Link href={`/whats-new/${page.meta.slug}`} className="">
                          {page.title}
                        </Link>
                        <p className="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-2">
                          We are currently making changes to how testing data are reported, which means that the data
                          testing data for Wales and Scotland are not visible. We hope to resolve this by next week.
                        </p>
                        <Details label="Additional details">
                          <h3 className="govuk-heading-s">Affected metrics</h3>
                          <ul className="govuk-list govuk-list--bullet">
                            <li>Cumulative cases by specimen date</li>
                            <li>Cumulative cases by specimen date rate</li>
                          </ul>
                        </Details>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
        <nav className="govuk-pagination" role="navigation" aria-label="results">
          <ul className="govuk-pagination__list">
            <li className="govuk-pagination__item govuk-pagination__item--current">
              <a className="govuk-link govuk-pagination__link" href="#" aria-label="Page 1" aria-current="page">
                1
              </a>
            </li>
            <li className="govuk-pagination__item">
              <a className="govuk-link govuk-pagination__link" href="#" aria-label="Page 2">
                2
              </a>
            </li>
            <li className="govuk-pagination__item">
              <a className="govuk-link govuk-pagination__link" href="#" aria-label="Page 3">
                3
              </a>
            </li>
          </ul>
          <div className="govuk-pagination__next">
            <a className="govuk-link govuk-pagination__link" href="#" rel="next">
              {' '}
              <span className="govuk-pagination__link-title">Next</span>{' '}
              <svg
                className="govuk-pagination__icon govuk-pagination__icon--next"
                xmlns="http://www.w3.org/2000/svg"
                height="13"
                width="15"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 15 13"
              >
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </View>
    )
  }

  return null
}
