import { redirect } from 'next/navigation'

import { View } from '@/app/components/ui/ukhsa'
import UserSignIn from '@/app/components/ui/ukhsa/UserSignIn/UserSignIn'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { auth } from '@/auth'

export default async function StartPage({ searchParams: { logout } }: PageComponentBaseProps<{ logout?: 'success' }>) {
  const session = await auth()

  if (session) redirect('/acknowledgements')

  const { t } = await getServerTranslation('auth')

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
                  {t('startPage.signOutBannerTitle')}
                </h2>
              </div>
              <div className="govuk-notification-banner__content">
                <h3 className="govuk-notification-banner__heading">{t('startPage.signOutBannerHeading')}</h3>
                <p className="govuk-body">{t('startPage.signOutBannerDescription')}</p>
              </div>
            </div>
          ) : null}
          <Heading heading={t('startPage.heading')} />
          <p>{t('startPage.intro')}</p>
          <p>{t('startPage.accessInfo')}</p>
          <p>
            <strong>{t('startPage.howToAccess')}</strong>
          </p>
          <ul className="govuk-list govuk-list--bullet">
            <li>{t('startPage.steps.signIn')}</li>
            <li>{t('startPage.steps.contactAdmin')}</li>
          </ul>
          <UserSignIn />
        </div>
      </div>
    </View>
  )
}
