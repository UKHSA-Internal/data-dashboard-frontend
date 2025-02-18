import { auth } from '@/auth'

import { Avatar, AvatarFallback } from '../Avatar/Avatar'

/* @TODO: Tests */
export default async function UserAvatar() {
  const session = await auth()

  if (!session) return null

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
    return (
      <Avatar className="govuk-!-font-size-14 size-6 text-blue">
        <AvatarFallback className="bg-offwhite text-blue">
          {/* @TODO: Clean up types */}
          {getInitials((session.user?.name || session.user?.email) ?? '')}
        </AvatarFallback>
      </Avatar>
    )
  }
}
