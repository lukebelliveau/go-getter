// @flow
import React from 'react';
import { Dialog, RaisedButton, FlatButton, TextField } from 'material-ui';

import ResponsiveContainer from './ResponsiveContainer';

type Props = {
  brand: string,
  city: string,
  onChangeCity: () => void,
  open: boolean,
  submit: () => void,
  closeDialog: () => void,
};

const BrandDialog = (props: Props) => ResponsiveContainer({
  mobileComponent: <MobileBrandDialog { ...props } />,
  desktopComponent: <DesktopBrandDialog { ...props } />
});

const DesktopBrandDialog = ({ brand, city, onChangeCity, open, submit, closeDialog }) => (
  <Dialog open={ open } actions={ dialogButtons(FlatButton, submit, closeDialog, {}) } onRequestClose={ closeDialog } id="brandDialog" title={ brand }>
      <TextField floatingLabelText="City" value={ city || '' } onChange={ onChangeCity } style={{ margin: 20 }}/>
  </Dialog>
);

const MobileBrandDialog = ({ brand, city, onChangeCity, open, submit, closeDialog }) => (
  <Dialog open={ open } actions={ dialogButtons(RaisedButton, submit, closeDialog, mobileStyles) }
    onRequestClose={ closeDialog } id="brandDialog" actionsContainerStyle={ mobileStyles.buttonContainer }
    title={ brand } titleStyle={ mobileStyles.title }>
      <TextField
        hintText="City" value={ city || '' } onChange={ onChangeCity }
        style={ mobileStyles.text } underlineShow={ false }
      />
  </Dialog>
);


const dialogButtons = (ButtonComponent, submit, close, style) => ([
  <ButtonComponent
    label="Cancel"
    onTouchTap={ close }
    style={ style.buttons }
    labelStyle={ style.label } />,
  <ButtonComponent
    label="Submit"
    primary={true}
    onTouchTap={ submit }
    style={ style.buttons }
    labelStyle={ style.label } />,
]);

const mobileStyles = {
  title: {
    fontSize: 50,
    lineHeight: 1,
  },
  buttonContainer:  {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  text: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 75,
    width: '100%',
    height: 80,
  },
  buttons: {
    height: 125,
  },
  label: {
    fontSize: 50
  }
};

export default BrandDialog;