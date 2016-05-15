import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1>Project Homeless Connect</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName={classes.activeRoute}>
      Counter [for reference]
    </Link>
    {' · '}
    <Link to='/check-in' activeClassName={classes.activeRoute}>
      Check In
    </Link>
  </div>
)

export default Header
