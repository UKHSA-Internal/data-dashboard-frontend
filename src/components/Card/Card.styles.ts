import styled from 'styled-components'
import { GREY_3, BLACK, GREY_1 } from 'govuk-colours'
import { SPACING, BODY_SIZES, FONT_WEIGHTS, MEDIA_QUERIES, BREAKPOINTS } from '@govuk-react/constants'
import { typography } from '@govuk-react/lib'
import { GridCol, GridRow, H3 } from 'govuk-react'

type ContainerProps = {
  theme?: 'primary' | 'secondary'
  columnLimit: boolean
}

type ColumnHeadingProps = {
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
  display: grid;
  grid-row-gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

  @media (max-width: ${BREAKPOINTS.DESKTOP}) and (min-width: 440px) {
    grid-template-columns: ${(p: ContainerProps) =>
      p.columnLimit ? 'repeat(3, 1fr)' : 'repeat(auto-fit, minmax(100px, 1fr))'};
  }
`

export const CardColumnHeadingContainer = styled.div`
  ${[MEDIA_QUERIES.TABLET]} {
    display: flex;
    justify-content: space-between;
  }
`

export const CardColumnHeading = styled(H3)<ColumnHeadingProps>`
  ${typography.font({ size: BODY_SIZES.MEDIUM })};
  font-weight: ${(p: ColumnHeadingProps) => (p.theme == 'secondary' ? FONT_WEIGHTS.bold : FONT_WEIGHTS.regular)};
  color: ${(p: ColumnHeadingProps) => (p.theme == 'secondary' ? BLACK : GREY_1)};
  margin-bottom: ${(p: ColumnHeadingProps) => (p.theme == 'secondary' ? '10px' : 0)};
`

export const CardColumnGridCol = styled(GridCol)`
  &:not(:last-child) {
    margin-bottom: ${SPACING.SCALE_4};
    ${[MEDIA_QUERIES.TABLET]} {
      margin-bottom: 0;
    }
  }
`
