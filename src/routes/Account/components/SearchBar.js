import React from 'react'
import Autosuggest from 'react-autosuggest'
import classes from './SearchBar.scss'

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
      <li className={classes.suggestionItem} onClick={this.handleClick}>
        <span>{ this.props.name }</span>
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
        <div className={classes.inputGroup}>
          <input
            className={classes.searchInput + " textInput"}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />

          <button className="button button--s button--default" onClick={this.suggest} disabled={this.state.searching} >
            {this.state.searching ? "Searching..." : "Search!"}
          </button>
        </div>

        <ul className={classes.suggestionList}>
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
