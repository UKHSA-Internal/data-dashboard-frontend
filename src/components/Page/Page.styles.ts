import { BODY_SIZES, SPACING } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { H1 } from 'govuk-react'
import styled from 'styled-components'

export const Container = styled.div``

export const LastUpdated = styled.div`
  ${typography.font({ size: BODY_SIZES.SMALL })}
`

export const Heading = styled(H1)`
  margin: ${SPACING.SCALE_4} 0;
`
