import React, { PropTypes } from 'react'
import {
  Button,
  Glyphicon,
  Grid,
  Row,
  Col,
} from 'react-bootstrap'

import 'react-select/dist/react-select.css'

const ServicesPartial = (props) => {
  let services = props.fields

  return (
    <Row>
      <Col xs={12}>
        <label>Services</label>
        <Row>
          {Object.keys(services).map(serviceName => {
            const service = services[serviceName]

            return (
              <Col xs={12} key={serviceName}>
                <label>{serviceName}</label>
                <Row>
                  <Col xs={3}>
                    <label>
                      <input
                        {...service}
                        type="radio"
                        value="Applied"
                        checked={service.value === 'Applied'}
                      />
                    Applied
                    </label>
                  </Col>

                  <Col xs={3}>
                    <label>
                      <input
                        {...service}
                        type="radio"
                        value="Received"
                        checked={service.value === 'Received'}
                      />
                    Received
                    </label>
                  </Col>

                  <Col xs={3}>
                    <label>
                      <input
                        {...service}
                        type="radio"
                        value="Drop In"
                        checked={service.value === 'Drop In'}
                      />
                      Drop In
                    </label>
                  </Col>

                  <Col xs={3}>
                    <label>
                      <input
                        {...service}
                        type="radio"
                        value="None"
                        checked={service.value === 'None'}
                      />
                    None
                    </label>
                  </Col>
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
  return (
    <Row>
      <Col xs={12}>
        R u satisfied
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
    satisfaction: fields.satisfaction,
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
