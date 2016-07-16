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
  } = props

  const _onSubmit = () => {
    const fields = props.fields
    const newFields = {}

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

  const _onClear = () => {
    props.clearPrimaryInfo()
    resetForm()
  }

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(_onSubmit)}>

      <div className={classes.basic + " " + classes.section}>
        <div className={classes.inputGroup}>
          <label>First Name</label>
          <input type="text" placeholder="First Name" {...firstName} />
          {firstName.touched && firstName.error && <div>{firstName.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" {...lastName} />
          {lastName.touched && lastName.error && <div>{lastName.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>SSN</label>
          <input type="phone" placeholder="xxx-xx-xxxx" {...socialSecurityNumber} />
          {socialSecurityNumber.touched && socialSecurityNumber.error && <div>{socialSecurityNumber.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>Date of Birth</label>
          <input type="text" placeholder="xx-xx-xxxx" {...dateOfBirth} />
          {dateOfBirth.touched && dateOfBirth.error && <div>{dateOfBirth.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>Phone</label>
          <input type="text" placeholder="xxx-xxx-xxxx" {...phoneNumber} />
          {phoneNumber.touched && phoneNumber.error && <div>{phoneNumber.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>Email Address</label>
          <input type="email" placeholder="johndoe@google.com" {...emailAddress} />
          {emailAddress.touched && emailAddress.error && <div>{emailAddress.error}</div>}
        </div>
      </div>

      <div className={classes.gender + " " + classes.section}>
        <div className={classes.inputGroup}>
          <label>Gender</label>

          <div className={classes.horizontalInputs}>
            <div className={classes.toggleInputGroup}>
              <label>
                <input type="radio" value="male" {...gender} />
                Male
              </label>
            </div>

            <div className={classes.toggleInputGroup}>
              <label>
                <input type="radio" value="female" {...gender} />
                Female
              </label>
            </div>
          </div>

          <div className={classes.horizontalInputs}>
            <div className={classes.toggleInputGroup}>
              <label>
                <input type="checkbox" {...isTransexual} />
                Different from birth gender?
              </label>
            </div>
          </div>

          {gender.touched && gender.error && <div>{gender.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>Sexuality</label>

          <div className={classes.toggleInputGroup}>
            <input type="checkbox" {...isLGBTQ} />
            <label>LGBTQ?</label>
          </div>
        </div>
      </div>

      <div className={classes.ethnicity + " " + classes.section}>
        <div className={classes.inputGroup}>
          <label>Ethnicity</label>
          <div className={classes.inputs}>
            {ETHNICITY_CHOICES.map(_ethnicity => (
              <div className={classes.toggleInputGroup}>
                <label>
                  <input
                    type="radio"
                    {...ethnicity}
                    key={_ethnicity}
                    value={_ethnicity}
                    checked={ethnicity.value === _ethnicity}
                    onChange={(value) => ethnicity.onChange(value) && ethnicityOther.onChange("")}
                  />
                  {_ethnicity}
                </label>
              </div>
            ))}

            <div>
              <label>
                Other
                <input
                  type="text"
                  {...ethnicityOther}
                  onChange={(value) => ethnicityOther.onChange(value) && ethnicity.onChange(value)}
                />
              </label>
            </div>
          </div>
          {ethnicityOther.touched && ethnicityOther.error && <div>{ethnicityOther.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>Primary Language</label>
          <div className={classes.inputs}>
            {LANGUAGE_CHOICES.map(_language => (
              <div className={classes.toggleInputGroup}>
                <label>
                  <input
                    type="radio"
                    {...language}
                    key={_language}
                    value={_language}
                    checked={language.value === _language}
                    onChange={(value) => language.onChange(value) && languageOther.onChange("")}
                  />
                  {_language}
                </label>
              </div>
            ))}

            <div>
              <label>
                Other
                <input
                  type="text"
                  {...languageOther}
                  onChange={(value) => languageOther.onChange(value) && language.onChange(value)}
                />
              </label>
            </div>
          </div>
          {languageOther.touched && languageOther.error && <div>{languageOther.error}</div>}
        </div>
      </div>

      <div className={classes.background + " " + classes.section}>
        <div className={classes.inputGroup}>
          <label>Have you ever been in foster care?</label>
          <div className={classes.horizontalInputs}>
            <div className={classes.toggleInputGroup}>
              <label>
                <input
                  type="radio"
                  {...hasBeenInFosterCare}
                  value="true"
                  checked={hasBeenInFosterCare.value === "true"}
                />
                Yes
              </label>
            </div>

            <div className={classes.toggleInputGroup}>
              <label>
                <input
                  type="radio"
                  {...hasBeenInFosterCare}
                  value="false"
                  checked={hasBeenInFosterCare.value === "false"}
                />
                No
              </label>
            </div>
          </div>
        </div>

        <div className={classes.inputGroup}>
          <label>Have you ever served in the military?</label>
          <div className={classes.horizontalInputs}>
            <div className={classes.toggleInputGroup}>
              <label>
                <input
                  type="radio"
                  {...hasServedInTheMilitary}
                  value="true"
                  checked={hasServedInTheMilitary.value === "true"}
                />
                Yes
              </label>
            </div>

            <div className={classes.toggleInputGroup}>
              <label>
                <input
                  type="radio"
                  {...hasServedInTheMilitary}
                  value="false"
                  checked={hasServedInTheMilitary.value === "false"}
                />
                No
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.section}>
        <div className={classes.inputGroup}>
          <label>Where do you usually go for healthcare when you are not feeling well?</label>
          <input type="text" {...primaryHealthcareLocation} />
          {primaryHealthcareLocation.touched && primaryHealthcareLocation.error && <div>{primaryHealthcareLocation.error}</div>}
        </div>
      </div>

      <div className={classes.homeless + " " + classes.section}>
        <div className={classes.inputGroup}>
          <label>Are you currently homeless?</label>
          <div className={classes.horizontalInputs}>
            <div className={classes.toggleInputGroup}>
              <label>
                <input
                  type="radio"
                  {...isHomeless}
                  value="true"
                  checked={isHomeless.value === "true"}
                />
                Yes
              </label>
            </div>

            <div className={classes.toggleInputGroup}>
              <label>
                <input
                  type="radio"
                  {...isHomeless}
                  value="false"
                  checked={isHomeless.value === "false"}
                />
                No
              </label>
            </div>
          </div>
        </div>

        {
          /* only show the duration if ``isHomeless`` */
          isHomeless.value &&
            <div className={classes.inputGroup}>
              <label>How long have you been homeless for?</label>
              <input type="text" {...lengthOfHomelessness} />
            </div>
        }
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? <i/> : <i/>} Continue 
      </button>
      <button type="button" disabled={submitting} onClick={_onClear}>
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
  clearPrimaryInfo: PropTypes.func.isRequired,
}

export default CheckInForm
