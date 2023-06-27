import { Link } from 'govuk-react'
import { FONT_WEIGHTS, SPACING } from '@govuk-react/constants'
import styled from 'styled-components'
import { COLOURS } from '@/styles/Theme'
import { BLACK } from 'govuk-colours'

export const TopNavLink = styled(Link)`
  && {
    color: ${COLOURS.WHITE};
    font-weight: ${FONT_WEIGHTS.bold};
    text-decoration: none;
    margin-top: 3px;
    display: inline-block;

    &:hover {
      text-decoration: underline;
    }

    &:focus,
    &:active {
      color: ${BLACK};
      text-decoration: none;
    }

    &:hover,
    &:visited {
      color: ${COLOURS.WHITE};
    }
  }
`

export const Main = styled.main`
  margin-top: ${SPACING.SCALE_4};
`
