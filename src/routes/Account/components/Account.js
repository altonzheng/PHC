import React from 'react'
import { Link } from 'react-router'
import SearchBar from '../containers/SearchBarContainer'
import classes from './Account.scss'

export const Account = (props) => (
  <div className={classes.container}>
    <h2>Welcome to Check-In!</h2>

    <Link
      to="/check-in"
      className="button button--xl button--default"
    >
      Register a new client
    </Link>

    <div className={classes.search}>
      or search for an existing client...
    </div>

    <SearchBar />
  </div>
)

export default Account
