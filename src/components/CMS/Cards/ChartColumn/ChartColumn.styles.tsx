import { Paragraph } from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'
import { chartDownloadButtonWidth } from '@/styles/Theme'

interface SecondaryTextProps {
  fullWidth: boolean
}

export const SecondaryText = styled(Paragraph)<SecondaryTextProps>`
  margin-top: ${SPACING.SCALE_2};
  max-width: ${(props) => (props.fullWidth ? '100%' : `calc(100% - ${chartDownloadButtonWidth})`)};
`
