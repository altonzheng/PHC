import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <div className={classes.container}>
      <IndexLink to="/">
        <h1 className={classes.heading}>
          Project Homeless Connect
        </h1>
      </IndexLink>
    </div>
    <div>
      <Link to='/check-in'>
        Check In
      </Link>
      {' · '}
      <Link to='/services'>
        Services
      </Link>
      {' · '}
      <Link to='/'>
        Accounts
      </Link>
      {' · '}
      <Link to='/login'>
        Login
      </Link>
    </div>
  </div>
)

export default Header
