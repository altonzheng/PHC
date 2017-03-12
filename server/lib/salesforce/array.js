// Salesforce takes a semicolon-delimited string to represent an array.
export function transformArrayForSalesforce (array) {
  return array.join(';')
}

export function transformArrayFromSalesforce (arrayString) {
  return arrayString && arrayString.split(';')
}
