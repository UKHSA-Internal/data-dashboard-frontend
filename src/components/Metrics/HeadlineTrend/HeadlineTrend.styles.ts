import { BODY_SIZES, FONT_WEIGHTS } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { BLACK } from 'govuk-colours'
import styled from 'styled-components'

export const Heading = styled.span`
  display: block;
  ${typography.font({ size: BODY_SIZES.SMALL })}
  font-weight: ${FONT_WEIGHTS.bold};
  color: ${BLACK};
`
