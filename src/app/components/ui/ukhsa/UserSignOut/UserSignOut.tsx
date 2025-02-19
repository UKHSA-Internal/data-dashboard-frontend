import { signOut } from '@/api/requests/auth/signOut'
import { auth } from '@/auth'

/* @TODO: Tests */
export default async function UserSignOut() {
  const session = await auth()

  if (!session) return null

  return (
    <form
      className="inline-flex items-center gap-3"
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/start?logout=success' })
      }}
    >
      <button className="govuk-button mb-0" type="submit">
        {/* @TODO: i18n */}
        Sign out
      </button>
    </form>
  )
}
