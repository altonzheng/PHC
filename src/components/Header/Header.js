import React from 'react'
import { IndexLink } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div className={classes.container}>
    <IndexLink to="/">
      <h1 className={classes.heading}>
        Project Homeless Connect
      </h1>
    </IndexLink>
  </div>
)

export default Header
