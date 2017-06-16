import React from 'react';
import { Snackbar } from 'material-ui';
import styled, { keyframes } from 'styled-components';
import ResponsiveContainer from './ResponsiveContainer';

//bad for maintainability -- need to figure out better place to hold messages
const messageColor = (message) => {
  const color = (message.indexOf('Congrats') >= 0) ? '#388E3C' : '#D50000';
  console.log(color);
  return color
};

const Toast = ({ open, message, toastDuration }) => {
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
    justifyContent: 'center',
  },
  content: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 1.2,
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const ToastMobile = styled.div`
  // visibility: ${props => props.open ? 'visible' : 'hidden'};
  animation: ${props => props.open ? fadeIn : fadeOut} 1s linear;
  color: #FFFFFF;
  background-color: ${props => messageColor(props.children)};
  text-align: center;
  padding: 16px;
  z-index: 1;
  font-family: sans-serif;
  position: fixed;
  
  font-size: 75px;
  margin-left: -10px;
  bottom: 0;
  margin-top: 100px;
`;

const ToastDesktop = styled.div`
    // visibility: ${props => props.open ? 'visible' : 'hidden'};
    // animation: ${props => props.open ? fadeIn : fadeOut} 1s linear;
    color: #FFFFFF;
    background-color: ${props => messageColor(props.children)};
    text-align: center;
    padding: 16px;
    z-index: 1;
    font-family: sans-serif;
    position: fixed;
    
    font-size: 17px;
    margin-left: -125px;
    bottom: 30px;
    min-width: 250px;
    border-radius: 2px;
    left: 50%;
`;

const ToastResponsive = styled.div`
    // visibility: ${props => props.open ? 'visible' : 'hidden'};
    // animation: ${props => props.open ? fadeIn : fadeOut} 1s linear;
    color: #FFFFFF;
    background-color: ${props => messageColor(props.children)};
    text-align: center;
    padding: 16px;
    z-index: 1;
    font-family: sans-serif;
    position: fixed;
    
    font-size: 75px;
    margin-left: -10px;
    bottom: 0;
    margin-top: 100px;
  
    @media (min-width: 768px) {
      font-size: 17px;
      margin-left: -125px;
      bottom: 30px;
      min-width: 250px;
      border-radius: 2px;
      left: 50%;
    }
`;

const ToastContainer = ({ open, message }) => (
  <Toast open={ open }>{ message }</Toast>
);

export default Toast;

