/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require('dayjs')

module.exports = (value, format) => {
  if (format === 'date') return dayjs(value).format('dddd, D MMMM YYYY')
  if (format === 'time') return dayjs(value).format('hh:mma')
  return value
}
