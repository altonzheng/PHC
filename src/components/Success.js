import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

export const Success = (props) => (
  <div>
    <h1>{props.title}</h1>
    <Button bsStyle="primary" onClick={props.next}>{props.body}</Button>
  </div>
)

Success.propTypes = {
  body: PropTypes.string,
  next: PropTypes.func,
  title: PropTypes.string,
}

export default Success
