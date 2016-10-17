import React from 'react'
import { Link } from 'react-router'
import { LinkContainer} from 'react-router-bootstrap'
import { Button } from 'react-bootstrap';
import SearchBar from '../containers/SearchBarContainer'
import classes from './Account.scss'

export const Account = (props) => (
  <div className={classes.container}>
    <h3 className={classes.header}> Welcome</h3>
    <div className={classes.register}>
      Register a new client
    </div>

    <LinkContainer to={{
        pathname: "/check-in",
        hash: "#new"
      }}>
      <Button
        bsStyle="primary"
        to="/check-in"
      >
      Register
      </Button>
    </LinkContainer>

    <div className={classes.search}>
      Search for an existing client
    </div>

    <SearchBar />
  </div>
)

export default Account
