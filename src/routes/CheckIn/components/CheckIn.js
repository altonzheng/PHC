import React, { PropTypes } from 'react'

import classes from './CheckIn.scss'
import CheckInForm from '../containers/CheckInFormContainer'
import Success from '../../../components/Success'

export const CheckIn = (props) => {
  let element = props.success
    ? <Success next={props.goToHomePage} title="Success!" body="Client was checked in successfully." />
    : <CheckInForm />

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>
        Check In
      </h2>
      {element}
    </div>
  )
}

CheckIn.propTypes = {
  success: PropTypes.bool.isRequired,
  goToHomePage: PropTypes.func.isRequired,
}

export default CheckIn
