import styled from 'styled-components'
import { SPACING, BODY_SIZES } from '@govuk-react/constants'
import { H1 } from 'govuk-react'
import { typography } from '@govuk-react/lib'

export const Container = styled.div({})

export const LastUpdated = styled.div({
  marginBottom: SPACING.SCALE_5,
  ...typography.font({ size: BODY_SIZES.SMALL }),
})

export const Heading = styled(H1)({
  marginBottom: SPACING.SCALE_3,
})
