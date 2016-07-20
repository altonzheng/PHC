import React from 'react';
import Fuse from 'fuse.js';
import Autosuggest from 'react-autosuggest';
import theme from './SearchBar.scss'

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  getSuggestions(value) {
    const f = new Fuse(this.props.accounts, {
      keys: ["FirstName", "LastName"],
      threshold: 0.3
    })
    return f.search(value);
  }

  getSuggestionValue(suggestion) { // when suggestion selected, this function tells
    return suggestion.FirstName + " " + suggestion.LastName;        // what should be the value of the input
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.FirstName + " " + suggestion.LastName}</span>
    );
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={this.getSuggestionValue}
                   renderSuggestion={this.renderSuggestion}
                   inputProps={inputProps}
                   theme={theme} />
    );
  }
}

export default SearchBar
