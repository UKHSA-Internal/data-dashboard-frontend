import styled from 'styled-components'
import { GREY_3, BLACK, GREY_1 } from 'govuk-colours'
import { SPACING, BODY_SIZES, FONT_WEIGHTS, MEDIA_QUERIES } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { GridCol, GridRow, H3 } from 'govuk-react'

type ContainerProps = {
  theme?: 'primary' | 'secondary'
}

export const Container = styled(GridRow)`
  width: 100%;
  margin: 0 auto;
  background-color: ${(p: ContainerProps) => (p.theme == 'secondary' ? 'transparent' : GREY_3)};
  padding-top: ${SPACING.SCALE_3};
  padding-bottom: ${SPACING.SCALE_3};
  margin-top: ${SPACING.SCALE_5};
  ${typography.font({ size: BODY_SIZES.MEDIUM })};
`

export const CardColumnHeadingContainer = styled.div`
  ${[MEDIA_QUERIES.TABLET]} {
    display: flex;
    justify-content: space-between;
  }
`

export const CardColumnHeading = styled(H3)<ContainerProps>`
  ${typography.font({ size: BODY_SIZES.MEDIUM })};
  font-weight: ${(p: ContainerProps) => (p.theme == 'secondary' ? FONT_WEIGHTS.bold : FONT_WEIGHTS.regular)};
  color: ${(p: ContainerProps) => (p.theme == 'secondary' ? BLACK : GREY_1)};
  margin-bottom: ${(p: ContainerProps) => (p.theme == 'secondary' ? '10px' : 0)};
`

export const CardColumnGridCol = styled(GridCol)`
  &:not(:last-child) {
    margin-bottom: ${SPACING.SCALE_4};
    ${[MEDIA_QUERIES.TABLET]} {
      margin-bottom: 0;
    }
  }
`
