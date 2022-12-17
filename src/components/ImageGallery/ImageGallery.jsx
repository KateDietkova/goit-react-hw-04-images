import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images = [], prevImg }) => {
  const myRef = useRef();

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
      images.length !== prevImg.length &&
      prevImg.length !== 0
    ) {
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
