import { useState } from 'react';
import { ImageGalleryItemStyled, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({image: {webformatURL, largeImageURL, tags}}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(prevState => !prevState);
  };

  return (
    <>
      <ImageGalleryItemStyled onClick={toggleModal}>
        <Image src={webformatURL} alt={tags} />
      </ImageGalleryItemStyled>
      {isOpenModal && (
        <Modal
          largeImage={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
    </>
  );
}


ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};