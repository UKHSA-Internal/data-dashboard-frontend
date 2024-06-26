'use client'

import clsx from 'clsx'
import { useWindowScroll } from 'react-use'

interface BackToTopProps {
  label: string
  href?: string
  className?: string
}

export const BackToTop = ({ label, href = '#main-content', className }: BackToTopProps) => {
  const { y } = useWindowScroll()

  return (
    <a
      href={href}
      className={clsx(
        className,
        'govuk-link--no-visited-state govuk-!-padding-1 govuk-!-padding-right-2 bottom-3 inline-flex items-center print:hidden [&:not(:focus)]:bg-white',
        {
          'xl:sticky': y > 200,
        }
      )}
      onClick={(event) => {
        event.preventDefault()
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }}
    >
      <div
        className="govuk-!-margin-right-2 size-[16px] bg-back_to_top bg-center bg-no-repeat"
        aria-hidden
        data-testid="up-arrow"
      />
      {label}
    </a>
  )
}
