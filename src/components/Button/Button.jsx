import { MdMore } from 'react-icons/md';
import { ButtonLoadMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <ButtonLoadMore type="button" onClick={onLoadMore}>
      Load more
      <MdMore size="32" />
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
