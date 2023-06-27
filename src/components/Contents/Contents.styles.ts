import { H2, ListItem as GovUKListItem, Link } from 'govuk-react'
import styled from 'styled-components'
import { BODY_SIZES, FONT_WEIGHTS, SPACING } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { COLOURS } from '@/styles/Theme'
import { BLUE } from 'govuk-colours'

export const Nav = styled.nav`
  margin-bottom: ${SPACING.SCALE_5};
`

export const NavHeading = styled(H2)`
  ${typography.font({ size: BODY_SIZES.MEDIUM })}
  font-weight: ${FONT_WEIGHTS.regular};
  margin-bottom: ${SPACING.SCALE_1};
`

export const SetionHeadingLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  font-weight: ${FONT_WEIGHTS.bold};
  color: ${BLUE};
  margin-bottom: ${SPACING.SCALE_3};

  a:hover {
    color: ${COLOURS.BLUE_DARK};
    text-decoration: underline;
  }
  a:visited:not(:hover) {
    color: ${BLUE};
  }
`

export const SectionHeading = styled(H2)`
  margin-bottom: 0;
  color: ${BLUE};

  &:not(:first-of-type) {
    margin-top: ${SPACING.SCALE_3};
  }
`

export const ListItem = styled(GovUKListItem)`
  padding-left: ${SPACING.SCALE_5};
  position: relative;
  list-style-type: none;
  background: url("data:image/svg+xml,%3Csvg class='nhsuk-icon nhsuk-icon__emdash' xmlns='http://www.w3.org/2000/svg' fill='%23aeb7bd' width='19' height='1' aria-hidden='true'%3E%3Cpath d='M0 0h19v1H0z'%3E%3C/path%3E%3C/svg%3E")
    left 0.75rem no-repeat;
  ${typography.font({ size: BODY_SIZES.MEDIUM })}
`

export const Section = styled.section`
  margin-bottom: ${SPACING.SCALE_6};
`
