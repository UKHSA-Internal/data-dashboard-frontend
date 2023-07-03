import { GetStaticPropsContext } from 'next'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactNode } from 'react'

import { Page } from '@/components/Page'
import { logger } from '@/lib/logger'

const ContentBlock = ({ heading, children, link }: { heading: string; children: ReactNode; link: ReactNode }) => {
  return (
    <div className="govuk-body govuk-!-margin-top-4">
      <h2 className="govuk-heading-m">{heading}</h2>
      {children}
      {link}
      <hr className="govuk-!-margin-top-6" />
    </div>
  )
}

const StartNowBtn = () => (
  <Link
    href="/choose-topic"
    role="button"
    draggable="false"
    className="govuk-button govuk-button--start"
    data-module="govuk-button"
  >
    Start now
    <svg
      className="govuk-button__start-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="17.5"
      height="19"
      viewBox="0 0 33 40"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
    </svg>
  </Link>
)

export default function Home() {
  return (
    <Page
      heading="UKHSA data dashboard"
      seoTitle="UKHSA data dashboard"
      seoDescription="The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses."
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds-from-desktop">
          <p>
            The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data
            for respiratory viruses.
          </p>
          <p>You can use this service to:</p>
          <ul className="govuk-body govuk-!-padding-left-7 govuk-!-margin-bottom-6">
            <li>get an overall summary of a public health threat</li>
            <li>see trends and patterns in health data</li>
            <li>find out information on a specific data metric</li>
            <li>download data using the API.</li>
          </ul>

          <StartNowBtn />

          <ContentBlock heading="Explore location based data" link={<Link href="/maps">Go to maps</Link>}>
            <p>The UKHSA data dashboard shows data collected across different geographical regions.</p>
          </ContentBlock>

          {/* <ContentBlock heading="Understand the data" link={<Link href="/maps">Search metrics</Link>}>
            <p>
              Find information on the rationale, methodology, data source and more for metrics across the dashboard.
            </p>
          </ContentBlock> */}

          <ContentBlock heading="Use the API" link={<Link href="/how-to-use-this-data">Go to API</Link>}>
            <p>Search and download data by using the UKHSA data dashboard&apos;s API.</p>
          </ContentBlock>

          <ContentBlock
            heading="About the dashboard"
            link={<Link href="/about">Find out more about the dashboard</Link>}
          >
            <p>
              The UKHSA data dashboard presents public health data in the UK. It&apos;s produced by the{' '}
              <a
                href="https://www.gov.uk/government/organisations/uk-health-security-agency"
                rel="external"
                target="_blank"
              >
                UK Health Security Agency (Opens in a new window).
              </a>
            </p>
            <p>
              The UKHSA is committed to informing the public of current health data in an accessible and transparent
              way. Initially, the UKHSA data dashboard is focused on respiratory viruses, such as coronavirus
              (COVID-19). In the future, the dashboard will present a wide range of health topics.
            </p>
          </ContentBlock>

          <ContentBlock heading="What's new" link={<Link href="/whats-new">Get updates</Link>}>
            <p>The UKHSA data dashboard is regularly updated with new data and features. View a timeline of changes.</p>
          </ContentBlock>
        </div>
      </div>
    </Page>
  )
}

export const getStaticProps = async (req: GetStaticPropsContext) => {
  try {
    return {
      props: {
        ...(await serverSideTranslations(req.locale as string, ['common'])),
      },
    }
  } catch (error) {
    logger.error(error)
    throw new Error(`Failed to fetch homepage: ${error}`)
  }
}
