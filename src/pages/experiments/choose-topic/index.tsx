import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'

import { Layout } from '@/components/Layout'
import { Page } from '@/components/Page'
import { logger } from '@/lib/logger'

export default function Topics() {
  return (
    <Page seoTitle="Which topic are you interested in?" seoDescription="Choose a topic to display on the dashboard.">
      <form method="POST" action="/api/choose-topic">
        <div className="govuk-form-group">
          <fieldset className="govuk-fieldset">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h1 className="govuk-heading-xl govuk-!-margin-top-4 govuk-!-margin-bottom-4">
                Which topic are you interested in?
              </h1>
              <p className="govuk-body govuk-!-margin-bottom-2">Choose a topic to display on the dashboard.</p>
            </legend>
            <div className="govuk-radios" data-module="govuk-radios">
              <div className="govuk-radios__item">
                <input
                  className="govuk-radios__input"
                  name="topic"
                  type="radio"
                  id="coronavirus"
                  value="coronavirus"
                  defaultChecked
                />
                <label className="govuk-label govuk-radios__label" htmlFor="coronavirus">
                  Coronavirus
                </label>
              </div>
              <div className="govuk-radios__item">
                <input className="govuk-radios__input" name="topic" type="radio" id="influenza" value="influenza" />
                <label className="govuk-label govuk-radios__label" htmlFor="influenza">
                  Influenza
                </label>
              </div>
              <div className="govuk-radios__item">
                <input
                  className="govuk-radios__input"
                  name="topic"
                  type="radio"
                  id="other-respiratory-viruses"
                  value="other-respiratory-viruses"
                />
                <label className="govuk-label govuk-radios__label" htmlFor="other-respiratory-viruses">
                  Other respiratory viruses
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <button className="govuk-button">Continue</button>
      </form>
    </Page>
  )
}

Topics.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout scrollToTop={false} backLink="/">
      {page}
    </Layout>
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
  }
}
