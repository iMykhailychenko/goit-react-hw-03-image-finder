import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default class Button extends Component {
  static propTypes = {
    onLoadMore: PropTypes.func.isRequired,
  };

  state = {
    page: 2,
  };

  componentDidUpdate() {
    const { page } = this.state;
    if (page <= 2) return;

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    const { onLoadMore } = this.props;
    const { page } = this.state;
    onLoadMore(page);
  };

  render() {
    return (
      <div className="Button-wrp">
        <button className="Button" type="button" onClick={this.handleClick}>
          Load more
        </button>
      </div>
    );
  }
}
