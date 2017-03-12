import React, {PropTypes} from 'react'

import Success from '../../../components/Success'
import CheckOutForm from '../containers/CheckOutFormContainer'

function getFormFieldsFromEventRegistration (eventRegistration) {
  return Object.keys(eventRegistration)
    .filter(attribute => attribute !== 'id')
}

export const CheckOut = (props) => {
  let {
    currentEventRegistration,
    goToHomePage,
    success,
  } = props

  // If there is no event registration, we cannot proceed.
  if (!currentEventRegistration) {
    goToHomePage()
    return <div></div>
  }

  const fields = getFormFieldsFromEventRegistration(currentEventRegistration)

  let element = success
    ? <Success next={goToHomePage} title="Success!" body="Client was checked out successfully." />
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
  currentEventRegistration: PropTypes.object,
  goToHomePage: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
}

export default CheckOut
