// react
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

// components
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

// styles
import './ImageGallery.css';

export default class ImageGallery extends Component {
  static defaultProps = {
    isLoading: false,
  };

  static propTypes = {
    response: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    onLoadMore: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  };

  state = {
    url: '',
  };

  handleClick = ({ target }) => {
    const { url } = target.dataset;
    this.setState({ url });
  };

  render() {
    const { response, onLoadMore, isLoading } = this.props;
    const { url } = this.state;

    // перепробовал кучу вариантов, но лучше тернарных операторов ничего не придумал
    // eslint неистово негодует от такого стиля написания
    return response.length === 0 ? (
      <p className="epmpty">
        Please, enter into <mark>search bar</mark> keywords that describe a
        photos you are looking for
      </p>
    ) : isLoading ? (
      <Loader
        className="Loader"
        type="Oval"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    ) : (
      <>
        <ul className="ImageGallery">
          <ImageGalleryItem images={response} onClick={this.handleClick} />
        </ul>
        <Button onLoadMore={onLoadMore} />
        <Modal url={url} />
      </>
    );
  }
}
