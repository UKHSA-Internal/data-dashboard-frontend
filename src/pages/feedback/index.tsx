import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'

import { Layout } from '@/components/Layout'

const Feedback = () => {
  const { t } = useTranslation('common')
  const { query } = useRouter()

  const hasServerError = !!query.error

  return (
    <div className="govuk-grid-row">
      <form className="govuk-grid-column-two-thirds" action="/api/feedback" method="POST">
        <div className="govuk-form-group govuk-!-margin-bottom-9">
          <h1 className="govuk-heading-xl">UKHSA data dashboard feedback</h1>
          {hasServerError && (
            <div className="govuk-error-summary" data-module="govuk-error-summary">
              <div role="alert">
                <h2 className="govuk-error-summary__title">There is a problem</h2>
                <div className="govuk-error-summary__body">
                  <ul className="govuk-list govuk-error-summary__list">
                    <li>There was a problem processing the request. Please try again later.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <h2 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--m" htmlFor="reason">
              What was your reason for visiting the dashboard today?
            </label>
          </h2>
          <div id="more-detail-hint" className="govuk-hint">
            Do not include personal information like your name, contact information or credit card details.
          </div>
          <textarea className="govuk-textarea" name="reason" id="reason" rows={5} />
        </div>
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-9">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Did you find everything you were looking for?</h2>
          </legend>
          <div className="govuk-radios" data-module="govuk-radios">
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id="did_you_find_everything"
                name="did_you_find_everything"
                type="radio"
                value="yes"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="did_you_find_everything">
                Yes
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id="did_you_find_everything_2"
                name="did_you_find_everything"
                type="radio"
                value="no"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="did_you_find_everything_2">
                No
              </label>
            </div>
          </div>
        </fieldset>

        <div className="govuk-form-group govuk-!-margin-bottom-9">
          <h2 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--m" htmlFor="improve_experience">
              How could we improve your experience with the dashboard?
            </label>
          </h2>
          <textarea className="govuk-textarea" name="improve_experience" id="improve_experience" rows={5} />
        </div>

        <div className="govuk-form-group govuk-!-margin-bottom-9">
          <h2 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--m" htmlFor="like_to_see">
              What would you like to see on the dashboard in the future?
            </label>
          </h2>
          <textarea className="govuk-textarea" name="like_to_see" id="like_to_see" rows={5} />
        </div>

        <div className="govuk-button-group">
          <button className="govuk-button" type="submit">
            Submit
          </button>
          <Link className="govuk-link" href="/">
            {t('returnToHomeBtn')}
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Feedback

Feedback.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async (req) => {
  return {
    props: {
      ...(await serverSideTranslations(req.locale as string, ['common', 'errors'])),
    },
  }
}
