import { NavigationLink } from '../NavigationLink/NavigationLink'
import { Nav, NavList } from './Navigation.styles'
import { primaryLinksData } from './navigationData'

type NavigationProps = {
  label?: string
  links?: NavigationLink[]
  className?: string
}

const renderPrimaryLink = (props: NavigationLink) => <NavigationLink key={props.url} type="primary" {...props} />

export const Navigation = ({ label = 'Menu', links = primaryLinksData, className }: NavigationProps) => {
  return (
    <Nav aria-label={label} className={className}>
      <NavList>{links.map(renderPrimaryLink)}</NavList>
    </Nav>
  )
}
