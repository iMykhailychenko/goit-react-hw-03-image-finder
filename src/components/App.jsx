import React, { Component } from 'react';

// impor components
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

// import utils
import fetchImg from './Utils/ajaxQuery';

const KEY = '?key=14898579-fa1d2465db163140d99de90b7';

export default class App extends Component {
  state = {
    query: '',
    response: [],
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query === query) return;

    this.setState({ isLoading: true });

    fetchImg(KEY, query)
      .then(response => {
        this.setState(prevState => ({ response: [...response] }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  handleLoadMore = page => {
    const { query } = this.state;

    fetchImg(KEY, query, page)
      .then(nextResponse => {
        this.setState(({ response }) => ({
          response: [...response, ...nextResponse],
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { response, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          response={response}
          isLoading={isLoading}
          onLoadMore={this.handleLoadMore}
        />
      </>
    );
  }
}