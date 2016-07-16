import React from 'react'
import Helmet from 'react-helmet'
import { IndexLink } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <Helmet title="Project Homeless Connect" />
    <h1 className={classes.heading}>
      <IndexLink to="/">Project Homeless Connect</IndexLink>
    </h1>
  </div>
)

export default Header
