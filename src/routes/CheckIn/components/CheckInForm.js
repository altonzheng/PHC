import React, { PropTypes } from 'react'
import Select from 'react-select'
import {
  Button,
  Col,
  Grid,
  Row,
  Tooltip,
  OverlayTrigger,
  Glyphicon,
} from 'react-bootstrap'
import 'react-select/dist/react-select.css'

import ArrayCheckbox from '../../../components/ArrayCheckbox'
import {
  LANGUAGE_CHOICES,
  ETHNICITY_CHOICES,
  MEDICAL_CHOICES,
  SUPPORT_CHOICES,
  PRIMARY_HEALTHCARE_CHOICES,
  LEARNED_ABOUT_EVENT_CHOICES,
  LENGTH_OF_HOMELESSNESS_CHOICES,
} from '../constants/check-in'
import classes from './CheckInForm.scss'

const identificationTooltip = (
  <Tooltip id="tooltip">
    This is optional and only used for helping us identify you in the future.
  </Tooltip>
)

const demographicTooltip = (
  <Tooltip id="tooltip">
    We ask this question for the purpose of collecting information about whom we serve,
    and how to better reach at-risk demographics.
  </Tooltip>
)

const BasicInfoPartial = (props) => {
  let {
    firstName,
    lastName,
    socialSecurityNumber,
    dateOfBirth,
    phoneNumber,
    emailAddress,
  } = props.fields

  return (
    <Row>
      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>First Name {firstName.touched && firstName.error && <span className={classes.errorMessage}>{firstName.error}</span>}</label>
        <input className={classes.textInput} type="text" {...firstName} />
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>Last Name {lastName.touched && lastName.error && <span className={classes.errorMessage}>{lastName.error}</span>}</label>
        <input className={classes.textInput} type="text" {...lastName} />
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>
          { "Social Security Number " }
          <OverlayTrigger placement="right" overlay={identificationTooltip}>
            <Glyphicon glyph="info-sign"/ >
          </OverlayTrigger>
          {socialSecurityNumber.touched && socialSecurityNumber.error && <span className={classes.errorMessage}>{socialSecurityNumber.error}</span>}
        </label>
        <input
          className={classes.textInput}
          type="text"
          {...socialSecurityNumber}
        />
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>
          Date of Birth (mm-dd-yyyy) {dateOfBirth.touched && dateOfBirth.error && <span className={classes.errorMessage}>{dateOfBirth.error}</span>}
        </label>
        <input
          className={classes.textInput}
          type="text"
          {...dateOfBirth}
        />
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>
          Phone {phoneNumber.touched && phoneNumber.error && <span className={classes.errorMessage}>{phoneNumber.error}</span>}
        </label>
        <input
          className={classes.textInput}
          type="text"
          {...phoneNumber}
        />
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>Email Address {emailAddress.touched && emailAddress.error && <span className={classes.errorMessage}>{emailAddress.error}</span>}</label>
        <input
          className={classes.textInput}
          type="email"
          {...emailAddress}
        />
      </Col>
    </Row>
  )
}

const GenderLGBTQPartial = (props) => {
  let {
    gender,
    isLGBTQ,
  } = props.fields;

  return (
    <Row>
      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>Gender</label>
        <Row>
          <Col xs={12}>
            <label>
              <input
                {...gender}
                type="radio"
                value="Male"
                checked={gender.value === 'Male'}
              />
              Male
            </label>
          </Col>

          <Col xs={12}>
            <label>
              <input
                {...gender}
                type="radio"
                value="Female"
                checked={gender.value === 'Female'}
              />
              Female
            </label>
          </Col>

          <Col xs={12}>
            <label>
              <input
                {...gender}
                type="radio"
                value="Non-binary"
                checked={gender.value === 'Non-binary'}
              />
              Non-binary gender
            </label>
          </Col>
        </Row>

        {gender.touched && gender.error && <span className={classes.errorMessage}>{gender.error}</span>}
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>
          Do you identify as LGBTQ?
          <OverlayTrigger placement="right" overlay={demographicTooltip}>
            <Glyphicon glyph="info-sign" />
          </OverlayTrigger>
        </label>

        <Row>
          <Col xs={6}>
            <label>
              <input
                type="radio"
                {...isLGBTQ}
                value="true"
                checked={isLGBTQ.value === 'true'}
              />
              Yes
            </label>
          </Col>
          <Col xs={6}>
            <label>
              <input
                type="radio"
                {...isLGBTQ}
                value="false"
                checked={isLGBTQ.value === 'false'}
              />
              No
            </label>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const EthnicityLanguagePartial = (props) => {
  let {
    ethnicity,
    ethnicityOther,
    language,
    languageOther,
  } = props.fields
  return (
    <Row>
      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>
          Ethnicity
          <OverlayTrigger placement="right" overlay={demographicTooltip}>
            <Glyphicon glyph="info-sign" />
          </OverlayTrigger>
        </label>

        <div className={classes.inputs}>
          {ETHNICITY_CHOICES.map(_ethnicity => (
            <div className={classes.toggleInputGroup} key={_ethnicity}>
              <label>
                <ArrayCheckbox field={ethnicity} value={_ethnicity} />
                {_ethnicity}
              </label>
            </div>
          ))}

          <div>
            <label className={classes.otherInput}>
              Other
              <input
                className={classes.otherTextInput}
                type="text"
                {...ethnicityOther}
                onChange={(value) => ethnicityOther.onChange(value) && ethnicity.onChange(value)}
              />
            </label>
          </div>
        </div>
        {
          ethnicityOther.touched &&
            ethnicityOther.error &&
            <span className={classes.errorMessage}>{ethnicityOther.error}</span>
        }
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>Primary Language</label>
        <div className={classes.inputs}>
          {LANGUAGE_CHOICES.map(_language => (
            <div className={classes.toggleInputGroup} key={_language}>
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
            <label className={classes.otherInput}>
              Other
              <input
                className={classes.otherTextInput}
                type="text"
                {...languageOther}
                onChange={(value) => languageOther.onChange(value) && language.onChange(value)}
              />
            </label>
          </div>
        </div>
        {
          languageOther.touched &&
            languageOther.error &&
            <span className={classes.errorMessage}>{languageOther.error}</span>
        }
      </Col>
    </Row>
  )
}

const DemographicPartial = (props) => {
  let {
    hasBeenInFosterCare,
    hasServedInTheMilitary,
    primaryHealthcareLocation,
    learnedAboutEvent,
    isHomeless,
    lengthOfHomelessness,
    hasSeenDoctorThisYear,
    generalHealth,
    skinHealth,
    dignityAndConfidence,
    dentalHygiene, 
    hygiene,
  } = props.fields

  return (
    <Row>
      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>Have you ever been in foster care?</label>
        <Row>
          <Col xs={6}>
            <label>
              <input
                type="radio"
                {...hasBeenInFosterCare}
                value="true"
                checked={hasBeenInFosterCare.value === 'true'}
              />
              Yes
            </label>
          </Col>

          <Col xs={6}>
            <label>
              <input
                type="radio"
                {...hasBeenInFosterCare}
                value="false"
                checked={hasBeenInFosterCare.value === 'false'}
              />
              No
            </label>
          </Col>
        </Row>
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>Have you ever served in the military?</label>
        <Row>
          <Col xs={6}>
            <label>
              <input
                type="radio"
                {...hasServedInTheMilitary}
                value="true"
                checked={hasServedInTheMilitary.value === "true"}
              />
              Yes
            </label>
          </Col>

          <Col xs={6}>
            <label>
              <input
                type="radio"
                {...hasServedInTheMilitary}
                value="false"
                checked={hasServedInTheMilitary.value === "false"}
              />
              No
            </label>
          </Col>
        </Row>
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>Have you been to a doctor this year?</label>
        <Row>
          <Col xs={6}>
            <label>
              <input
                type="radio"
                {...hasSeenDoctorThisYear}
                value="true"
                checked={hasSeenDoctorThisYear.value === "true"}
              />
              Yes
            </label>
          </Col>

          <Col xs={6}>
            <label>
              <input
                type="radio"
                {...hasSeenDoctorThisYear}
                value="false"
                checked={hasSeenDoctorThisYear.value === "false"}
              />
              No
            </label>
          </Col>
        </Row>
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>Where do you usually go for healthcare when you are not feeling well?</label>
        {primaryHealthcareLocation.touched && primaryHealthcareLocation.error && <span className={classes.errorMessage}>{primaryHealthcareLocation.error}</span>}
        <Select
          {...primaryHealthcareLocation}
          name="primaryHealthcareLocationSelect"
          value={primaryHealthcareLocation.value || ''}
          onBlur={() => primaryHealthcareLocation.onBlur(primaryHealthcareLocation.value)}
          options={PRIMARY_HEALTHCARE_CHOICES}
        />
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>How did you hear about this event?</label>
        {learnedAboutEvent.touched && learnedAboutEvent.error && <span className={classes.errorMessage}>{learnedAboutEvent.error}</span>}
        <Select
          {...learnedAboutEvent}
          name="learnedAboutEventSelect"
          value={learnedAboutEvent.value || ''}
          onBlur={() => learnedAboutEvent.onBlur(learnedAboutEvent.value)}
          options={LEARNED_ABOUT_EVENT_CHOICES}
        />
      </Col>

      <Col
        xs={12}
        className={classes.formItemContainer}
      > 

        <p>Please rate on a scale of 1 (bad) to 5 (great)</p>
      </Col>
      <Col
        xs={12} sm={6}
        className={classes.formItemContainer}
      >
        <label>General health:</label>
        <Row>
          {['1', '2', '3', '4', '5'].map(value => (
            <Col xs={2} key={value}>
              <label>
                <input
                  {...generalHealth}
                  type="radio"
                  value={value[0]}
                  checked={generalHealth.value === value[0]}
                />
                {value}
              </label>
            </Col>
          ))}
        </Row>
      </Col>

      <Col
        xs={12} sm={6}
        className={classes.formItemContainer}
      >
        <label>Skin or dermatological health:</label>
        <Row>
          {['1', '2', '3', '4', '5'].map(value => (
            <Col xs={2} key={value}>
              <label>
                <input
                  {...skinHealth}
                  type="radio"
                  value={value[0]}
                  checked={skinHealth.value === value[0]}
                />
                {value}
              </label>
            </Col>
          ))}
        </Row>
      </Col>

      <Col
        xs={12} sm={6}
        className={classes.formItemContainer}
      >
        <label>Your overall dignity and confidence:</label>
        <Row>
          {['1', '2', '3', '4', '5'].map(value => (
            <Col xs={2} key={value}>
              <label>
                <input
                  {...dignityAndConfidence}
                  type="radio"
                  value={value[0]}
                  checked={dignityAndConfidence.value === value[0]}
                />
                {value}
              </label>
            </Col>
          ))}
        </Row>
      </Col>

      <Col
        xs={12} sm={6}
        className={classes.formItemContainer}
      >
        <label>Dental Hygiene:</label>
        <Row>
          {['1', '2', '3', '4', '5'].map(value => (
            <Col xs={2} key={value}>
              <label>
                <input
                  {...dentalHygiene}
                  type="radio"
                  value={value[0]}
                  checked={dentalHygiene.value === value[0]}
                />
                {value}
              </label>
            </Col>
          ))}
        </Row>
      </Col>


      <Col
        xs={12} sm={6}
        className={classes.formItemContainer}
      >
        <label>Hygiene:</label>
        <Row>
          {['1', '2', '3', '4', '5'].map(value => (
            <Col xs={2} key={value}>
              <label>
                <input
                  {...hygiene}
                  type="radio"
                  value={value[0]}
                  checked={hygiene.value === value[0]}
                />
                {value}
              </label>
            </Col>
          ))}
        </Row>
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>Are you currently homeless?</label>
        <Row>
          <Col xs={6}>
            <label>
              <input
                type="radio"
                {...isHomeless}
                value="true"
                checked={isHomeless.value === "true"}
              />
              Yes
            </label>
          </Col>

           <Col xs={6}>
            <label>
              <input
                type="radio"
                {...isHomeless}
                value="false"
                checked={isHomeless.value === "false"}
              />
              No
            </label>
          </Col>
        </Row>
      </Col>

       {
        /* only show the duration if ``isHomeless`` */
        isHomeless.value === "true" &&
          <Col xs={12} sm={6} className={classes.inputGroup}>
            <label className={classes.fieldName}>How long have you been homeless for?</label>
            <Select
              {...lengthOfHomelessness}
              name="primaryHealthcareLocationSelect"
              value={lengthOfHomelessness.value || ''}
              onBlur={() => lengthOfHomelessness.onBlur(lengthOfHomelessness.value)}
              options={LENGTH_OF_HOMELESSNESS_CHOICES}
            />
          </Col>
      }
    </Row>
  )
}

const ServicesPartial = (props) => {
  let {
    medicalServices,
    supportServices,
  } = props.fields

  return (
    <Row>
      <Col xs={12}>
        <label className={classes.fieldName}>What medical services would you like today?</label>
        <Row>
          {MEDICAL_CHOICES.map(_medicalChoice => (
            <Col xs={12} sm={6} className={classes.inputGroup} key={_medicalChoice}>
              <label>
                <ArrayCheckbox field={medicalServices} value={_medicalChoice} />
                {_medicalChoice}
              </label>
            </Col>
          ))}
        </Row>
      </Col>

      <Col xs={12}>
        <label className={classes.fieldName}>What support services would you like today?</label>
        <Row>
          {SUPPORT_CHOICES.map(_supportChoice => (
            <Col xs={12} sm={6} className={classes.inputGroup} key={_supportChoice}>
              <label>
                <ArrayCheckbox field={supportServices} value={_supportChoice} />
                {_supportChoice}
              </label>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export const CheckInForm = (props) => {
  let {
    fields: {
      firstName, lastName, socialSecurityNumber, dateOfBirth, phoneNumber, emailAddress,
      gender, isLGBTQ,
      ethnicity, ethnicityOther, language, languageOther,
      hasBeenInFosterCare,
      hasServedInTheMilitary,
      primaryHealthcareLocation,
      learnedAboutEvent,
      isHomeless, lengthOfHomelessness,
      medicalServices, supportServices,
      hasSeenDoctorThisYear, generalHealth,
      skinHealth, dignityAndConfidence,
      dentalHygiene, hygiene,
    },
    handleSubmit,
    requesting,
    currentAccount,
    errors,
    submitFailed,
  } = props

  const basicInfoFields = {
    firstName,
    lastName,
    socialSecurityNumber,
    dateOfBirth,
    phoneNumber,
    emailAddress,
  }

  const genderIsLGBTQFields = {
    gender,
    isLGBTQ,
  }

  const ethnicityLanguageFields = {
    ethnicity,
    ethnicityOther,
    language,
    languageOther,
  }

  const demographicFields = {
    hasBeenInFosterCare,
    hasServedInTheMilitary,
    primaryHealthcareLocation,
    learnedAboutEvent,
    isHomeless,
    lengthOfHomelessness,
    hasSeenDoctorThisYear,
    generalHealth,
    skinHealth,
    dignityAndConfidence,
    dentalHygiene, 
    hygiene,
  }

  const servicesFields = {
    medicalServices,
    supportServices,
  }
  // initialize array fields to empty arrays
  ethnicity.value = ethnicity.value || []
  medicalServices.value = medicalServices.value || []
  supportServices.value = supportServices.value || []

  const _onSubmit = () => {
    const fields = props.fields
    const newFields = {}

    for (let field in fields) {
      // skip alt fields, which have their own handlers to update fields correctly
      if (field.endsWith('Other')) continue

      // deal with checkboxes, and checkbox-like inputs differently
      if (fields[field].checked !== undefined) {
        newFields[field] = fields[field].checked
      } else if (fields[field].value !== '') {
        newFields[field] = fields[field].value
      }
    }

    props.updateInfo(newFields, currentAccount && currentAccount.id)
  }

  const _onClear = () => {
    props.clearInfo()
  }

  if (currentAccount) {
    if (currentAccount.firstName) {
      firstName.disabled = true
    } else {
      delete firstName.disabled
    }

    if (currentAccount.lastName) {
      lastName.disabled = true
    } else {
      delete lastName.disabled
    }

    if (currentAccount.socialSecurityNumber && currentAccount.socialSecurityNumber.length === 9) {
      socialSecurityNumber.disabled = true
    } else {
      delete socialSecurityNumber.disabled
    }

    if (currentAccount.dateOfBirth) {
      dateOfBirth.disabled = true
    } else {
      delete dateOfBirth.disabled
    }
  }

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Grid fluid>
        <BasicInfoPartial fields={basicInfoFields} />
        <GenderLGBTQPartial fields={genderIsLGBTQFields} />
        <EthnicityLanguagePartial fields={ethnicityLanguageFields} />
        <DemographicPartial fields={demographicFields} />
        <ServicesPartial fields={servicesFields} />
      </Grid>

      <div className={classes.footer}>
        <Button
          bsStyle="primary"
          type="submit"
          disabled={requesting}
        >
          {requesting ? 'Submitting...' : 'Submit'}
        </Button>
        <Button
          type="button"
          disabled={requesting}
          onClick={_onClear}
        >
          Clear Values
        </Button>
      </div>

      {(Object.keys(errors).length && submitFailed)
          ? <div className={classes.errorNotice}>
            Required fields are missing! Please review the form.
          </div>
          : null
      }
    </form>
  )
}

CheckInForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  requesting: PropTypes.bool.isRequired,
  updateInfo: PropTypes.func.isRequired,
  clearInfo: PropTypes.func.isRequired,
}

export default CheckInForm
