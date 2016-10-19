import format from 'date-fns/format'
import isDate from 'date-fns/is_date'

// Transforms a date string from `MM-DD-YYYY` to `YYYY-MM-DD`
export function transformDateForSalesforce (dateString) {
  return format(new Date(dateString), 'YYYY-MM-DD')
}

// Appends a default PST timezone onto `dateString`
// This is because otherwise, the output of `new Date('2000-01-01')` is 1999-12-30 due to timezones.
// We append PST instead of PDT because it's okay to be one hour too much if we're just parsing dates.
// Interestingly enough, this isn't a problem with parsing dates of MM-DD-YYY format.
function getDateStringWithTimezone (dateString) {
  return `${dateString}T07:00:00Z`
}

// Transforms a date string from `YYYY-MM-DD` to `MM-DD-YYYY`
export function transformDateFromSalesforce (dateString) {
  const date = new Date(getDateStringWithTimezone(dateString))
  if (!dateString || !isDate(date)) {
    return ''
  }
  return format(date, 'MM-DD-YYYY')
}

// Formats date string to something like 'Jan 1' for display on search results
// TODO: Use a proper library for this
export function getFormattedBirthdate (dateString) {
  const date = new Date(getDateStringWithTimezone(dateString))
  if (!dateString || !isDate(date)) {
    return ''
  }
  return format(date, 'MMM DD, YYYY')
}
