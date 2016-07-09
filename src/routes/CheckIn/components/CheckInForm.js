import React, { PropTypes } from 'react'
import classes from './CheckInForm.scss'

export const CheckInForm = (props) => {
  const {
    fields: {
      firstName,
      lastName,
      socialSecurityNumber,
      dateOfBirth,
      phoneNumber,
      emailAddress,

      gender,
      isTransexual,
      isLGBTQ,

      ethnicity,

      language,

      hasBeenInFosterCare,

      hasServedInTheMilitary,

      primaryHealthcareLocation,

      isHomeless,
      lengthOfHomelessness,
    },
    resetForm,
    handleSubmit,
    submitting,
    updatePrimaryInfo,
  } = props

  const _onSubmit = () => {
    props.updatePrimaryInfo(props.fields)
  }

  return (
    <form
      className={classes.checkInForm}
      onSubmit={handleSubmit(_onSubmit)}>
      <div>
        <label>First Name</label>
        <input type="text" placeholder="First Name" {...firstName} />
        {firstName.touched && firstName.error && <div>{firstName.error}</div>}
      </div>

      <div>
        <label>Last Name</label>
        <input type="text" placeholder="Last Name" {...lastName} />
        {lastName.touched && lastName.error && <div>{lastName.error}</div>}
      </div>

      <div>
        <label>SSN</label>
        <input type="phone" placeholder="xxx-xx-xxxx" {...socialSecurityNumber} />
        {socialSecurityNumber.touched && socialSecurityNumber.error && <div>{socialSecurityNumber.error}</div>}
      </div>

      <div>
        <label>Date of Birth</label>
        <input type="text" placeholder="xx-xx-xxxx" {...dateOfBirth} />
        {dateOfBirth.touched && dateOfBirth.error && <div>{dateOfBirth.error}</div>}
      </div>

      <div>
        <label>Phone</label>
        <input type="text" placeholder="xxx-xxx-xxxx" {...phoneNumber} />
        {phoneNumber.touched && phoneNumber.error && <div>{phoneNumber.error}</div>}
      </div>

      <div>
        <label>Email Address</label>
        <input type="email" placeholder="johndoe@google.com" {...emailAddress} />
        {emailAddress.touched && emailAddress.error && <div>{emailAddress.error}</div>}
      </div>

      <div>
        <label>Gender</label>
        <input type="radio" {...gender} />Male
        <input type="radio" {...gender} />Female
        <input type="checkbox" {...isTransexual} />Different from birth gender?
        {gender.touched && gender.error && <div>{gender.error}</div>}
      </div>

      <div>
        <label>Sexuality</label>
        <input type="checkbox" {...isLGBTQ} />LGBTQ?
      </div>

      <div>
        <label>Ethnicity</label>
        <input type="checkbox" {...ethnicity} />African American
        <input type="checkbox" {...ethnicity} />Asian / Pacific Islander
        <input type="checkbox" {...ethnicity} />Caucasian
        <input type="checkbox" {...ethnicity} />Latino
        <input type="checkbox" {...ethnicity} />Native American
        Other <input type="text" {...ethnicity} />
        {ethnicity.touched && ethnicity.error && <div>{ethnicity.error}</div>}
      </div>

      <div>
        <label>Primary Language</label>
        <input type="checkbox" {...language} />English
        <input type="checkbox" {...language} />Cantonese / Mandarin
        <input type="checkbox" {...language} />Russian
        <input type="checkbox" {...language} />Spanish
        <input type="checkbox" {...language} />Vietnamese
        Other <input type="text" {...language} />
        {language.touched && language.error && <div>{language.error}</div>}
      </div>

      <div>
        <label>Have you ever been in foster care?</label>
        <input type="radio" {...hasBeenInFosterCare} />Yes
        <input type="radio" {...hasBeenInFosterCare} />No
      </div>

      <div>
        <label>Have you ever served in the military?</label>
        <input type="radio" {...hasServedInTheMilitary} />Yes
        <input type="radio" {...hasServedInTheMilitary} />No
      </div>

      <div>
        <label>Where do you usually go for healthcare when you are not feeling well?</label>
        <input type="text" {...primaryHealthcareLocation} />
        {primaryHealthcareLocation.touched && primaryHealthcareLocation.error && <div>{primaryHealthcareLocation.error}</div>}
      </div>

      <div>
        <label>Are you homeless?</label>
        <input type="checkbox" {...isHomeless} />
      </div>

      // TODO: Only show this box if the prior one is checked.
      <div>
        <label>How long have you been homeless for?</label>
        <input type="text" {...lengthOfHomelessness} />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? <i/> : <i/>} Submit
      </button>
      <button type="button" disabled={submitting} onClick={resetForm}>
        Clear Values
      </button>
    </form>
  )
}

CheckInForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  updatePrimaryInfo: PropTypes.func.isRequired,
}

export default CheckInForm
