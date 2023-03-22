import { SPACING, LINE_HEIGHT, FONT_SIZE } from '@govuk-react/constants'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import styled from 'styled-components'

export const Container = styled(ReactMarkdown)({
  '&&': {
    h2: {
      marginTop: SPACING.SCALE_5,
    },

    h3: {
      marginTop: SPACING.SCALE_4,
    },

    p: {
      margin: 0,
      marginBottom: SPACING.SCALE_4,
      fontSize: FONT_SIZE.SIZE_19,
      lineHeight: LINE_HEIGHT.SIZE_19,
    },
  },
})
