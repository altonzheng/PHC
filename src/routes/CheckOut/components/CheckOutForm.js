import React, { PropTypes } from 'react'
import Select from 'react-select'
import { Button, Tooltip, OverlayTrigger, Glyphicon } from 'react-bootstrap'
import classnames from 'classnames'
import 'react-select/dist/react-select.css'
import ArrayCheckbox from '../../../components/ArrayCheckbox'
import classes from './CheckOutForm.scss'

export const CheckOutForm = (props) => {
  let {
    fields: {
      services,
      satisfaction,
    },
    handleSubmit,
    requesting,
    currentAccount,
    errors,
    submitFailed,
  } = props

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

  const identificationTooltip = (
    <Tooltip id="tooltip">This is optional and only used for helping us identify you in the future. </Tooltip>
  )

  const demographicTooltip = (
    <Tooltip id="tooltip">
      We ask this question for the purpose of collecting information about whom we serve,
      and how to better reach at-risk demographics.
    </Tooltip>
  )

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <div className={classnames(classes.gender, classes.section)}>
        <div className={classes.inputGroup}>
          <label className={classes.fieldName}>Gender</label>

          <div className={classes.horizontalInputs}>
            <div className={classes.toggleInputGroup}>
              <label>
                <input
                  {...gender}
                  type="radio"
                  value="Male"
                  checked={gender.value === 'Male'}
                />
                Male
              </label>
            </div>

            <div className={classes.toggleInputGroup}>
              <label>
                <input
                  {...gender}
                  type="radio"
                  value="Female"
                  checked={gender.value === 'Female'}
                />
                Female
              </label>
            </div>

            <div className={classes.toggleInputGroup}>
              <label>
                <input
                  {...gender}
                  type="radio"
                  value="Non-binary"
                  checked={gender.value === 'Non-binary'}
                />
                Non-binary gender
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className={classnames(classes.medical, classes.section)}>
        <div className={classes.inputGroup}>
          <label className={classes.fieldName}>What medical services would you like today?</label>
          <div className={classnames(classes.inputColumns, classes['hide-on-phone'])}>
            <div className={classes.inputColumn}>
              {MEDICAL_CHOICES.filter((e, i) => i % 2 === 0).map(_medicalChoice => (
                <div className={classes.toggleInputGroup}>
                  <label>
                    <ArrayCheckbox field={medicalServices} value={_medicalChoice} />
                    {_medicalChoice}
                  </label>
                </div>
              ))}
            </div>
            <div className={classes.inputColumn}>
              {MEDICAL_CHOICES.filter((e, i) => i % 2 === 1).map(_medicalChoice => (
                <div className={classes.toggleInputGroup}>
                  <label>
                    <ArrayCheckbox field={medicalServices} value={_medicalChoice} />
                    {_medicalChoice}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={classes['hide-on-tablet']}>
            {MEDICAL_CHOICES.map(_medicalChoice => (
              <div className={classes.toggleInputGroup}>
                <label>
                  <ArrayCheckbox field={medicalServices} value={_medicalChoice} />
                  {_medicalChoice}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={classes.support + " " + classes.section}>
        <div className={classes.inputGroup}>
          <label className={classes.fieldName}>What support services would you like today?</label>
          <div className={classes.inputColumns + " " + classes["hide-on-phone"]}>
            <div className={classes.inputColumn}>
              {SUPPORT_CHOICES.filter((e, i) => i % 2 === 0).map(_supportChoice => (
                <div className={classes.toggleInputGroup}>
                  <label>
                    <ArrayCheckbox field={supportServices} value={_supportChoice} />
                    {_supportChoice}
                  </label>
                </div>
              ))}
            </div>
            <div className={classes.inputColumn}>
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
          <div className={classes["hide-on-tablet"]}>
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

      {
        (() => {
          let hasErrors = false
          for (let key in errors) {
            hasErrors = true
          }

          return (
            <div className={classes.errorNotice + (hasErrors && submitFailed ? '' : ' hidden')}>
              Required fields are missing! Please review the form.
            </div>
          )
        })()
      }
    </form>
  )
}

CheckOutForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  requesting: PropTypes.bool.isRequired,
  updateInfo: PropTypes.func.isRequired,
  clearInfo: PropTypes.func.isRequired,
}

export default CheckOutForm
