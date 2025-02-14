import { signOut } from '@/api/requests/auth/signOut'
import { auth, signIn } from '@/auth'
import { defaultAuthProvider } from '@/config/constants'

export default async function LoginButton() {
  const session = await auth()

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <form
        action={async () => {
          'use server'
          await signIn(defaultAuthProvider)
        }}
      >
        <button type="submit">Sign in</button>
      </form>
    </>
  )
}
