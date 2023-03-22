import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { Details } from 'govuk-react'

export const Container = styled.div``

export const ChartContainer = styled.div({
  width: '100%',
  height: 220,
  position: 'relative',
  marginTop: SPACING.SCALE_4,
  marginBottom: SPACING.SCALE_2,
})

export const TabularData = styled(Details)`
  margin-bottom: 0;
`
