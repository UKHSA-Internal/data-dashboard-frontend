import { SPACING } from '@govuk-react/constants'
import styled from 'styled-components'

export const Container = styled.div`
  &:not(:first-of-type) {
    margin-top: ${SPACING.SCALE_3};
  }
`
