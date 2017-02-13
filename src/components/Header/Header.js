import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <div className={classes.container}>
      <IndexLink to="/">
        <h1 className={classes.heading}>
          Project Homeless Connect 65
        </h1>
      </IndexLink>
    </div>
    <div>
      <Link to='/' onlyActiveOnIndex={true} activeClassName={classes.current}>
        Home
      </Link>
      {' · '}
      <Link to='/check-in' activeClassName={classes.current}>
        Check In
      </Link>
      {' · '}
      <Link to='/check-out' activeClassName={classes.current}>
        Check Out
      </Link>
    </div>
  </div>
)

export default Header
