'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'

interface BackToTopProps {
  label: string
  href?: string
}

export const BackToTop = ({ label, href = '#main-content' }: BackToTopProps) => {
  const { y } = useWindowScroll()
  const [hideContent, setHideContent] = useState(false)

  function handleResize() {
    if (window !== undefined) {
      console.log('Resized', window.devicePixelRatio)
      if (window.devicePixelRatio >= 1.5) {
        setHideContent(true)
      } else {
        setHideContent(false)
      }
    }
  }

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleResize)

      handleResize()

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  console.log('hideContent', hideContent)

  return (
    <a
      href={href}
      className={clsx(
        'govuk-link--no-visited-state govuk-!-padding-1 govuk-!-padding-right-2 bottom-3 inline-flex items-center print:hidden [&:not(:focus)]:bg-white',
        {
          sticky: y > 200,
          hidden: hideContent,
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
        className="govuk-!-margin-right-2 h-[16px] w-[16px] bg-back_to_top bg-center bg-no-repeat"
        aria-hidden
        data-testid="up-arrow"
      />
      {label}
    </a>
  )
}
