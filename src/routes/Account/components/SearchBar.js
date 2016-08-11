import React from 'react'
import Fuse from 'fuse.js'
import Autosuggest from 'react-autosuggest'
import theme from './SearchBar.scss'

class AccountSuggestion extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.loadAccountData(this.props.salesforceId)
  }

  render() {
    return (
      <div className='suggestionItem' onClick={ this.handleClick }>
        <span className='firstName'>{ this.props.firstName }</span>
        <span className='lastName'>{ this.props.lastName }</span>
        <span className='salesforceId'>{ this.props.salesforceId }</span>
      </div>
    )
  }
}

class SearchBar extends React.Component {
  constructor() {
    super()

    this.state = {
      value: '',
      suggestions: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
  }

  getSuggestions(value) {
    if (value.trim().length < 4) {
      return []
    }

    const f = new Fuse(this.props.accounts, {
      keys: ["Id", "FirstName", "LastName"],
      threshold: 0.3
    })
    return f.search(value)
  }

  getSuggestionValue(suggestion) {
    return suggestion.FirstName + " " + suggestion.LastName
  }

  renderSuggestion(suggestion) {
    return (
      <AccountSuggestion
        firstName={suggestion.FirstName}
        lastName={suggestion.LastName}
        salesforceId={suggestion.Id}
        loadAccountData={this.props.loadAccountData}
      />
    )
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  render() {
    const { value, suggestions } = this.state
    const inputProps = {
      value,
      onChange: this.onChange
    }

    return (
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={this.getSuggestionValue}
                   renderSuggestion={this.renderSuggestion}
                   inputProps={inputProps}
                   theme={theme} />
    )
  }
}

export default SearchBar
