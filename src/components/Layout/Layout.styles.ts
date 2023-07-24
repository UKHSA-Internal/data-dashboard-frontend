import { FONT_WEIGHTS, MEDIA_QUERIES, SPACING } from '@govuk-react/constants'
import { BLACK } from 'govuk-colours'
import * as Govuk from 'govuk-react'
import styled from 'styled-components'

import { COLOURS } from '@/styles/Theme'

// Hack to override govuk-react width container until we fully deprecate this library
export const TopNav = styled(Govuk.TopNav)`
  && {
    > div,
    + div {
      ${[MEDIA_QUERIES.TABLET]} {
        max-width: var(--ukhsa-page-width);
      }
    }
  }
`

export const TopNavLink = styled(Govuk.Link)`
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
