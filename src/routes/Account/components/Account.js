import React, { PropTypes } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router'

import SearchBar from '../containers/SearchBarContainer'
import classes from './Account.scss'
import * as STATIONS from '../../../constants/stations'

const CheckInRegistrationPartial = (props) => (
  <div>
    <div className={classes.register}>
      Register a new client
    </div>

    <Button
      bsStyle="primary"
      to="/check-in"
    >
      <Link
        to={{
          pathname: '/check-in',
          hash: '#new',
        }}
      >
        Register
      </Link>
    </Button>
  </div>
)

const AccountModal = (props) => (
  <Modal show={props.showModal} onHide={props.closeModal}>
    <Modal.Body>
      {props.message}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.closeModal}>Close</Button>
    </Modal.Footer>
  </Modal>
)

export const Account = (props) => (
  <div className={classes.container}>
    <h3 className={classes.header}>{props.station === STATIONS.CHECK_IN ? "Welcome!" : "Goodbye!"}</h3>

    {props.station === STATIONS.CHECK_IN && <CheckInRegistrationPartial />}

    <div className={classes.search}>
      Search for an existing client
    </div>

    <AccountModal message={props.modalMessage} showModal={props.showModal} closeModal={props.closeModal}/>

    <SearchBar />
  </div>
)

Account.propTypes = {
  station: PropTypes.string.isRequired,
}

export default Account
