import { auth } from '@/app/utils/auth.utils'

export default async function LoginButton() {
  const session = await auth()
  console.log('session: ', session)
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <a href="/api/auth/signout">Sign out</a>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <a href="/api/auth/signin">Sign in</a>
    </>
  )
}
