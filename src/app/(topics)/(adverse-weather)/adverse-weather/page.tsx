import { flag } from '@unleash/nextjs'

import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'

export async function generateMetadata() {
  const { enabled } = await flag(flags.adverseWeather)

  if (!enabled)
    return {
      title: 'Page not found',
      description: 'Error - Page not found',
    }

  return {
    title: 'Extreme events category page',
    description: 'Extreme events category page description',
  }
}

export default async function AdverseWeather() {
  const { title } = {
    title: 'Adverse Weather',
  }

  return (
    <View heading={title} breadcrumbs={['Home', 'Adverse Weather']}>
      {/* <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href="/">
              Home
            </a>
          </li>
          <li className="govuk-breadcrumbs__list-item">
            <a className="govuk-breadcrumbs__link" href="/">
              Adverse Weather
            </a>
          </li>
        </ol>
      </div> */}

      {/* Map through extreme events array, pass values into new components */}
      <div>
        <h2>Cold weather-health alerts</h2>
        <p>Check your risk of cold alerts, view latest messages and updates</p>
      </div>
      <div>
        <h2>Heat weather-health alerts</h2>
        <p>Check your risk of heat alerts, view latest messages and updates</p>
      </div>

      {/* Map through related links */}
      <RelatedLinks variant="sidebar">
        <RelatedLink title="" url="/" />
        <RelatedLink title="" url="/" />
      </RelatedLinks>
    </View>
  )
}
