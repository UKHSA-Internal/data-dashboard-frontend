import { MEDIA_QUERIES, SPACING } from '@govuk-react/constants'
import styled from 'styled-components'

export const Nav = styled('nav')`
  margin-top: ${SPACING.SCALE_3};
  margin-left: -${SPACING.SCALE_3};
`

export const NavList = styled('ul')`
  display: flex;
  flex-direction: column;
  padding: 0;
  ${MEDIA_QUERIES.TABLET} {
    flex-direction: row;
  }

  &:first-child {
    padding-top: ${SPACING.SCALE_2};
  }

  &:not(:last-child) {
    padding-bottom: ${SPACING.SCALE_2};
  }
`
