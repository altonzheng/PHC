import React from 'react'
import classes from './SearchBar.scss'
import { Button, Glyphicon, InputGroup, FormControl } from 'react-bootstrap';

const AccountSuggestion = (props) => {
  const handleClick = () => {
    props.fetching ? null : props.loadAccountData(props.id)
  }

  return (
    <Button
      bsSize="small"
      className={classes.suggestionItem}
      onClick={handleClick}
      disabled={props.fetching}
      block
    >
      <span className={classes.name}>{ props.name }</span>
      <span className={classes.birthdate}>{ props.birthdate }</span>
    </Button>
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
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="search"/ >
            </InputGroup.Addon>
            <FormControl
              className={classes.searchInput + " textInput"}
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyPress={this._handleKeyPress.bind(this)}
            />
          </InputGroup>

          <Button
            bsStyle="primary"
            onClick={this.suggest}
            disabled={this.props.searching}
            hidden="true"
          >
            {this.props.searching ? "Searching... " : "Search "}
          </Button>

        </div>

        <div className={classes.searchHeader + (this.props.searchResults > 0 ? "" : " hidden")} >
          Search Results (Name, Date of Birth)
        </div>

        <ul className={classes.suggestionList}  >

          {
            this.props.searchResults.map(result => {
              return (
                <AccountSuggestion
                  loadAccountData={this.props.loadAccountData}
                  name={result.name}
                  id={result.id}
                  birthdate={result.birthdate}
                  key={result.id}
                  fetching={this.props.fetching}
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
