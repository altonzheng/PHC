import React, { PropTypes } from 'react'
import classes from './CheckIn.scss'

import CheckInForm from '../containers/CheckInFormContainer'

export const CheckIn = (props) => {
  return (
    <div>
      <h2 className={classes.checkInContainer}>
        Check In
      </h2>
      <CheckInForm />
    </div>
  )
}

CheckIn.propTypes = {

}

export default CheckIn
