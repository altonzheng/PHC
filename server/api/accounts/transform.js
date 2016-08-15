// Transforms a date string from `MM-DD-YYYY` to `YYYY-MM-DD`
export function transformDateForSalesforce (dateString) {
  const date = new Date(dateString)

  const yyyy = date.getFullYear()

  let mm = date.getMonth() + 1
  mm = mm < 10 ? '0' + mm : mm

  let dd = date.getDate()
  dd = dd < 10 ? '0' + dd : dd

  return [yyyy, mm, dd].join('-')
}

// Transforms a date string from `YYYY-MM-DD` to `MM-DD-YYYY`
export function transformDateFromSalesforce (dateString) {
  const date = new Date(dateString)

  const yyyy = date.getFullYear()

  let mm = date.getMonth() + 1
  mm = mm < 10 ? '0' + mm : mm

  let dd = date.getDate()
  dd = dd < 10 ? '0' + dd : dd

  return [mm, dd, yyyy].join('-')
}
