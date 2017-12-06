import React, { PropTypes } from 'react'
import {
  Button,
  Glyphicon,
  Grid,
  Row,
  Col
} from 'react-bootstrap'

import classes from './CheckOutForm.scss'

const ServicesPartial = (props) => {
  let services = props.fields

  return (
    <Row>
      <Col xs={12}>
        <Row>
          {Object.keys(services).map(serviceName => {
            const service = services[serviceName]

            return (
              <Col
                xs={12}
                className={classes.formItemContainer}
                key={serviceName}
              >
                <label>{serviceName}</label>
                <Row>
                  {['Applied', 'Received', 'Drop In', 'None'].map(value => (
                    <Col xs={3}>
                      <label>
                        <input
                          {...service}
                          type="radio"
                          value={value}
                          checked={service.value === value}
                        />
                      {value}
                      </label>
                    </Col>
                  ))}
                </Row>
              </Col>
            )
          })}
        </Row>
      </Col>
    </Row>
  )
}

ServicesPartial.propTypes = {
  fields: PropTypes.object.isRequired,
}

const SatisfactionPartial = (props) => {
  let {satisfaction} = props.fields

  return (

    <Row>
    <Col xs={12} sm={6} className={classes.inputGroup}>
      <label className={classes.fieldName}>Were you overall satisfied with your services today?</label>
      <Row>
        <Col xs={6}>
          <label>
            <input
              type="radio"
              {...isOverallSatisfied}
              value="true"
              checked={isOverallSatisfied.value === 'true'}
            />
            Yes
          </label>
        </Col>

        <Col xs={6}>
          <label>
            <input
              type="radio"
              {...isOverallSatisfied}
              value="false"
              checked={isOverallSatisfied.value === 'false'}
            />
            No
          </label>
        </Col>
      </Row>
    </Col>

      <Col
        xs={12}
        className={classes.formItemContainer}
      >
        <label>Satisfaction</label>
        <Row>
          {['1 😩', '2 🙁', '3 😕', '4 🙂', '5 😀'].map(value => (
            <Col xs={2} key={value}>
              <label>
                <input
                  {...satisfaction}
                  type="radio"
                  value={value[0]}
                  checked={satisfaction.value === value[0]}
                />
                {value}
              </label>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

SatisfactionPartial.propTypes = {
  fields: PropTypes.object.isRequired,
}

const NotesPartial = (props) => {
  let { notes } = props.fields

  return (
    <Row>
      <Col
        xs={12}
        className={classes.formItemContainer}
      >
        <label>Notes (optional)</label>
        <Row>
          <textarea
            {...notes}
            placeholder="Enter notes here"
            value={notes.value}
          />
        </Row>
      </Col>
    </Row>
  )
}

export const CheckOutForm = (props) => {
  let {
    currentEventRegistration,
    errors,
    fields,
    handleSubmit,
    requesting,
    submitFailed,
    updateEventRegistration,
  } = props

  const onSubmit = () => {
    console.log(fields)
    console.log(props)
    updateEventRegistration(fields, currentEventRegistration.id)
  }

  const serviceFields = Object.keys(fields)
    .filter(fieldName => (fieldName !== 'Satisfaction' && fieldName !== 'Notes'))
    .reduce(
      (_fields, fieldName) => {
        _fields[fieldName] = fields[fieldName]
        return _fields
      },
      {},
    )

  const satisfactionFields = {
    satisfaction: fields.Satisfaction,
  }

  const notesFields = {
    notes: fields.Notes
  }

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid>
        <ServicesPartial fields={serviceFields} />
        <SatisfactionPartial fields={satisfactionFields} />
        <NotesPartial fields={notesFields} />
      </Grid>

      <div>
        <Button
          bsStyle="primary"
          type="submit"
          disabled={requesting}
        >
          {requesting
            ? <Glyphicon className="spinning" glyph="refresh" />
            : 'Submit'
          }
        </Button>
      </div>

      {(Object.keys(errors).length && submitFailed)
        ? <div>
          Required fields are missing! Please review the form.
        </div>
        : null
      }
    </form>
  )
}

CheckOutForm.propTypes = {
  currentEventRegistration: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  requesting: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  updateEventRegistration: PropTypes.func.isRequired,
  // clearInfo: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
}

export default CheckOutForm
