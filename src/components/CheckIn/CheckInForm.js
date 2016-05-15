import React, { PropTypes } from 'react'
import classes from './CheckInForm.scss'

const onSubmit = () => {
  console.log('hello')
}

export const CheckInForm = (props) => {
  const {
    fields: {
      firstName,
      lastName
    },
    resetForm,
    handleSubmit,
    submitting
  } = props

  return (
    <form
      className={classes.checkInForm}
      onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <input type="text" placeholder="First Name" {...firstName} />
        {firstName.touched && firstName.error && <div>{firstName.error}</div>}
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" placeholder="Last Name" {...lastName} />
        {lastName.touched && lastName.error && <div>{lastName.error}</div>}
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? <i/> : <i/>} Log In
      </button>
      <button type="button" disabled={submitting} onClick={resetForm}>
        Clear Values
      </button>
    </form>
  )
}

CheckInForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default CheckInForm
