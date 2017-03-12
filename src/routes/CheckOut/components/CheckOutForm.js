import React, { PropTypes } from 'react'
import {
  Button,
  Glyphicon,
  Grid,
  Row,
  Col,
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
      <Col
        xs={12}
        className={classes.formItemContainer}
      >
        <label>Satisfaction</label>
        <Row>
          {['1', '2', '3', '4', '5'].map(value => (
            <Col xs={2} key={value}>
              <label>
                <input
                  {...satisfaction}
                  type="radio"
                  value={value}
                  checked={satisfaction.value === value}
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
    updateEventRegistration(fields, currentEventRegistration.id)
  }

  const serviceFields = Object.keys(fields)
    .filter(fieldName => fieldName !== 'Satisfaction')
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

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid>
        <ServicesPartial fields={serviceFields} />
        <SatisfactionPartial fields={satisfactionFields} />
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
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  requesting: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  updateEventRegistration: PropTypes.func.isRequired,
  clearInfo: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
}

export default CheckOutForm
