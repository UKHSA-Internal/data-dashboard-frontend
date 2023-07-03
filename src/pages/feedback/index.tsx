import { GetStaticProps } from 'next'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'

import { Layout } from '@/components/Layout'

const Feedback = () => {
  return (
    <div className="govuk-grid-row">
      <form className="govuk-grid-column-two-thirds" action={'/api/feedback'} method="POST">
        <div className="govuk-form-group govuk-!-margin-bottom-9">
          <h1 className="govuk-label-wrapper">UKHSA Dashboard Feedback</h1>
          <h2 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--m" htmlFor="govuk_reason">
              What was your reason for visiting the dashboard today?
            </label>
          </h2>
          <div id="more-detail-hint" className="govuk-hint">
            Do not include personal information like your name, contact information or credit card details.
          </div>
          <textarea className="govuk-textarea" id="govuk_reason" rows={5} />
        </div>
        <fieldset className="govuk-fieldset govuk-!-margin-bottom-9">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 className="govuk-fieldset__heading">Did you find everything you were looking for?</h2>
          </legend>
          <div className="govuk-radios" data-module="govuk-radios">
            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id="did-you-find-everything"
                name="did-you-find-everything"
                type="radio"
                value="yes"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="did-you-find-everything">
                Yes
              </label>
            </div>

            <div className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id="did-you-find-everything-2"
                name="did-you-find-everything"
                type="radio"
                value="no"
              />
              <label className="govuk-label govuk-radios__label" htmlFor="did-you-find-everything-2">
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
          <textarea className="govuk-textarea" id="improve_experience" rows={5} />
        </div>

        <div className="govuk-form-group govuk-!-margin-bottom-9">
          <h2 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--m" htmlFor="like_to_see">
              What would you like to see on the dashboard in the future?
            </label>
          </h2>
          <textarea className="govuk-textarea" id="like_to_see" rows={5} />
        </div>

        <button className="govuk-grid-column-one-half govuk-button" type="submit">
          Submit
        </button>
      </form>
      <Link className="govuk-grid-column-one-half" href="/">
        Return to home page
      </Link>
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
