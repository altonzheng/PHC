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
//
const NamePartial = (props) => {
  let {firstName, lastName} = props.fields

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
    </Row>
  )
}

NamePartial.propTypes = {
  fields: PropTypes.object.isRequired,
}
//

//
const OverallSatisfactionPartial = (props) => {
  let {isOverallSatisfied, recommendation, hasUniqueService, uniqueServices} = props.fields

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
        <label>Recommend event to friends and family members?</label>
        <Row>
          {['1 😩', '2 🙁', '3 😕', '4 🙂', '5 😀'].map(value => (
            <Col xs={2} key={value}>
              <label>
                <input
                  {...recommendation}
                  type="radio"
                  value={value[0]}
                  checked={recommendation.value === value[0]}
                />
                {value}
              </label>
            </Col>
          ))}
        </Row>
      </Col>

      <Col xs={12} sm={6} className={classes.inputGroup}>
        <label className={classes.fieldName}>In general, do you feel you received services here that you would not have been able to receive otherwise?</label>
        <Row>
          <Col xs={6}>
            <label>
              <input
                type="radio"
                {...hasUniqueService}
                value="true"
                checked={hasUniqueService.value === "true"}
              />
              Yes
            </label>
          </Col>

           <Col xs={6}>
            <label>
              <input
                type="radio"
                {...hasUniqueService}
                value="false"
                checked={hasUniqueService.value === "false"}
              />
              No
            </label>
          </Col>
        </Row>
      </Col>
     {
      /* only show the duration if ``isHomeless`` */
      hasUniqueService.value === "true" &&
        <Col xs={12} sm={6} className={classes.inputGroup}>
          <label className={classes.fieldName}>If yes, which ones?</label>
          <textarea
            {...uniqueServices}
            placeholder="Enter unique services here"
            value={uniqueServices.value}
          />

        </Col>
    }
  </Row>

  )
}

OverallSatisfactionPartial.propTypes = {
  fields: PropTypes.object.isRequired,
}
//

//
/*
const RecommendationPartial = (props) => {
  let {recommendation} = props.fields

  return (
    <Row>
      <Col
        xs={12}
        className={classes.formItemContainer}
      >
        <label>Recommend event to friends and family members?</label>
        <Row>
          {['1 😩', '2 🙁', '3 😕', '4 🙂', '5 😀'].map(value => (
            <Col xs={2} key={value}>
              <label>
                <input
                  {...recommendation}
                  type="radio"
                  value={value[0]}
                  checked={recommendation.value === value[0]}
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


RecommendationPartial.propTypes = {
  fields: PropTypes.object.isRequired,
}
//
const receivedUnique = (props) => {
  let {receivedUnique} = props.fields

  return (
    <Row>
      <Col
        xs={12}
        className={classes.formItemContainer}
      >
        <label>Recommend event to friends and family members?</label>
        <Row>
          {['1 😩', '2 🙁', '3 😕', '4 🙂', '5 😀'].map(value => (
            <Col xs={2} key={value}>
              <label>
                <input
                  {...recommendation}
                  type="radio"
                  value={value[0]}
                  checked={receivedUnique.value === value[0]}
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

RecommendationPartial.propTypes = {
  fields: PropTypes.object.isRequired,
}
*/

//
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
//

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
    updateEventRegistration(fields, currentEventRegistration.id)
  }

  const serviceFields = Object.keys(fields)
    .filter(fieldName => (fieldName !== 'Satisfaction' && fieldName !== 'Notes'
    && fieldName !== 'First Name' && fieldName !== 'Last Name' && fieldName !== 'Were you overall satisfied with your services today?'
    && fieldName !== 'Recommend event to friends and family members?' && fieldName !== 'In general, do you feel you received services here that you would not have been able to receive otherwise?'
    && fieldName !== 'If yes, which ones?'))
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

  const overallSatisfactionFields = {
    isOverallSatisfied: fields.isOverallSatisfied,
    recommendation: fields.recommendation,
    hasUniqueService: fields.hasUniqueService,
    uniqueServices: fields.uniqueServices
  }

  const nameFields = {
    firstName: fields.firstName,
    lastName: fields.lastName,
  }

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid>
        <NamePartial fields={nameFields} />
        <ServicesPartial fields={serviceFields} />
        <OverallSatisfactionPartial fields={OverallSatisfactionPartial} />
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
