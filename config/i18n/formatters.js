/* eslint-disable @typescript-eslint/no-var-requires */
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
  if (format === 'date') return dayjs(value).format('dddd, D MMMM YYYY')
  if (format === 'monthAndYear') return dayjs(value).format('MMM YYYY')
  if (format === 'time') return dayjs(value).format('hh:mma')
  if (format === 'number') return value.toLocaleString('en-GB')
  return value
}
