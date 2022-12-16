import { Component } from 'react';
import { ImageGalleryItemStyled, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };

  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
    }));
  };

  render() {
    const { isOpenModal } = this.state;
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;
    return (
      <>
        <ImageGalleryItemStyled onClick={this.toggleModal}>
          <Image src={webformatURL} alt={tags} />
        </ImageGalleryItemStyled>
        {isOpenModal && (
          <Modal
            largeImage={largeImageURL}
            tags={tags}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}