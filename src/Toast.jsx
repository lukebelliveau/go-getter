// @flow
import React from 'react';

import styles from './styles/Toast.style';

const messageColor = (message) => (message.indexOf('Congrats') >= 0) ? '#388E3C' : '#A80A00';

const { Container, Content } = styles;

const Toast = ({ show, message }: { show: boolean, message: string }) => (
  show
    ? <Container id="toast">
        <Content color={ messageColor(message) }>{ message }</Content>
      </Container>
    : null
);

export default Toast;
