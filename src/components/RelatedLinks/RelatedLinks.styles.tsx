import { RelatedItems } from 'govuk-react'
import styled from 'styled-components'
import { Link } from 'govuk-react'
import { SPACING } from '@govuk-react/constants'

export const Container = styled(RelatedItems)({
  marginTop: SPACING.SCALE_2,
  padding: SPACING.SCALE_3,
  paddingTop: SPACING.SCALE_2,
})

export const BoldExternalLink = styled(Link)`
  font-weight: bolder;
`
