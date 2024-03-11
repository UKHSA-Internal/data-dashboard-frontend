import { Metadata } from 'next'
import Link from 'next/link'

import { View } from '@/app/components/ui/ukhsa'

export const metadata: Metadata = {
  title: 'Feedback | UKHSA data dashboard',
}

export default function Feedback({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
  const hasServerError = searchParams && !!searchParams.error

  return (
    <View heading="UKHSA data dashboard feedback">
      <div className="govuk-grid-row">
        <form className="govuk-grid-column-two-thirds" action="/api/feedback" method="POST">
          <div className="govuk-form-group govuk-!-margin-bottom-9">
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
              We will not be able to get in touch with you about your responses so please do not leave any personal
              details, such as your name or email address.
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
            <Link className="govuk-link govuk-link--no-visited-state" href="/">
              Return to home page
            </Link>
          </div>
        </form>
      </div>
    </View>
  )
}
