// TODO: Power up this function even more, still some invalid dates possible.

const normalizeDateOfBirth = (value, previousValue) => {
  if (!value) {
    return value
  }

  let onlyNums = value.replace(/[^\d]/g, '')

  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 2) {
      if (parseInt(onlyNums) > 12) {
        return '0' + onlyNums[0] + '-' + onlyNums[1]
      }

      return onlyNums + '-'
    } else if (onlyNums.length === 4) {
      if (parseInt(onlyNums.slice(2, 4)) > 31) {
        return onlyNums.slice(0, 2) + '-0' + onlyNums[2] + '-' + onlyNums[3]
      }

      return onlyNums.slice(0, 2) + '-' + onlyNums.slice(2) + '-'
    }
  }

  if (onlyNums.length <= 2) {
    return onlyNums
  } else if (onlyNums.length <= 4) {
    return onlyNums.slice(0, 2) + '-' + onlyNums.slice(2)
  } else {
    return onlyNums.slice(0, 2) + '-' + onlyNums.slice(2, 4) + '-' + onlyNums.slice(4, 8)
  }
}

export default normalizeDateOfBirth
