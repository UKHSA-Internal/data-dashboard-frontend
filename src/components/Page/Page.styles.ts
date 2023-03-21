import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { H1, Paragraph } from 'govuk-react'

export const Container = styled.div({})

export const LastUpdated = styled(Paragraph)({
  marginBottom: SPACING.SCALE_5,
})

export const Heading = styled(H1)({
  marginBottom: SPACING.SCALE_3,
})
