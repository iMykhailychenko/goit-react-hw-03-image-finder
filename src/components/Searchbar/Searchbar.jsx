import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { search } = this.state;
    const correctSearch = search
      .replace(/ +/g, ' ')
      .trim()
      .toLocaleLowerCase();
    const { onSubmit } = this.props;

    if (correctSearch) {
      onSubmit(correctSearch);
      this.setState({
        search: '',
      });
    }
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="search"
            autoComplete="off"
            name="search"
            autoFocus
            placeholder="Search images and photos"
            onInput={this.handleInput}
          />
        </form>
      </header>
    );
  }
}
