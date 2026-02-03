import React, { FC } from 'react'

import { clsx } from '@/lib/clsx'

interface ClassificationBannerProps {
  size: 'large' | 'medium' | 'small' | 'unknown' | ''
}
const ClassificationBanner: FC<ClassificationBannerProps> = ({ size }) => {
  return (
    <div className="bg-[#1D70B8]">
      <p
        className={clsx('govuk-width-container font-sans font-bold uppercase text-white', {
          'text-[27px] mt-[4px] py-2': size === 'large',
          'text-[18px]': size === 'medium',
        })}
      >
        Official-Sensitive
      </p>
    </div>
  )
}
export default ClassificationBanner
