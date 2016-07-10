import React, { PropTypes } from 'react'
import classes from './CheckIn.scss'

import CheckInForm from '../containers/CheckInFormContainer'

export const CheckIn = (props) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.header}>
        Check In
      </h2>
      <CheckInForm />
    </div>
  )
}

CheckIn.propTypes = {

}

export default CheckIn
