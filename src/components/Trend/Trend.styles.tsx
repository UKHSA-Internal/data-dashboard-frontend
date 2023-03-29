import styled, { css } from 'styled-components'
import { Tag as GovUKTag } from 'govuk-react'
import { typography } from '@govuk-react/lib'
import { BODY_SIZES, FONT_WEIGHTS } from '@govuk-react/constants'

export const Tag = styled(GovUKTag)<{ direction: string; colour: string }>`
  && {
    ${(props) =>
      props.direction === 'up' &&
      props.colour === 'green' &&
      css`
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%23005A30' stroke-width='2' d='M6.864 14.364v-12M7.071 1.707.707 8.071M7.207 2.293l6.364 6.364'/%3E%3Cpath stroke='%23005A30' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E");
      `}

    ${(props) =>
      props.direction === 'up' &&
      props.colour === 'red' &&
      css`
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'%3E%3Cpath stroke='%23AA2A16' stroke-width='2' d='M6.864 14.364v-12M7.071 1.707.707 8.071M7.207 2.293l6.364 6.364'/%3E%3Cpath stroke='%23AA2A16' stroke-width='1.02' d='m6.485.881 2.121 2.122'/%3E%3C/svg%3E");
      `}

    ${(props) =>
      props.direction === 'down' &&
      props.colour === 'red' &&
      css`
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='14' fill='none'%3E%3Cpath stroke='%23AA2A16' stroke-width='2' d='M8 0v12M7.793 12.657l6.364-6.364M7.657 12.071 1.293 5.707'/%3E%3Cpath stroke='%23AA2A16' stroke-width='1.02' d='m8.379 13.483-2.121-2.122'/%3E%3C/svg%3E");
      `}

    ${(props) =>
      props.direction === 'down' &&
      props.colour === 'green' &&
      css`
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='14' fill='none'%3E%3Cpath stroke='%23005A30' stroke-width='2' d='M8 0v12M7.793 12.657l6.364-6.364M7.657 12.071 1.293 5.707'/%3E%3Cpath stroke='%23005A30' stroke-width='1.02' d='m8.379 13.483-2.121-2.122'/%3E%3C/svg%3E");
      `}

    background-repeat: no-repeat;
    padding-left: 26px;
    background-position: 6px center;
    ${typography.font({ size: BODY_SIZES.XSMALL })}
    font-weight: ${FONT_WEIGHTS.bold};
  }
`
