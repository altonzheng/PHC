import React from 'react'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
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

    <div className={classes.search}>or search for an existing client...</div>

    <SearchBar {...props}/>

    <button
      className="button button--xl button--success"
      onClick={props.fetchAccounts}
      disabled={props.fetching}
    >
      {props.fetching ? "Loading..." : "Load Accounts"}
    </button>

    {
      props.accounts && props.accounts.length
        ?
          <div>
            {props.accounts.length} accounts indexed
          </div>
        : null
    }
  </div>
)

export default Account
