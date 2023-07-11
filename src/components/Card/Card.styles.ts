import { BODY_SIZES, FONT_WEIGHTS, MEDIA_QUERIES, SPACING } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { GridCol, GridRow, H3 } from 'govuk-react'
import styled from 'styled-components'

type ContainerProps = {
  $theme?: 'primary' | 'secondary'
}

export const CardContainer = styled(GridRow)`
  border: 1px #f3f2f1 solid;
  width: 100%;
  margin: 0 auto;
  background-color: ${(props: ContainerProps) => (props.$theme === 'secondary' ? 'transparent' : '#f8f8f8')};
  padding-top: ${SPACING.SCALE_3};
  padding-bottom: ${SPACING.SCALE_3};
  margin-bottom: ${SPACING.SCALE_5};
  ${typography.font({ size: BODY_SIZES.MEDIUM })};
  display: grid;
  /* grid-row-gap: 25px; */
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`

export const CardColumnHeadingContainer = styled.div`
  ${[MEDIA_QUERIES.TABLET]} {
    display: flex;
    justify-content: space-between;
  }
`

export const CardColumnHeading = styled(H3)<ContainerProps>`
  ${typography.font({ size: BODY_SIZES.MEDIUM })};
  color: #484e51;
  font-weight: ${(props: ContainerProps) => (props.$theme === 'secondary' ? FONT_WEIGHTS.bold : FONT_WEIGHTS.regular)};
  margin-bottom: ${(props: ContainerProps) => (props.$theme === 'secondary' ? '10px' : 0)};
`

export const CardColumnGridCol = styled(GridCol)`
  &:not(:last-child) {
    margin-bottom: ${SPACING.SCALE_4};
    ${[MEDIA_QUERIES.TABLET]} {
      margin-bottom: 0;
    }
  }
`
