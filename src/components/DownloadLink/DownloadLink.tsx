import { ReactNode } from 'react'
import { Link, TextWrapper } from './DownloadLink.styles'
import { BLACK } from 'govuk-colours'
import { COLOURS } from '@/styles/Theme'
import { Button } from 'govuk-react'

interface DownloadLinkProps {
  href: string
  children: ReactNode
}

export const DownloadLink = ({ href, children }: DownloadLinkProps) => {
  return (
    <Button
      as={Link}
      href={href}
      buttonColour={COLOURS.BUTTON_GREY}
      buttonTextColour={BLACK}
      buttonShadowColour={BLACK}
      style={{ maxWidth: '105px' }}
    >
      <TextWrapper>{children}</TextWrapper>
    </Button>
  )
}
