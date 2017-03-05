import React, { PropTypes } from 'react'
import {
  Button,
  Tooltip,
  OverlayTrigger,
  Glyphicon,
  Row,
  Col,
} from 'react-bootstrap'
import classnames from 'classnames'

import 'react-select/dist/react-select.css'
import ArrayCheckbox from '../../../components/ArrayCheckbox'
import classes from './CheckOutForm.scss'

const ServicesPartial = (props) => {
  let { services } = props.fields

  return (
    <Row>
      <Col xs={12}>
        <label className={classes.fieldName}>Services</label>
        <Row>
          {services.map(service => (
            <Col xs={12} sm={6} className={classes.inputGroup} key={service}>
              <label>{service}</label>
              <Row>
                <Col xs={12}>
                  <label>
                    <input
                      {...service}
                      type="radio"
                      value="Male"
                      checked={service.value === 'Male'}
                    />
                    Male
                  </label>
                </Col>

                <Col xs={12}>
                  <label>
                    <input
                      {...service}
                      type="radio"
                      value="Female"
                      checked={service.value === 'Female'}
                    />
                    Female
                  </label>
                </Col>

                <Col xs={12}>
                  <label>
                    <input
                      {...service}
                      type="radio"
                      value="Non-binary"
                      checked={service.value === 'Non-binary'}
                    />
                    Non-binary gender
                  </label>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

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
    }

    props.updateInfo(newFields, currentAccount && currentAccount.id)
  }

  const _onClear = () => {
    props.clearInfo()
  }

  return (
    <div>
      <ServicesPartial fields={{services}} />
    </div>
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
