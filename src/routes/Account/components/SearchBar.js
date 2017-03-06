import React, { PropTypes } from 'react'
import classnames from 'classnames'
import {
  Button,
  Glyphicon,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { Addon } from 'react-bootstrap/lib/InputGroup'

import * as STATIONS from '../../../constants/stations'
import classes from './SearchBar.scss'

const AccountSuggestion = (props) => {
  const handleClick = () => {
    if (!props.fetching) {
      if (props.station === STATIONS.CHECK_IN) {
        props.loadAccountData(props.accountId)
      } else if (props.station === STATIONS.CHECK_OUT) {
        props.loadEventRegistration(props.accountId)
      }
    }
  }

  return (
    <Button
      bsSize="small"
      className={classes.suggestionItem}
      onClick={handleClick}
      disabled={props.fetching}
      block
    >
      <span className={classes.name}>{props.name}</span>
      <span className={classes.birthdate}>{props.birthdate}</span>
    </Button>
  )
}

AccountSuggestion.propTypes = {
  accountId: PropTypes.string,
  birthdate: PropTypes.string,
  fetching: PropTypes.bool,
  loadAccountData: PropTypes.func,
  loadEventRegistration: PropTypes.func,
  name: PropTypes.string,
  station: PropTypes.string,
}

class SearchBar extends React.Component {
  static propTypes = {
    searchForAccount: PropTypes.func,
    searching: PropTypes.bool,
    searchResults: PropTypes.arrayOf(PropTypes.object),
    loadAccountData: PropTypes.func,
    loadEventRegistration: PropTypes.func,
    fetching: PropTypes.bool,
    station: PropTypes.string,
  }

  state = {
    value: '',
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  suggest = () => {
    this.props.searchForAccount(this.state.value)
  }

  handleKeyPress = (e) => {
    // TODO: Don't persist this event, probably unnecessary
    e.persist()

    if (e.key === 'Enter') {
      this.suggest()
    }
  }


  render() {
    return (
      <div>
        <div className={classes.inputGroup}>
          <InputGroup>
            <Addon>
              <Glyphicon glyph="search" />
            </Addon>
            <FormControl
              className={classnames(classes.searchInput, 'textInput')}
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
          </InputGroup>

          <Button
            bsStyle="primary"
            onClick={this.suggest}
            disabled={this.props.searching}
            className={classes.searchButton}
          >
            {this.props.searching ? 'Searching...' : 'Search'}
          </Button>
        </div>

        <div>
          <div className={classnames(classes.searchHeader, 'center-block')}>
            Search Results (Name, Date of Birth)
          </div>

          {this.props.searchResults.length === 0 ? 'No results.' : null}

          <ul className={classes.suggestionList}>
            {this.props.searchResults.map(result => (
              <AccountSuggestion
                accountId={result.accountId}
                birthdate={result.birthdate}
                eventRegistrationId={result.eventRegistrationId}
                fetching={this.props.fetching}
                key={result.accountId}
                loadAccountData={this.props.loadAccountData}
                loadEventRegistration={this.props.loadEventRegistration}
                name={result.name}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SearchBar
