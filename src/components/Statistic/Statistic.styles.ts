import styled from 'styled-components'
import { BLACK } from 'govuk-colours'
import { BODY_SIZES, FONT_WEIGHTS, SPACING } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'

export const Container = styled.div`
  &:not(:first-of-type) {
    margin-top: ${SPACING.SCALE_3};
  }
`

export const Heading = styled.span`
  display: block;
  ${typography.font({ size: BODY_SIZES.SMALL })};
  font-weight: ${FONT_WEIGHTS.bold};
  color: ${BLACK};
`

export const Value = styled.span`
  ${typography.font({ size: BODY_SIZES.MEDIUM })};
  color: ${BLACK};
`
