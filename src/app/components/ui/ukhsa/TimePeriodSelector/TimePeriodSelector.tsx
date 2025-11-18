import React, { ReactElement } from 'react'

import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'

interface TimePeriodSelectorProps {
  timePeriods: TimePeriod[]
  currentTimePeriodIndex: number
  onTimePeriodChange: (index: number) => void
  timePeriodTitle: string
}

const Button = ({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`govuk-button govuk-button--secondary govuk-!-margin-0 flex max-w-[32px] items-center border border-black font-bold`}
  >
    {label}
  </button>
)

export const TimePeriodSelector = ({
  timePeriods,
  currentTimePeriodIndex,
  onTimePeriodChange,
  timePeriodTitle,
}: TimePeriodSelectorProps) => {
  const currentTimePeriod = timePeriods[currentTimePeriodIndex]
  const isFirstPeriod = currentTimePeriodIndex === 0
  const isLastPeriod = currentTimePeriodIndex === timePeriods.length - 1

  const handleDecrease = () => {
    if (!isFirstPeriod) {
      onTimePeriodChange(currentTimePeriodIndex - 1)
    }
  }

  const handleIncrease = () => {
    if (!isLastPeriod) {
      onTimePeriodChange(currentTimePeriodIndex + 1)
    }
  }

  return (
    <div>
      <div className="mb-1 font-bold">
        {!timePeriodTitle || timePeriodTitle == '' ? 'Year selection' : timePeriodTitle}:
      </div>
      <div className="flex">
        <Button onClick={handleDecrease} disabled={isFirstPeriod} label="-" />
        <div className="border border-x-0 border-black px-4 py-[8px] text-center shadow-[0_2px_0_#929191]">
          {currentTimePeriod?.value.label || 'No period selected'}
        </div>
        <Button onClick={handleIncrease} disabled={isLastPeriod} label="+" />
      </div>
    </div>
  )
}
