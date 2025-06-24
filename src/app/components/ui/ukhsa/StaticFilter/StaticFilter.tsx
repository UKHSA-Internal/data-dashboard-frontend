'use client'

import clsx from 'clsx';
import React, { ReactNode, useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use';

interface StaticFilterProps {
  href?: string
  className?: string
  children?: ReactNode
}

export function StaticFilter({href = '#filter', className, children}: StaticFilterProps) {
  const { y } = useWindowScroll()

  const [isSticky, setIsSticky] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (y > 200) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }, [y])
  
  return (
    <>
      <div className="govuk-!-padding-3 bg-grey-3">
          {children}
      </div>
      <a
        href={href}
        className={clsx(
          className,
          'govuk-link--no-visited-state govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 sticky bottom-3 float-right inline-flex items-center border-[3px] border-grey-2 bg-grey-2 text-black no-underline shadow-none outline-[3px] outline-yellow focus:border-black',
          {
            // 'sticky': isSticky,
            // 'hidden': !isSticky,
          }
        )}
        onClick={() => {
          setIsVisible(prevState => !prevState)
        }}
      >
        {isVisible ? 'Hide filters': 'Show filters'} 
      </a>
    </>
    
  )
}

export default StaticFilter