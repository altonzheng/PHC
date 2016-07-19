import React from 'react'
import classes from './Account.scss'

export const Account = (props) => (
  <div>
    <button className='btn btn-default' onClick={props.fetchAccounts}>
      Fetch Accounts!
    </button>
      <div>
        {
          props.accounts.length
          ?
            <div>
                <h3> Salesforce Accounts </h3>
                <ul className='accountList' style={{listStyleType: 'none'}}>
                  {
                    props.accounts.map(account =>
                      <li key={ account.Id }>
                        { account.FirstName + " " + account.LastName }
                        { " (" +  account.Id + ") "}
                      </li>
                    )
                  }
                </ul>
              </div>
          : null
        }
      </div>
  </div>
)

export default Account
