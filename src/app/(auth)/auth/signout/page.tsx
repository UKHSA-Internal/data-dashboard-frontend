import { getServerTranslation } from '@/app/i18n'
import { signOut } from '@/auth'

export default async function Page() {
  const { t } = await getServerTranslation('auth')
  return (
    <>
      <h1 className="govuk-heading-xl govuk-!-margin-top-2 govuk-!-margin-bottom-4">
        Sign out of the UKHSA data dashboard
      </h1>
      <p>Are you sure you want to sign out?</p>
      <form
        className="inline-flex items-center gap-3"
        action={async () => {
          'use server'
          await signOut({ redirect: false })
        }}
      >
        <button className="govuk-button mb-0" type="submit">
          {t('signOutButton')}
        </button>
      </form>
    </>
  )
}
