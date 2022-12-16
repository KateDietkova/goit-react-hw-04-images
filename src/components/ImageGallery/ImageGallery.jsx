import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images = [], prevImg }) => {
  const myRef = React.createRef();

  useEffect(() => {
    const smoothScrolling = () => {
      const firstImage = myRef.current.firstElementChild;
      if (!firstImage) {
        return;
      }
      const { height: cardHeight } = firstImage.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2.5,
        behavior: 'smooth',
      });
    };

    if (
      images.length >= 12 &&
      images.length !== prevImg.length &&
      prevImg.length !== 0
    ) {
      console.log(images.length, prevImg.length);
      smoothScrolling();
    }
  }, [images, prevImg, myRef]);

  return (
    <ImageGalleryStyled ref={myRef}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </ImageGalleryStyled>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
