/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require('dayjs')

/**
 * Custom formatters used within our i18n json locales
 * Example: "Last updated on {{value, date}} at {{value, time}}"
 */
module.exports = (value, format) => {
  if (format === 'date') return dayjs(value).format('dddd, D MMMM YYYY')
  if (format === 'time') return dayjs(value).format('hh:mma')
  if (format === 'number') return value.toLocaleString('en-GB')
  return value
}
