import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Details } from '@/app/components/ui/govuk'
import { Contents, ContentsItem, RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { renderCard } from '@/app/utils/cms.utils'

export async function generateMetadata({ params: { topic } }: { params: { topic: string } }): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug(topic, PageType.Topic)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function TopicPage({
  params: { topic },
  searchParams,
}: {
  params: { topic: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const {
    title,
    body,
    page_description: description,
    last_published_at: lastUpdated,
    related_links: relatedLinks,
  } = await getPageBySlug(topic, PageType.Topic)

  const { geography = '', geographyType } = searchParams

  return (
    <View heading={title} description={description} lastUpdated={lastUpdated}>
      {/* <Details label="COVID-19 in England">region selector</Details> */}
      <Contents>
        {body.map(({ id, value }) => (
          <ContentsItem key={id} heading={value.heading}>
            <div className="govuk-!-margin-bottom-3">
              <Details label="Filter by Nation, Region or Local Authority">
                <form action="/api/topics/location" method="post">
                  <input type="hidden" name="topic" value={topic} />
                  <input type="hidden" name="category" value={value.heading.toLowerCase()} />
                  <input type="hidden" name="geographyType" value="Nation" />
                  <label className="govuk-label" htmlFor="geography_nation">
                    Nation
                  </label>
                  <select
                    name="geography"
                    id="geography_nation"
                    className="govuk-select"
                    defaultValue={geographyType === 'Nation' ? geography : ''}
                  >
                    <option value="" disabled>
                      Select nation
                    </option>
                    <option value="England">England</option>
                    <option value="Northern Ireland">Northern Ireland</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Wales">Wales</option>
                  </select>
                  <button className="govuk-button govuk-button--secondary govuk-!-margin-left-2">Set location</button>
                </form>
                <form action="/api/topics/location" method="post">
                  <input type="hidden" name="topic" value={topic} />
                  <input type="hidden" name="category" value={value.heading.toLowerCase()} />
                  <input type="hidden" name="geographyType" value="Region" />
                  <label className="govuk-label" htmlFor="geography_region">
                    Region
                  </label>
                  <select
                    name="geography"
                    id="geography_region"
                    className="govuk-select"
                    defaultValue={geographyType === 'Region' ? geography : ''}
                  >
                    <option value="" disabled>
                      Select region
                    </option>
                    <option value="East Midlands">East Midlands</option>
                    <option value="East of England">East of England</option>
                    <option value="London">London</option>
                    <option value="North East">North East</option>
                  </select>
                  <button className="govuk-button govuk-button--secondary govuk-!-margin-left-2">Set region</button>
                </form>
                <form action="/api/topics/location" method="post">
                  <input type="hidden" name="topic" value={topic} />
                  <input type="hidden" name="category" value={value.heading.toLowerCase()} />
                  <input type="hidden" name="geographyType" value="localAuthority" />
                  <label className="govuk-label" htmlFor="geography_local_authority">
                    Local Authority
                  </label>
                  <select
                    name="geography"
                    id="geography_local_authority"
                    className="govuk-select"
                    defaultValue={geographyType === 'localAuthority' ? geography : ''}
                  >
                    <option value="" disabled>
                      Select local authority
                    </option>
                    <option value="Aberdeen City">Aberdeen City</option>
                    <option value="Birmingham">Birmingham</option>
                    <option value="New Forest">New Forest</option>
                    <option value="Watford">Watford</option>
                  </select>
                  <button className="govuk-button govuk-button--secondary govuk-!-margin-left-2">Set region</button>
                </form>
              </Details>
            </div>
            {value.content.map((card) => renderCard(card, searchParams))}
          </ContentsItem>
        ))}
      </Contents>
      {relatedLinks.length && (
        <RelatedLinks>
          {relatedLinks.map(({ title, body, url, id }) => (
            <RelatedLink key={id} url={url} title={title}>
              {body}
            </RelatedLink>
          ))}
        </RelatedLinks>
      )}
    </View>
  )
}
