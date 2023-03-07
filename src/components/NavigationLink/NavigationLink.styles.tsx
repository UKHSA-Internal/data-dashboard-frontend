import { BODY_SIZES, FONT_WEIGHTS } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { Link } from 'govuk-react'

import styled, { css } from 'styled-components'

export const NavItem = styled.li`
  list-style-type: none;
`

export const NavLink = styled(Link)`
  padding: 12px 16px;
  text-decoration: none;
  ${typography.font({ size: BODY_SIZES.SMALL })}

  &:hover {
    text-decoration: underline;
  }

  ${(props) =>
    props.type === 'primary' &&
    css`
      ${typography.font({ size: BODY_SIZES.MEDIUM })}
      font-weight: ${FONT_WEIGHTS.bold};
    `}

  ${(props) =>
    props['aria-current'] === 'page' &&
    css`
      text-decoration: underline;
    `}
`
