import { redirect } from 'next/navigation'

import { getServerTranslation } from '@/app/i18n'
import { auth, signOut } from '@/auth'
import { logger } from '@/lib/logger'

export default async function UserSignOut() {
  let session
  try {
    session = await auth()
  } catch (error) {
    logger.error('Auth error:', error)
    return <></>
  }

  const getAuthApiBaseUrl = `${process.env.AUTH_DOMAIN ?? ''}`

  if (!session) return <></>

  const { t } = await getServerTranslation('auth')

  return (
    <form
      className="inline-flex items-center gap-3"
      action={async () => {
        'use server'
        try {
          await signOut({ redirect: false })
          const cognitoLogoutUrl = new URL(`${getAuthApiBaseUrl}/logout`)
          cognitoLogoutUrl.searchParams.set('client_id', process.env.AUTH_CLIENT_ID!)
          cognitoLogoutUrl.searchParams.set('logout_uri', process.env.NEXTAUTH_URL)
          redirect(cognitoLogoutUrl.toString())
        } catch (error) {
          logger.error(error)
          redirect(process.env.NEXTAUTH_URL)
        }
      }}
    >
      <button className="govuk-button mb-0" type="submit">
        {t('signOutButton')}
      </button>
    </form>
  )
}
