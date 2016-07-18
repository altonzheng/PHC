import React, { PropTypes } from 'react'
import classes from './ServicesForm.scss'

const onSubmit = () => {
  console.log('hello')
}

export const ServicesForm = (props) => {
  const {
    fields: {
      code
    },
    resetForm,
    handleSubmit,
    submitting
  } = props

  return (
    <form
      className={classes.servicesForm}
      onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Code</label>
        <input type="text" placeholder="Code" {...code} />
        {code.touched && code.error && <div>{code.error}</div>}
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? <i/> : <i/>} Log In
      </button>
      <button type="button" disabled={submitting} onClick={resetForm}>
        Clear
      </button>
    </form>
  )
}

ServicesForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default ServicesForm
