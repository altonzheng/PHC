import React from 'react'
import Autosuggest from 'react-autosuggest'
import theme from './SearchBar.scss'

class AccountSuggestion extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.loadAccountData(this.props.id)
  }

  render() {
    return (
      <li className='suggestionItem' onClick={ this.handleClick }>
        <span className='name'>{ this.props.name }</span>
      </li>
    )
  }
}

class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {value: '', suggestions: [], searching: false};
    this.suggest = this.suggest.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value, suggestions: []});
  }

  suggest() {
    if (!this.props.accountSearcher) {
      return
    }

    this.setState({
      suggestions: this.props.accountSearcher.search(this.state.value).slice(0,5)
    })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />

        <button className='button button--default' onClick={this.suggest} disabled={this.state.searching} >
          { this.state.searching ? "Searching..." : "Search!" }
        </button>

        <ul className='suggestionsList' style={{listStyleType: 'none'}}>
          {
            this.state.suggestions.map(suggestion => {
              return (
                <AccountSuggestion
                  loadAccountData={this.props.loadAccountData}
                  name={suggestion.name}
                  id={suggestion.id}
                />
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default SearchBar
