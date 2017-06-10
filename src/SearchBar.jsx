import React from 'react';
import { TextField } from 'material-ui';

import styles from './styles';
const { centerFlex } = styles;

import ResponsiveContainer from './ResponsiveContainer';

const DesktopSearchBar = ({ value, onChange }) => (
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

const MobileSearchBar = ({ value, onChange }) => (
  <div style={ centerFlex }>
    <TextField
      id="brandInput" name="brandInput"
      value={ value }
      onChange={ onChange }
      floatingLabelText="Search by brand"
      floatingLabelStyle={{ color: '#9A9998' }}
      underlineFocusStyle={{ color: '#9A9998' }}
      floatingLabelFocusStyle={{ color: '#9A9998' }}
      style={{
        width: '100%',
        height: 100
      }}
      inputStyle={{
        fontSize: 50,
        textAlign: 'center'
      }}
    />
  </div>
);

export default ({ value, onChange }) => ResponsiveContainer({
  mobileComponent: <MobileSearchBar value={ value } onChange={ onChange } />,
  desktopComponent: <DesktopSearchBar value={ value } onChange={ onChange } />
});