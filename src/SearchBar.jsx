// @flow
import React from 'react';
import { TextField } from 'material-ui';

import styles from './styles';
const { centerFlex } = styles;

import ResponsiveContainer from './ResponsiveContainer';

const placeholder = 'Search for brands';

const DesktopSearchBar = ({ value, onChange }) => (
  <div style={ centerFlex }>
    <TextField
      value={ value }
      onChange={ onChange }
      floatingLabelText={ placeholder }
    />
  </div>
);

const MobileSearchBar = ({ value, onChange }) => (
  <div style={ centerFlex }>
    <TextField
      value={ value }
      onChange={ onChange }
      hintText={ placeholder }
      style={{
        width: '100%',
        height: 200
      }}
      inputStyle={{
        fontSize: 100,
        textAlign: 'center'
      }}
      hintStyle={{
        textAlign: 'center',
      }}
    />
  </div>
);

export default ({ value, onChange }: { value: string, onChange: () => void }) => ResponsiveContainer({
  mobileComponent: <MobileSearchBar value={ value } onChange={ onChange } />,
  desktopComponent: <DesktopSearchBar value={ value } onChange={ onChange } />
});