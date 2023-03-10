import styled from 'styled-components'
import { MEDIA_QUERIES, SPACING } from '@govuk-react/constants'

export const Nav = styled('nav')({
  marginTop: SPACING.SCALE_3,
})

export const NavList = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  [MEDIA_QUERIES.TABLET]: {
    flexDirection: 'row',
  },
  '&:first-child': {
    paddingTop: SPACING.SCALE_2,
  },
  '&:not(:last-child)': {
    paddingBottom: SPACING.SCALE_2,
  },
})
