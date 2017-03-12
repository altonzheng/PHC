import React, { PropTypes } from 'react'

import Success from '../../../components/Success'
import CheckOutForm from '../containers/CheckOutFormContainer'

// TODO: Modify fields using props.currentEventRegistration before passing into CheckOutForm
//       Prepend any requisite services.
const fields = [
  'satisfaction',
]

export const CheckOut = (props) => {
  let element = props.success
    ? <Success next={props.goToHomePage} title="Success!" body="Client was checked out successfully." />
    : <CheckOutForm fields={fields} />

  return (
    <div>
      <h2>
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
