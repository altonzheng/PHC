import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

import SearchBar from '../containers/SearchBarContainer'
import classes from './Account.scss'

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

export const Account = (props) => (
  <div className={classes.container}>
    <h3 className={classes.header}>Welcome!</h3>

    {props.station === 'check-in' && <CheckInRegistrationPartial />}

    <div className={classes.search}>
      Search for an existing client
    </div>

    <SearchBar />
  </div>
)

Account.propTypes = {
  station: PropTypes.string.isRequired,
}

export default Account
