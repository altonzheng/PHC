import React, { PropTypes } from 'react'
import classes from './CheckInForm.scss'

const ETHNICITY_CHOICES = [
  'African American',
  'Asian / Pacific Islander',
  'Caucasian',
  'Latino',
  'Native American',
]

const LANGUAGE_CHOICES = [
  'English',
  'Cantonese / Mandarin',
  'Russian',
  'Spanish',
  'Vietnamese',
]

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
      ethnicityOther,

      language,
      languageOther,

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
    const fields = props.fields
    const newFields = {};

    for (let field in fields) {

      // skip alt fields
      if (field.endsWith('Other')) continue

      // deal with checkboxes, and checkbox-like inputs differently
      if (fields[field].checked !== undefined) {
        newFields[field] = fields[field].checked

      // don't update value if it hasn't been touched, that's useless
      } else if (fields[field].dirty && fields[field].value) {
        newFields[field] = fields[field].value
      }

    }

    props.updatePrimaryInfo(newFields)
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
        <input type="radio" value="male" {...gender} />Male
        <input type="radio" value="female" {...gender} />Female
        <input type="checkbox" {...isTransexual} />Different from birth gender?
        {gender.touched && gender.error && <div>{gender.error}</div>}
      </div>

      <div>
        <label>Sexuality</label>
        <input type="checkbox" {...isLGBTQ} />LGBTQ?
      </div>

      <div>
        <label>Ethnicity</label>
        {ETHNICITY_CHOICES.map(_ethnicity => (
          <div>
            <label>{_ethnicity}</label>
            <input
              type="radio"
              {...ethnicity}
              key={_ethnicity}
              value={_ethnicity}
              checked={ethnicity.value === _ethnicity}
              onChange={(value) => ethnicity.onChange(value) && ethnicityOther.onChange("")}
            />
          </div>
        ))}
        <div>
          <label>Other</label>
          <input
            type="text"
            {...ethnicityOther}
            onChange={(value) => ethnicityOther.onChange(value) && ethnicity.onChange(value)}
          />
        </div>
        {ethnicityOther.touched && ethnicityOther.error && <div>{ethnicityOther.error}</div>}
      </div>

      <div>
        <label>Primary Language</label>
        {LANGUAGE_CHOICES.map(_language => (
          <div>
            <label>{_language}</label>
            <input
              type="radio"
              {...language}
              key={_language}
              value={_language}
              checked={language.value === _language}
              onChange={(value) => language.onChange(value) && languageOther.onChange("")}
            />
          </div>
        ))}
        <div>
          <label>Other</label>
          <input
            type="text"
            {...languageOther}
            onChange={(value) => languageOther.onChange(value) && language.onChange(value)}
          />
        </div>
        {languageOther.touched && languageOther.error && <div>{languageOther.error}</div>}
      </div>

      <div>
        <label>Have you ever been in foster care?</label>
        <input
          type="radio"
          {...hasBeenInFosterCare}
          value="true"
          checked={hasBeenInFosterCare.value === "true"}
        />
        Yes

        <input
          type="radio"
          {...hasBeenInFosterCare}
          value="false"
          checked={hasBeenInFosterCare.value === "false"}
        />
        No
      </div>

      <div>
        <label>Have you ever served in the military?</label>
        <input
          type="radio"
          {...hasServedInTheMilitary}
          value="true"
          checked={hasServedInTheMilitary.value === "true"}
        />
        Yes

        <input
          type="radio"
          {...hasServedInTheMilitary}
          value="false"
          checked={hasServedInTheMilitary.value === "false"}
        />
        No
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

      {
        /* only show the duration if ``isHomeless`` */
        isHomeless.value &&
          <div>
            <label>How long have you been homeless for?</label>
            <input type="text" {...lengthOfHomelessness} />
          </div>
      }

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
