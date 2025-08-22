import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'

interface TimePeriodSelectorProps {
  timePeriods: TimePeriod[]
  currentTimePeriodIndex: number
  onTimePeriodChange: (index: number) => void
}

const Button = ({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex govuk-button govuk-button--secondary font-bold text-2xl`}
  >
    {label}
  </button>
)

export const TimePeriodSelector = ({
  timePeriods,
  currentTimePeriodIndex,
  onTimePeriodChange,
}: TimePeriodSelectorProps): JSX.Element => {
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
    <div className="flex justify gap-2 items-baseline">
      <Button label="-" onClick={handleDecrease} disabled={isFirstPeriod} />
      <div className=" border border-black px-4 py-2 min-w-32 text-center">
        {currentTimePeriod?.value.label || 'No period selected'}
      </div>
      <Button label="+" onClick={handleIncrease} disabled={isLastPeriod} />
    </div>
  )
}
