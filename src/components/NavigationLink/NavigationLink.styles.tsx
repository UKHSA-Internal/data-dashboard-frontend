import { BODY_SIZES, FONT_WEIGHTS } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { Link } from 'govuk-react'
import { BLUE } from 'govuk-colours'
import styled from 'styled-components'
import { COLOURS } from '@/styles/Theme'

export const NavItem = styled('li')`
  list-style-type: none;
`

type NavLinkProps = {
  type: 'primary' | 'secondary'
  'aria-current': string | undefined
}

export const NavLink = styled(Link)<NavLinkProps>`
  display: block;
  text-decoration: none;
  padding: 12px 16px;
  ${typography.font({ size: BODY_SIZES.MEDIUM })}

  &:hover {
    color: ${COLOURS.BLUE_DARK};
    text-decoration: underline;
  }
  &:visited:not(:hover) {
    color: ${BLUE};
  }

  ${(p: NavLinkProps) => (p.type == 'primary' ? `font-weight: ${FONT_WEIGHTS.bold};` : '')}

  ${(p: NavLinkProps) =>
    p['aria-current'] == 'page'
      ? `
        text-decoration: underline;
        color: ${COLOURS.BLUE_DARK};
        &:visited:not(:hover) {
          color: ${COLOURS.BLUE_DARK};
        }
      `
      : ''}
`
