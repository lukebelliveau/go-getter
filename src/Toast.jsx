// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

//bad for maintainability -- need to figure out better place to hold messages
const messageColor = (message) => (message.indexOf('Congrats') >= 0) ? '#388E3C' : '#D50000';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Content = styled.div`
    color: #FFFFFF;
    background-color: ${props => messageColor(props.children)};
    text-align: center;
    padding: 16px;
    font-family: sans-serif;
    
    font-size: 75px;
    margin-left: -10px;
    bottom: 0;
    margin-top: 100px;
    
    @media (min-device-width: 768px) {
      font-size: 17px;
      margin-bottom: 30px;
      min-width: 250px;
      border-radius: 2px;
    }
`;

const Container = styled.div`
  animation: ${fadeIn} 1s linear;
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 1;
`;

const Toast = ({ open, message }: { open: boolean, message: string }) => (
  open
    ? <Container>
        <Content open={ open }>{ message }</Content>
      </Container>
    : null
);

export default Toast;

