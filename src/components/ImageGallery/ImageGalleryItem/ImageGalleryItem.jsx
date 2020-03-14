import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(img => (
    <li className="ImageGalleryItem" key={img.id}>
      <img
        src={img.webformatURL}
        alt={img.tags}
        data-url={img.largeImageURL}
        className="ImageGalleryItem-image"
        onClick={onClick}
      />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ImageGalleryItem;
