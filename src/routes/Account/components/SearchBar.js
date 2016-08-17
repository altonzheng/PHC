import React from 'react'
import Autosuggest from 'react-autosuggest'
import classes from './SearchBar.scss'

const AccountSuggestion = (props) => {
  const handleClick = () => {
    props.loadAccountData(props.id)
  }

  return (
    <li className={classes.suggestionItem} onClick={handleClick}>
      <span className={classes.name}>{ props.name }</span>
      <span className={classes.birthdate}>{ props.birthdate }</span>

    </li>
  )
}

class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {value: '', suggestions: [], searching: false};
    this.suggest = this.suggest.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({value: e.target.value, suggestions: []});
  }

  suggest() {
    if (!this.props.accountSearcher) {
      return
    }

    this.setState({
      suggestions: this.props.accountSearcher.search(this.state.value).slice(0,5)
    })
  }

  _handleKeyPress (e) {
    e.persist()

    if (e.key === 'Enter') {
      this.suggest()
    }
  }

  render() {
    const searchButton = (
      <button
        className="button button--large button--success"
        onClick={this.suggest}
        disabled={this.state.searching}
      >
        {this.state.searching ? "Searching..." : "Search!"}
      </button>
    )

    const loadAccountsButton = (
      <button
        className="button button--large button--success"
        onClick={this.props.fetchAccounts}
        disabled={this.props.fetching}
      >
        {this.props.fetching ? "Loading..." : "Load Accounts"}
      </button>
    )

    return (
      <div>
        <div className={classes.inputGroup}>
          <input
            className={classes.searchInput + " textInput"}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyPress={this._handleKeyPress.bind(this)}
          />

        {this.props.accounts ? searchButton : loadAccountsButton}

        </div>

        <ul className={classes.suggestionList}>
          {
            this.state.suggestions.map(suggestion => {
              return (
                <AccountSuggestion
                  loadAccountData={this.props.loadAccountData}
                  name={suggestion.name}
                  id={suggestion.id}
                  birthdate={suggestion.birthdate}
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
