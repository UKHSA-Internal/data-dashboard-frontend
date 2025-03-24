import { getServerTranslation } from '@/app/i18n'
import { signIn } from '@/auth'
import { defaultAuthProvider } from '@/config/constants'

export default async function UserSignIn() {
  const { t } = await getServerTranslation('auth')

  return (
    <form
      className="inline-flex items-center gap-3"
      action={async () => {
        'use server'
        await signIn(defaultAuthProvider)
      }}
    >
      <button className="govuk-button govuk-button--start" type="submit">
        {t('signInButton')}
        <svg
          className="govuk-button__start-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          aria-hidden="true"
          focusable="false"
        >
          <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
        </svg>
      </button>
    </form>
  )
}
