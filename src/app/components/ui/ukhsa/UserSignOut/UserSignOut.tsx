import { redirect } from 'next/navigation'

import { getServerTranslation } from '@/app/i18n'
import { getCognitoSignoutURL } from '@/app/utils/auth.utils'
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

  if (!session) return <></>

  const { t } = await getServerTranslation('auth')

  return (
    <form
      className="inline-flex items-center gap-3"
      action={async () => {
        'use server'
        try {
          await signOut({ redirect: false })
        } catch {
          logger.error('issue calling authJS signout.')
        }
        const cognitoLogoutUrl = getCognitoSignoutURL()
        redirect(cognitoLogoutUrl)
      }}
    >
      <button className="govuk-button mb-0" type="submit">
        {t('signOutButton')}
      </button>
    </form>
  )
}
