import { FONT_WEIGHTS, SPACING } from '@govuk-react/constants'
import { Link, RelatedItems } from 'govuk-react'
import styled from 'styled-components'

export const Container = styled(RelatedItems)`
  margin-top: ${SPACING.SCALE_2};
  padding: ${SPACING.SCALE_3};
  padding-top: ${SPACING.SCALE_2};
  box-sizing: border-box;
`

export const BoldExternalLink = styled(Link)`
  font-weight: ${FONT_WEIGHTS.bold};
`
