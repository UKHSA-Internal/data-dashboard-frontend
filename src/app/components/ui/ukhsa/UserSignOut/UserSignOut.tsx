import { getServerTranslation } from '@/app/i18n'
import { auth, signOut } from '@/auth'
import { authSignOutRedirectionPath } from '@/config/constants'

export default async function UserSignOut() {
  const session = await auth()

  if (!session) return <></>

  const { t } = await getServerTranslation('auth')

  return (
    <form
      className="inline-flex items-center gap-3"
      action={async () => {
        'use server'
        await signOut({ redirectTo: authSignOutRedirectionPath })
      }}
    >
      <button className="govuk-button mb-0" type="submit">
        {t('signOutButton')}
      </button>
    </form>
  )
}
