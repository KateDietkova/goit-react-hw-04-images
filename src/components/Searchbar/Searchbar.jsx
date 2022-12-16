import { Formik } from 'formik';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  SearchbarStyled,
  FormStyled,
  SearchFormButtonStyled,
  FormInputStyled,
} from './Searchbar.styled';

const initialValues = { queryValue: '' };

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarStyled>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <FormStyled>
          <SearchFormButtonStyled type="submit">
            <BsSearch size="24"/>
          </SearchFormButtonStyled>

          <FormInputStyled
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="queryValue"
          />
        </FormStyled>
      </Formik>
    </SearchbarStyled>
  );
};


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};