import React, { PropTypes } from 'react'
import classes from './CheckIn.scss'

import CheckInForm from '../containers/CheckInFormContainer'

export const CheckIn = (props) => {

  const success = (
    <div>
      <h1>Success! Participant was registered.</h1>
      <button onClick={props.resetForm}>Check in a new person</button>
    </div>
  )

  let element = <CheckInForm />
  if (props.success) {
    element = success
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>
        Check In
      </h2>
      { element }
    </div>
  )
}

CheckIn.propTypes = {
  success: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
}

export default CheckIn
