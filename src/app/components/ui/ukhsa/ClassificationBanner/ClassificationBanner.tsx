import React, { FC } from 'react'

import { clsx } from '@/lib/clsx'

type Level = 'official' | 'official_sensitive' | 'protective_marking_not_set' | 'secret' | 'top_secret'

interface ClassificationBannerProps {
  size: 'large' | 'medium' | 'small' | 'unknown' | ''
  level?: Level
  customContent?: string
  // Optional custom color in hex format (e.g., ''bg-[#2B71C7]', 'bg-[#F39C2C]', etc.)
  customColor?: string
}

const levelColors: Record<Level, string> = {
  official: 'bg-[#2B71C7]',
  official_sensitive: 'bg-[#2B71C7]',
  protective_marking_not_set: 'bg-[#616161]',
  secret: 'bg-[#F39C2C]',
  top_secret: 'bg-[#AA0000]',
}

const levelContent: Record<Level, string> = {
  official: 'Official',
  official_sensitive: 'Official-Sensitive',
  protective_marking_not_set: 'Protective marking not set',
  secret: 'Secret',
  top_secret: 'Top Secret',
}

const ClassificationBanner: FC<ClassificationBannerProps> = ({
  size,
  level = 'official_sensitive',
  customContent,
  customColor,
}) => {
  return (
    <div
      className={clsx('govuk-classification-banner', { [customColor || levelColors[level]]: true })}
      role="note"
      aria-label={`${levelContent[level]} classification`}
    >
      <p
        className={clsx('font-sans font-bold uppercase text-white', {
          'govuk-width-container text-[27px] py-2': size === 'large',
          'py-1 !pl-[12px] text-[18px]': size === 'medium',
        })}
      >
        {customContent || levelContent[level]}
      </p>
    </div>
  )
}
export default ClassificationBanner
