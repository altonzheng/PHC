import React, {PropTypes} from 'react'

import Success from '../../../components/Success'
import CheckOutForm from '../containers/CheckOutFormContainer'

function getFormFieldsFromEventRegistration (eventRegistration) {
  return Object.keys(eventRegistration)
    .filter(attribute => attribute !== 'id')
}

export const CheckOut = (props) => {
  const fields = getFormFieldsFromEventRegistration(props.currentEventRegistration)

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
  currentEventRegistration: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  goToHomePage: PropTypes.func.isRequired,
}

export default CheckOut
