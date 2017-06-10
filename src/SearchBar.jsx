import React from 'react';
import { TextField } from 'material-ui';

import styles from './styles';
const { centerFlex } = styles;

const SearchBar = ({ value, onChange }) => (
  <div style={ centerFlex }>
    <TextField
      id="brandInput" name="brandInput"
      value={ value }
      onChange={ onChange }
      floatingLabelText="Search by brand"
      floatingLabelStyle={{ color: '#9A9998' }}
      underlineFocusStyle={{ color: '#9A9998' }}
      floatingLabelFocusStyle={{ color: '#9A9998' }}
    />
  </div>
);

export default SearchBar;