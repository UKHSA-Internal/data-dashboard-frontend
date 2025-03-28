import { auth } from '@/auth'

import { Avatar, AvatarFallback } from '../Avatar/Avatar'

export default async function UserAvatar() {
  const session = await auth()

  if (!session) return <></>

  const getInitials = (nameOrEmail: string) => {
    if (!nameOrEmail) return ''

    // If it's a name, extract initials
    if (nameOrEmail.includes(' ')) {
      return nameOrEmail
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    }

    // If it's an email, return the first letter
    return nameOrEmail[0].toUpperCase()
  }

  if (session) {
    const initials = getInitials((session.user?.name || session.user?.email) ?? '')

    return (
      <Avatar id="user-avatar" className="govuk-!-font-size-14 size-6 text-blue">
        <span className="sr-only">&ndash; Logged in as {session.user?.name || session.user?.email}</span>
        <AvatarFallback className="bg-offwhite text-blue" aria-hidden>
          {initials}
        </AvatarFallback>
      </Avatar>
    )
  }

  return <></>
}
