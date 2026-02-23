import React, { FC } from 'react'

import { clsx } from '@/lib/clsx'

type Level = 'Blue' | 'Gray' | 'Amber' | 'Red'

interface ClassificationBannerProps {
  size: 'large' | 'medium' | 'small' | 'unknown' | ''
  level: Level
}

const levelColors: Record<Level, string> = {
  Blue: 'bg-[#2B71C7]',
  Gray: 'bg-[#616161]',
  Amber: 'bg-[#F39C2C]',
  Red: 'bg-[#AA0000]',
}

const Content: Record<Level, string> = {
  Blue: 'Official-Sensitive',
  Gray: 'Protective marking not set',
  Amber: 'Secret',
  Red: 'Top Secret',
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
        {Content[level]}
      </p>
    </div>
  )
}
export default ClassificationBanner
