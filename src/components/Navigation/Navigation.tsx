import { NavigationLink } from '../NavigationLink/NavigationLink'
import { Nav, NavList } from './Navigation.styles'
import { primaryLinksData, secondaryLinksData } from './navigationData'

type NavigationProps = {
  label?: string
  primaryLinks?: NavigationLink[]
  secondaryLinks?: NavigationLink[]
}

const renderPrimaryLink = (props: NavigationLink) => (
  <NavigationLink {...props} type="primary" />
)

const renderSecondaryLink = (props: NavigationLink) => (
  <NavigationLink {...props} type="secondary" />
)

export const Navigation = ({
  label = 'Menu',
  primaryLinks = primaryLinksData,
  secondaryLinks = secondaryLinksData,
}: NavigationProps) => {
  return (
    <Nav aria-label={label}>
      <NavList>{primaryLinks.map(renderPrimaryLink)}</NavList>
      <NavList>{secondaryLinks.map(renderSecondaryLink)}</NavList>
    </Nav>
  )
}
