import React, { PropTypes } from 'react'
import ArrayCheckbox from '../../../components/ArrayCheckbox';
import {
  LANGUAGE_CHOICES,
  ETHNICITY_CHOICES,
  MEDICAL_CHOICES,
  SUPPORT_CHOICES,
} from '../constants/check-in';
import classes from './CheckInForm.scss'

// TODO: Space single-columns out on mobile, looks weird.
// TODO: make sure inputs have a box around them, hard to see otherwise.

export const CheckInForm = (props) => {
  let {
    fields: {
      firstName, lastName, socialSecurityNumber, dateOfBirth, phoneNumber, emailAddress,

      gender, isTransexual, isLGBTQ,

      ethnicity, ethnicityOther,

      language, languageOther,

      hasBeenInFosterCare,

      hasServedInTheMilitary,

      primaryHealthcareLocation,

      isHomeless, lengthOfHomelessness,

      medicalServices, supportServices,
    },
    resetForm,
    handleSubmit,
    submitting,
  } = props

  // initialize array fields to empty arrays
  medicalServices.value = medicalServices.value || [];
  supportServices.value = supportServices.value || [];

  const _onSubmit = () => {
    const fields = props.fields
    const newFields = {}

    for (let field in fields) {

      // skip alt fields, which have their own handlers to update fields correctly
      if (field.endsWith('Other')) continue

      // deal with checkboxes, and checkbox-like inputs differently
      if (fields[field].checked !== undefined) {
        newFields[field] = fields[field].checked
      } else if (fields[field].value !== ""){
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
          <input className={classes.textInput} type="text" {...firstName} />
          {firstName.touched && firstName.error && <div>{firstName.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>Last Name</label>
          <input className={classes.textInput} type="text" {...lastName} />
          {lastName.touched && lastName.error && <div>{lastName.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>SSN</label>
          <input className={classes.textInput} type="phone" {...socialSecurityNumber} />
          {socialSecurityNumber.touched && socialSecurityNumber.error && <div>{socialSecurityNumber.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>Date of Birth</label>
          <input className={classes.textInput} type="text" {...dateOfBirth} />
          {dateOfBirth.touched && dateOfBirth.error && <div>{dateOfBirth.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>Phone</label>
          <input className={classes.textInput} type="text" {...phoneNumber} />
          {phoneNumber.touched && phoneNumber.error && <div>{phoneNumber.error}</div>}
        </div>

        <div className={classes.inputGroup}>
          <label>Email Address</label>
          <input className={classes.textInput} type="email" {...emailAddress} />
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
          <input className={classes.textInput} type="text" {...primaryHealthcareLocation} />
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
          isHomeless.value === "true" &&
            <div className={classes.inputGroup}>
              <label>How long have you been homeless for?</label>
              <input className={classes.textInput} type="text" {...lengthOfHomelessness} />
            </div>
        }
      </div>

      <div className={classes.medical + " " + classes.section}>
        <div className={classes.inputGroup}>
          <label>What medical services would you like today?</label>
          <div className={classes.inputColumns + " hide-on-phone"}>
            <div className={classes.inputs + " " + classes.inputColumn}>
              {MEDICAL_CHOICES.filter((e, i) => i % 2 === 0).map(_medicalChoice => (
                <div className={classes.toggleInputGroup}>
                  <label>
                    <ArrayCheckbox field={medicalServices} value={_medicalChoice}/>
                    {_medicalChoice}
                  </label>
                </div>
              ))}
            </div>
            <div className={classes.inputs + " " + classes.inputColumn}>
              {MEDICAL_CHOICES.filter((e, i) => i % 2 === 1).map(_medicalChoice => (
                <div className={classes.toggleInputGroup}>
                  <label>
                    <ArrayCheckbox field={medicalServices} value={_medicalChoice}/>
                    {_medicalChoice}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.inputs + " hide-on-tablet"}>
            {MEDICAL_CHOICES.map(_medicalChoice => (
              <div className={classes.toggleInputGroup}>
                <label>
                  <ArrayCheckbox field={medicalServices} value={_medicalChoice}/>
                  {_medicalChoice}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={classes.support + " " + classes.section}>
        <div className={classes.inputGroup}>
          <label>What support services would you like today?</label>
          <div className={classes.inputColumns + " hide-on-phone"}>
            <div className={classes.inputs + " " + classes.inputColumn}>
              {SUPPORT_CHOICES.filter((e, i) => i % 2 === 0).map(_supportChoice => (
                <div className={classes.toggleInputGroup}>
                  <label>
                    <ArrayCheckbox field={supportServices} value={_supportChoice} />
                    {_supportChoice}
                  </label>
                </div>
              ))}
            </div>
            <div className={classes.inputs + " " + classes.inputColumn}>
              {SUPPORT_CHOICES.filter((e, i) => i % 2 === 1).map(_supportChoice => (
                <div className={classes.toggleInputGroup}>
                  <label>
                    <ArrayCheckbox field={supportServices} value={_supportChoice} />
                    {_supportChoice}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.inputs + " hide-on-tablet"}>
            {SUPPORT_CHOICES.map(_supportChoice => (
              <div className={classes.toggleInputGroup}>
                <label>
                  <ArrayCheckbox field={supportServices} value={_supportChoice} />
                  {_supportChoice}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={classes.footer}>
        <button
          className="button button--large button--success"
          type="submit"
          disabled={submitting}
        >
          {submitting ? <i/> : <i/>} Submit
        </button>
        <button
          className="button button--large button--default-inverted"
          type="button"
          disabled={submitting}
          onClick={_onClear}
        >
          Clear Values
        </button>
      </div>
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
