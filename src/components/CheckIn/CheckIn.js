import React, { PropTypes } from 'react'
import classes from './CheckIn.scss'

import CheckInForm from './CheckInForm'

export const CheckIn = (props) => {
  const {
    fields,
    resetForm,
    handleSubmit,
    submitting
  } = props

  return (
    <div>
      <h2 className={classes.checkInContainer}>
        Check In
      </h2>
      <CheckInForm
        fields={fields}
        resetForm={resetForm}
        handleSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  )
}

CheckIn.propTypes = {
  // redux-form stuff for CheckInForm
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired

  // TODO: Any other stuff
}

export default CheckIn
