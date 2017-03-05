import React, { PropTypes } from 'react'
import classes from './CheckOut.scss'
import { Button } from 'react-bootstrap'
import CheckOutForm from '../containers/CheckOutFormContainer'

const fields = [
  'services',
  'satisfaction',
]

export const CheckOut = (props) => {
  const success = (
    <div>
      <h1>Success! Client was registered.</h1>
      <Button bsStyle="primary" onClick={props.goToHomePage}>Check in a new client</Button>
    </div>
  )

  let element = <CheckOutForm fields={fields} />

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>
        Check Out
      </h2>
      {element}
    </div>
  )
}

CheckOut.propTypes = {
  success: PropTypes.bool.isRequired,
  goToHomePage: PropTypes.func.isRequired,
}

export default CheckOut
