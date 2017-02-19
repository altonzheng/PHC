import React from 'react'
import { IndexLink } from 'react-router'
import { Nav, Navbar } from 'react-bootstrap'

import StationNavDropdown from '../containers/StationNavDropdownContainer.js'

export const Header = () => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <IndexLink to="/">Project Homeless Connect 67</IndexLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <StationNavDropdown />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
