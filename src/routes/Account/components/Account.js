import React from 'react'
import SearchBar from './SearchBar'
import classes from './Account.scss'

export const Account = (props) => (
  <div>
    <SearchBar {...props}/>

    <button className='btn btn-default' onClick={props.fetchAccounts} disabled={props.fetching} >
      { props.fetching ? "Loading..." : "Load Salesforce Accounts" }
    </button>

    <div>
      {
        props.accounts && props.accounts.length
        ?
          <div>
            {props.accounts.length} accounts indexed
          </div>
        : null
      }
    </div>
  </div>
)

export default Account
