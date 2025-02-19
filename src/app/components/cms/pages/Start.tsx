import { redirect } from 'next/navigation'

import { View } from '@/app/components/ui/ukhsa'
import UserSignIn from '@/app/components/ui/ukhsa/UserSignIn/UserSignIn'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { PageComponentBaseProps } from '@/app/types'
import { auth } from '@/auth'

export default async function StartPage({ searchParams: { logout } }: PageComponentBaseProps<{ logout?: 'success' }>) {
  const session = await auth()

  if (session) redirect('/')

  return (
    <View>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          {logout === 'success' ? (
            <div
              className="govuk-notification-banner govuk-notification-banner--success"
              role="alert"
              aria-labelledby="govuk-notification-banner-title"
            >
              <div className="govuk-notification-banner__header">
                <h2 className="govuk-notification-banner__title" id="govuk-notification-banner-title">
                  Success
                </h2>
              </div>
              <div className="govuk-notification-banner__content">
                <h3 className="govuk-notification-banner__heading">You&apos;ve been signed out</h3>
                <p className="govuk-body">
                  You have successfully signed out of the UKHSA Data Dashboard. If you need to access the data again,
                  please sign in.
                </p>
              </div>
            </div>
          ) : null}
          <Heading heading="Sign in to the UKHSA data dashboard" />
          <p>The UKHSA Data Dashboard provides secure access to critical public health data and insights.</p>
          <p>To view restricted datasets and reports, you need to sign in with an approved account.</p>
          <p>
            <strong>How to Access:</strong>
          </p>
          <ul className="govuk-list govuk-list--bullet">
            <li>Click the button below to sign in using your credentials.</li>
            <li>If you don&apos;t have access but believe you should, please contact your administrator.</li>
          </ul>
          <UserSignIn />
        </div>
      </div>
    </View>
  )
}
