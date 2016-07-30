import React from 'react'
import { Link } from 'react-router'
import classes from './HomeView.scss'

// TODO: Style this and make it look nice!

export const HomeView = () => (
  <div>
    <Link to='/check-in'>
      Check In
    </Link>
    {' · '}
    <Link to='/services'>
      Services
    </Link>
    {' · '}
    <Link to='/account'>
      Accounts
    </Link>
    {' · '}
    <Link to='/login'>
      Login
    </Link>
  </div>
)

export default HomeView
