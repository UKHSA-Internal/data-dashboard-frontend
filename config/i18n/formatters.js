const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Europe/London')

/**
 * Custom formatters used within our i18n json locales
 * Example: "Last updated on {{value, date}} at {{value, time}}"
 */
module.exports = (value, format) => {
  if (value === null) return ''
  if (format === 'date') return dayjs(value).format('dddd, D MMMM YYYY')
  if (format === 'dateShort') return dayjs(value).format('D MMMM YYYY')
  if (format === 'dateShortest') return dayjs(value).format('D MMM YYYY')
  if (format === 'time') return dayjs(value).format('hh:mma')
  if (format === 'number') return value.toLocaleString('en-GB', { maximumFractionDigits: 2 })
  if (format === 'number1DP')
    return value.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  if (format === 'number2DP')
    return value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (format === 'lowerCaseFirstLetter') return value.charAt(0).toLowerCase() + value.slice(1)
  return value
}
