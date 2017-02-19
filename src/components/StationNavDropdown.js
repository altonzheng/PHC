import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap'

const stationToLabel = {
  'check-in': 'Check In',
  'check-out': 'Check Out',
}

const stations = Object.keys(stationToLabel)

export const StationNavDropdown = (props) => {
  const updateStation = (eventKey, event) => props.updateStation(eventKey)

  return (
    <NavDropdown
      onSelect={updateStation}
      title={stationToLabel[props.station]}
      id='station-nav-dropdown'
    >
      {stations.map(station => (
        <MenuItem key={station} eventKey={station}>{stationToLabel[station]}</MenuItem>
      ))}
    </NavDropdown>
  )
}

StationNavDropdown.propTypes = {
  station: PropTypes.string.isRequired,
  updateStation: PropTypes.func.isRequired,
}

export default StationNavDropdown
