import { useRouter } from 'next/router'

import { NavItem, NavLink } from './NavigationLink.styles'

export type NavigationLink = { title: string; url: string }

type NavigationLinkProps = NavigationLink & {
  type: 'primary' | 'secondary'
  isActive?: boolean
}

export const NavigationLink = ({ title, url, type }: NavigationLinkProps) => {
  const router = useRouter()
  const isActive = router.asPath === url

  return (
    <NavItem key={url}>
      <NavLink href={url} type={type} aria-current={isActive ? 'page' : undefined}>
        {title}
      </NavLink>
    </NavItem>
  )
}
