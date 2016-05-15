import React, { PropTypes } from 'react'
import classes from './Services.scss'

import ServicesForm from './ServicesForm'

export const Services = (props) => {
  const {
    fields,
    resetForm,
    handleSubmit,
    submitting
  } = props

  return (
    <div>
      <h2 className={classes.servicesContainer}>
        Services
      </h2>
      <ServicesForm
        fields={fields}
        resetForm={resetForm}
        handleSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  )
}

Services.propTypes = {
  // redux-form stuff for ServicesForm
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired

  // Other stuff


}

export default Services
