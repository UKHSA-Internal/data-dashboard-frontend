const percentageFormatter = (value: number, decimals: number = 1): string => {
  const percentageFormat = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: decimals,
  })

  return percentageFormat.format(value)
}

export default percentageFormatter
