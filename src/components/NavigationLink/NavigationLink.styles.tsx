import { BODY_SIZES, FONT_WEIGHTS } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { Link } from 'govuk-react'
import { BLUE } from 'govuk-colours'
import styled from 'styled-components'
import { COLOURS } from '@/styles/Theme'

export const NavItem = styled('li')({
  listStyleType: 'none',
})

export const NavLink = styled(Link)(
  {
    display: 'block',
    textDecoration: 'none',
    padding: '12px 16px',
    ...typography.font({ size: BODY_SIZES.MEDIUM }),
    '&:hover': {
      color: COLOURS.BLUE_DARK,
      textDecoration: 'underline',
    },
    '&:visited:not(:hover)': {
      color: BLUE,
    },
  },
  ({ type, 'aria-current': ariaCurrent }) => ({
    ...(type === 'primary' && {
      fontWeight: FONT_WEIGHTS.bold,
    }),
    ...(ariaCurrent === 'page' && {
      textDecoration: 'underline',
      color: COLOURS.BLUE_DARK,
      '&:visited:not(:hover)': {
        color: COLOURS.BLUE_DARK,
      },
    }),
  })
)
