// @flow
import React from 'react';
import { Snackbar } from 'material-ui';
import ResponsiveContainer from './ResponsiveContainer';

//bad for maintainability -- need to figure out better place to hold messages
const messageColor = (message) => (message.indexOf('Congrats') >= 0) ? '#388E3C' : '#D50000';

const Toast = ({ open, message, toastDuration }: { open: boolean, message: string, toastDuration: number }) => {
  const mobile = mobileStyles(message);
  const desktop = desktopStyles(message);

  return ResponsiveContainer({
    mobileComponent: <Snackbar open={ open } message={ message }
                               autoHideDuration={ toastDuration } bodyStyle={ mobile.body }
                               style={ mobile.style } contentStyle={ mobile.content } />,
    desktopComponent: <Snackbar open={ open } message={ message }
                                autoHideDuration={ toastDuration }
                                bodyStyle={ desktop.body } style={ desktop.style } />
  })
};

const mobileStyles = (message) => ({
  body: {
    backgroundColor: messageColor(message),
    height: 200,
    maxWidth: 'none',
  },
  style: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 20,
  },
});

const desktopStyles = (message) => ({
  body: {
    backgroundColor: messageColor(message),
    maxWidth: 'none',
  },
  style: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
});

export default Toast;