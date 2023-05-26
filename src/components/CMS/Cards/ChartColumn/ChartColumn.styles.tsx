import { Paragraph } from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { chartDownloadButtonWidth } from '@/styles/Theme'

export const SecondaryText = styled(Paragraph)`
  margin-top: ${SPACING.SCALE_2};
  max-width: calc(100% - ${chartDownloadButtonWidth});
`
