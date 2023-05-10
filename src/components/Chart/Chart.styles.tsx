import styled from 'styled-components'
import { SPACING, BREAKPOINTS } from '@govuk-react/constants'
import { Details } from 'govuk-react'

export const Container = styled.div``

export const ChartContainer = styled.div`
  min-width: ${BREAKPOINTS.MOBILE};
  width: 100%;
  height: 220px;
  position: relative;
  margin-top: ${SPACING.SCALE_4};
  margin-bottom: ${SPACING.SCALE_2};
`

export const TabularData = styled(Details)`
  margin-bottom: 0;
`
