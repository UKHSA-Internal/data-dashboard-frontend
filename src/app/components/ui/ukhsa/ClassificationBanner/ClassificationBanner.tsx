import React, { FC } from 'react'

import { clsx } from '@/lib/clsx'

interface ClassificationBannerProps {
  size: 'large' | 'medium' | 'small' | 'unknown' | ''
}
const ClassificationBanner: FC<ClassificationBannerProps> = ({ size }) => {
  return (
    <div className="bg-[#1D70B8]">
      <p
        className={clsx('font-sans font-bold uppercase text-white', {
          'govuk-width-container text-[27px] mt-[4px] py-2': size === 'large',
          'py-1 !pl-[12px] text-[18px]': size === 'medium',
        })}
      >
        Official-Sensitive
      </p>
    </div>
  )
}
export default ClassificationBanner
