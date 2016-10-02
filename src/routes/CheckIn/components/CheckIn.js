import React, { PropTypes } from 'react'
import classes from './CheckIn.scss'
import { Button } from 'react-bootstrap';
import CheckInForm from '../containers/CheckInFormContainer'

export const CheckIn = (props) => {

  const success = (
    <div>
      <h1>Success! Client was registered.</h1>
      <Button bsStyle="primary" onClick={props.goToHomePage}>Check in a new client</Button>
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
  goToHomePage: PropTypes.func.isRequired,
}

export default CheckIn
