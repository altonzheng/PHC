import React from 'react'
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
    this.state = { value: '' };
    this.suggest = this.suggest.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  suggest() {
    this.props.searchForAccount(this.state.value);
  }

  _handleKeyPress (e) {
    e.persist()

    if (e.key === 'Enter') {
      this.suggest()
    }
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
            onKeyPress={this._handleKeyPress.bind(this)}
          />

        <button
          className="button button--large button--success"
          onClick={this.suggest}
          disabled={this.props.searching}
        >
          {this.props.searching ? "Searching..." : "Search!"}
        </button>

        </div>

        <ul className={classes.suggestionList}>
          {
            this.props.searchResults.map(result => {
              return (
                <AccountSuggestion
                  loadAccountData={this.props.loadAccountData}
                  name={result.name}
                  id={result.id}
                  birthdate={result.birthdate}
                  key={result.id}
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
