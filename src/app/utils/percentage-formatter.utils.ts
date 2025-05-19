const percentageFormatter = (value: number, minDecimals: number = 1, maxDecimals: number = 2): string => {
  const percentageFormat = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  })

  return percentageFormat.format(value)
}

export default percentageFormatter
