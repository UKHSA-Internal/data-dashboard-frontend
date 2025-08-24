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
    className={`govuk-button govuk-button--secondary text-2xl flex font-bold`}
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
    <div className="justify flex items-baseline gap-2">
      <Button label="-" onClick={handleDecrease} disabled={isFirstPeriod} />
      <div className=" min-w-32 border border-black px-4 py-2 text-center">
        {currentTimePeriod?.value.label || 'No period selected'}
      </div>
      <Button label="+" onClick={handleIncrease} disabled={isLastPeriod} />
    </div>
  )
}
