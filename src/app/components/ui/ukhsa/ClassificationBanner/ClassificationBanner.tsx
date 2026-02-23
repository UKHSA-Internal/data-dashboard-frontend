import React, { FC } from 'react'

import { clsx } from '@/lib/clsx'

type Level = 'official' | 'official_sensitive' | 'pm_not_set' | 'secret' | 'top_secret'

interface ClassificationBannerProps {
  size: 'large' | 'medium' | 'small' | 'unknown' | ''
  level: Level
}

const levelColors: Record<Level, string> = {
  official: 'bg-[#2B71C7]',
  official_sensitive: 'bg-[#2B71C7]',
  pm_not_set: 'bg-[#616161]',
  secret: 'bg-[#F39C2C]',
  top_secret: 'bg-[#AA0000]',
}

const levelContent: Record<Level, string> = {
  official: 'Official',
  official_sensitive: 'Official-Sensitive',
  pm_not_set: 'Protective marking not set',
  secret: 'Secret',
  top_secret: 'Top Secret',
}

const ClassificationBanner: FC<ClassificationBannerProps> = ({ size, level }) => {
  return (
    <div className={clsx(levelColors[level])}>
      <p
        className={clsx('font-sans font-bold uppercase text-white', {
          'govuk-width-container text-[27px] mt-[4px] py-2': size === 'large',
          'py-1 !pl-[12px] text-[18px]': size === 'medium',
        })}
      >
        {levelContent[level]}
      </p>
    </div>
  )
}
export default ClassificationBanner
