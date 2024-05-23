import { flag } from '@unleash/nextjs'

import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import HealthAlertsLink from '@/app/components/ui/ukhsa/Links/HealthAlertsLink/HealthAlertsLink'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import { ListItemArrow, ListItemArrowLink, ListItemArrowParagraph } from '@/app/components/ui/ukhsa/List/ListItemArrow'
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
  const { title, body, adverseWeatherAlerts, relatedLinks } = {
    title: 'Adverse Weather',
    body: 'Summary of weather health alerts data in England. For more detailed data, go to the individual event pages. The Weather-Health Alerting System is provided by the UK Health Security Agency (UKHSA) in partnership with the Met Office.',
    adverseWeatherAlerts: [
      {
        id: 0,
        name: 'Cold weather-health alerts',
        link: '/adverse-weather/cold-health-alerts',
        body: 'Check your risk of cold alerts, view latest messages and updates',
      },
      {
        id: 1,
        name: 'Heat weather-health alerts',
        link: '/adverse-weather/heat-health-alerts',
        body: 'Check your risk of heat alerts, view latest messages and updates',
      },
    ],
    relatedLinks: [
      { title: 'Adverse weather help', url: '/', id: 0 },
      { title: 'What to do in adverse weather', url: '/', id: 1 },
    ],
  }

  return (
    <View
      heading={title}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Adverse Weather', link: '/adverse-weather' },
      ]}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <div className="govuk-body">{body}</div>
        </div>
      </div>

      <HealthAlertsLink className="govuk-!-margin-top-1 govuk-!-margin-bottom-1" />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds-from-desktop">
          <div className="govuk-body">
            <hr
              className="govuk-section-break govuk-section-break--l govuk-section-break--visible"
              role="presentation"
            />

            <List>
              {adverseWeatherAlerts.map(({ id, name, link, body }) => (
                <ListItem key={id} spacing="l">
                  <ListItemArrow>
                    <ListItemArrowLink href={link}>{name}</ListItemArrowLink>
                    <ListItemArrowParagraph>{body}</ListItemArrowParagraph>
                  </ListItemArrow>
                </ListItem>
              ))}
            </List>
          </div>
        </div>

        <div className="govuk-grid-column-one-third-from-desktop govuk-!-margin-top-6 sticky top-2">
          <RelatedLinks variant="sidebar">
            {relatedLinks.map(({ title, url, id }) => (
              <RelatedLink key={id} title={title} url={url} />
            ))}
          </RelatedLinks>
        </div>
      </div>
    </View>
  )
}
