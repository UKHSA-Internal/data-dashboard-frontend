import React, { FC } from 'react'

import type { DataClassification } from '@/api/models/DataClassification'
import { DATA_CLASSIFICATION_COLORS, DEFAULT_DATA_CLASSIFICATION } from '@/api/models/DataClassification'
import { getDataClassificationLabel } from '@/app/utils/data-classification.utils'
import { clsx } from '@/lib/clsx'

type Level = DataClassification

interface ClassificationBannerProps {
  size: 'large' | 'medium' | 'small' | 'unknown' | ''
  level?: Level
  customContent?: string
  // Optional custom color in hex format (e.g., ''bg-[#2B71C7]', 'bg-[#F39C2C]', etc.)
  customColor?: string
}

const ClassificationBanner: FC<ClassificationBannerProps> = ({
  size,
  level = DEFAULT_DATA_CLASSIFICATION,
  customContent,
  customColor,
}) => {
  return (
    <div
      className={clsx('govuk-classification-banner', {
        [customColor || DATA_CLASSIFICATION_COLORS[level]]: true,
        'my-3': size === 'large',
      })}
      role="note"
      aria-label={`${getDataClassificationLabel(level)} classification`}
    >
      <p
        className={clsx('font-open-sans font-bold uppercase text-white', {
          'govuk-width-container text-[27px] py-2 ml-4': size === 'large',
          'py-1 !pl-[12px] text-[18px]': size === 'medium',
        })}
      >
        {customContent || getDataClassificationLabel(level)}
      </p>
    </div>
  )
}
export default ClassificationBanner
