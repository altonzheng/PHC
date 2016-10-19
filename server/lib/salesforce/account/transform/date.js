import format from 'date-fns/format'
import isDate from 'date-fns/is_date'

// Transforms a date string from `MM-DD-YYYY` to `YYYY-MM-DD`
export function transformDateForSalesforce (dateString) {
  return format(new Date(dateString), 'YYYY-MM-DD')
}

// Transforms a date string from `YYYY-MM-DD` to `MM-DD-YYYY`
export function transformDateFromSalesforce (dateString) {
  const date = new Date(dateString)
  if (!dateString || !isDate(date)) {
    return ''
  }
  return format(date, 'MM-DD-YYYY')
}

// Formats date string to something like 'Jan 1' for display on search results
// TODO: Use a proper library for this
export function getFormattedBirthdate (dateString) {
  const date = new Date(dateString)
  if (!dateString || !isDate(date)) {
    return ''
  }
  return format(date, 'MMM DD, YYYY')
}
