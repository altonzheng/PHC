const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')

  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length < 3) {
      return '(' + onlyNums
    } else if (onlyNums.length === 3) {
      return '(' + onlyNums + ')'
    } else if (onlyNums.length === 6) {
      return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3) + '-'
    }
  }

  if (onlyNums.length === 0) {
    return ''
  } else if (onlyNums.length <= 3) {
    return '(' + onlyNums
  } else if (onlyNums.length <= 6) {
    return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3)
  } else {
    return '(' + onlyNums.slice(0, 3) + ') ' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
  }
}

export default normalizePhone
