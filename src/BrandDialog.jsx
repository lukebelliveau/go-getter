import React from 'react';
import { Dialog, RaisedButton, FlatButton, Card, TextField } from 'material-ui';

import ResponsiveContainer from './ResponsiveContainer';

const BrandDialog = (props) => ResponsiveContainer({
  mobileComponent: <MobileBrandDialog { ...props } />,
  desktopComponent: <DesktopBrandDialog { ...props } />
});

const DesktopBrandDialog = ({ brand, city, onChangeCity, open, submit, closeDialog }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      onTouchTap={ closeDialog }
    />,
    <FlatButton
      label="Submit"
      primary={true}
      onTouchTap={ submit }
    />,
  ];

  return (
    <Dialog open={ open } actions={ actions } onRequestClose={ closeDialog } id="brandDialog" title={ brand }>
      <Card>
        <TextField floatingLabelText="City" value={ city || '' } onChange={ onChangeCity } style={{ margin: 20 }}/>
      </Card>
    </Dialog>
  )
};

const MobileBrandDialog = ({ brand, city, onChangeCity, open, submit, closeDialog }) => {
  const actions = [
    <RaisedButton
      label="Cancel"
      onTouchTap={ closeDialog }
      style={ mobileStyles.buttons }
    />,
    <RaisedButton
      label="Submit"
      primary={true}
      onTouchTap={ submit }
      style={ mobileStyles.buttons }
    />,
  ];

  return (
    <Dialog
      open={ open } actions={ actions } onRequestClose={ closeDialog }
      id="brandDialog" actionsContainerStyle={ mobileStyles.buttonContainer }
      title={ brand } titleStyle={ mobileStyles.tile }
    >
      <Card>
        <TextField
          hintText="City" value={ city || '' } onChange={ onChangeCity }
          style={ mobileStyles.text } underlineShow={ false }
        />
      </Card>
    </Dialog>
  )
};

const mobileStyles = {
  tile: {
    fontSize: 50,
    lineHeight: 1,
    wordWrap: 'break-word'
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
    height: 75,
  },
  buttons: {
    height: 125,
  }
};

export default BrandDialog;