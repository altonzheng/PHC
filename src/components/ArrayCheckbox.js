import React from 'react'

const ArrayCheckbox = (props) => {
  const { field, value } = props

  // this helper method exists because with an array of inputs,
  // redux-form can't tell when an element has lost focus
  const _onChange = (value) => {
    props.field.onChange(value)
    props.field.onBlur(value)
  }

  return (
    <input
      type="checkbox"
      checked={field.value.indexOf(value) >= 0}
      onChange={event => {
        event.persist() // need to persist event in order to maintain target

        const index = field.value.indexOf(value)

        if (index < 0) { // wasn't selected
          if (event.target.checked) { // was checked
            _onChange(field.value.concat(value))
          }
        } else {
          if (!event.target.checked) { // was unchecked
            const copy = [...field.value] // make copy to not mutate value
            copy.splice(index, 1) // remove item at index
            _onChange(copy)
          }
        }
      }}
    />

  )
}

ArrayCheckbox.propTypes = {
  field: React.PropTypes.object.isRequired,
  value: React.PropTypes.any,
}

export default ArrayCheckbox
