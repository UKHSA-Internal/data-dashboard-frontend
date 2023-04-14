import { H2, ListItem as GovUKListItem, Link } from 'govuk-react'
import styled from 'styled-components'
import { BODY_SIZES, FONT_WEIGHTS, SPACING } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { COLOURS } from '@/styles/Theme'
import { BLUE, BLACK } from 'govuk-colours'

export const Nav = styled.nav({
  marginBottom: SPACING.SCALE_5,
})

export const NavHeading = styled(H2)({
  ...typography.font({ size: BODY_SIZES.MEDIUM }),
  fontWeight: FONT_WEIGHTS.regular,
  marginBottom: SPACING.SCALE_1,
})

export const SetionHeadingLink = styled(Link)({
  display: 'inline-block',
  textDecoration: 'none',
  fontWeight: FONT_WEIGHTS.bold,
  color: BLUE,
  marginBottom: SPACING.SCALE_3,
  'a:hover': {
    color: COLOURS.BLUE_DARK,
    textDecoration: 'underline',
  },
  'a:visited:not(:hover)': {
    color: BLUE,
  },
})

export const SectionHeading = styled(H2)({
  marginBottom: 0,
  color: BLUE,
  '&:not(:first-of-type)': {
    marginTop: SPACING.SCALE_3,
  },
  'a:focus &': {
    color: BLACK,
  },
})

export const ListItem = styled(GovUKListItem)({
  paddingLeft: SPACING.SCALE_5,
  position: 'relative',
  listStyleType: 'none',
  background: `url("data:image/svg+xml,%3Csvg class='nhsuk-icon nhsuk-icon__emdash' xmlns='http://www.w3.org/2000/svg' fill='%23aeb7bd' width='19' height='1' aria-hidden='true'%3E%3Cpath d='M0 0h19v1H0z'%3E%3C/path%3E%3C/svg%3E") left .75rem no-repeat;`,
  ...typography.font({ size: BODY_SIZES.MEDIUM }),
})

export const Section = styled.section({
  marginBottom: SPACING.SCALE_6,
})
