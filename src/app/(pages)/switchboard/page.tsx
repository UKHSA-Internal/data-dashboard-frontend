import Link from 'next/link'

import { View } from '@/app/components/ui/ukhsa'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import { ListItemArrow, ListItemArrowLink } from '@/app/components/ui/ukhsa/List/ListItemArrow'
import { Description } from '@/app/components/ui/ukhsa/View/Description/Description'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'

import { heading, wellKnownEnvironments } from './shared/constants'

const description =
  'Access critical information for the UKHSA data dashboard frontend, including environment settings, third-party dependencies, and local mock server configurations.'

export default function SwitchBoard() {
  return (
    <View className="govuk-!-margin-top-5">
      <Heading heading={heading} />
      <Description description={description} />
      <div className="govuk-grid-row govuk-!-margin-top-7">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <h2 className="govuk-heading-m">Well-Known Environments</h2>
          <p>
            All well-known environments are deployed together through our CI/CD process whenever changes are merged into
            the main branch. More information about the environments can be found here:{' '}
            <Link href="https://confluence.collab.test-and-trace.nhs.uk/display/DPD/Environments">Environments</Link>
          </p>
          <List className="flex w-full justify-between gap-4">
            {wellKnownEnvironments.map((env) => (
              <ListItem key={env.site} className="w-full" showRule={false}>
                <div
                  rel="noreferrer nofollow noopener"
                  className="govuk-summary-card__title-wrapper govuk-body mb-0 no-underline md:flex md:flex-col"
                >
                  <h3 className="govuk-!-margin-bottom-4 govuk-summary-card__title mt-0 flex w-full items-center justify-between uppercase">
                    {env.name}
                    <Link
                      href={env.site}
                      rel="noreferrer nofollow noopener"
                      className="govuk-body-xs govuk-link--no-visited-state mb-0 no-underline"
                    >
                      <strong>View</strong> <span>&rarr;</span>
                    </Link>
                  </h3>

                  <List>
                    <ListItem spacing="s">
                      <Link
                        href={env.api}
                        rel="noreferrer nofollow noopener"
                        className="govuk-link--no-visited-state no-underline [&>span]:hover:visible"
                      >
                        API <span className="invisible">&rarr;</span>
                      </Link>
                    </ListItem>
                    <ListItem spacing="s">
                      <Link
                        href={env.cms}
                        rel="noreferrer nofollow noopener"
                        className="govuk-link--no-visited-state no-underline [&>span]:hover:visible"
                      >
                        CMS <span className="invisible">&rarr;</span>
                      </Link>
                    </ListItem>
                    <ListItem spacing="s" showRule={false}>
                      <Link
                        href={env.flags}
                        rel="noreferrer nofollow noopener"
                        className="govuk-link--no-visited-state no-underline [&>span]:hover:visible"
                      >
                        Flags <span className="invisible">&rarr;</span>
                      </Link>
                    </ListItem>
                  </List>
                </div>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div className="govuk-grid-row govuk-!-margin-top-7 govuk-!-margin-bottom-5">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <h2 className="govuk-heading-m">Mock server</h2>
          <p>Configure the below endpoints to return response variants or different HTTP status codes.</p>
          <List className="govuk-!-margin-top-6">
            <ListItem spacing="m">
              <ListItemArrow>
                <ListItemArrowLink href={`/switchboard/feature-flags`}>Feature Flags</ListItemArrowLink>
              </ListItemArrow>
            </ListItem>
            <ListItem spacing="m">
              <ListItemArrow>
                <ListItemArrowLink href={`/switchboard/pages`}>Pages</ListItemArrowLink>
              </ListItemArrow>
            </ListItem>
            <ListItem spacing="m">
              <ListItemArrow>
                <ListItemArrowLink href={`/switchboard/menus`}>Menus</ListItemArrowLink>
              </ListItemArrow>
            </ListItem>
            <ListItem spacing="m">
              <ListItemArrow>
                <ListItemArrowLink href={`/switchboard/global-banners`}>Global Banners</ListItemArrowLink>
              </ListItemArrow>
            </ListItem>
            <ListItem spacing="m" showRule={false}>
              <ListItemArrow>
                <ListItemArrowLink href={`/switchboard/weather-health-alerts`}>Weather Health Alerts</ListItemArrowLink>
              </ListItemArrow>
            </ListItem>
          </List>
        </div>
      </div>
    </View>
  )
}
