import { Button } from 'govuk-react'
import { ReactNode } from 'react'
import { Link, TextWrapper } from './Links.styles'
import { BLACK } from 'govuk-colours'
import { COLOURS } from '@/styles/Theme'

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
    >
      <TextWrapper>{children}</TextWrapper>
    </Button>
  )
}
