// @flow
import React from 'react';
import styled from 'styled-components';

import styles from './styles';

const { primaryColor } = styles;

export default styled.div`
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: ${primaryColor};
  background: -moz-linear-gradient(left, ${primaryColor} 10%, rgba(213,0,0, 0) 42%);
  background: -webkit-linear-gradient(left, ${primaryColor} 10%, rgba(213,0,0, 0) 42%);
  background: -o-linear-gradient(left, ${primaryColor} 10%, rgba(213,0,0, 0) 42%);
  background: -ms-linear-gradient(left, ${primaryColor} 10%, rgba(213,0,0, 0) 42%);
  background: linear-gradient(to right, ${primaryColor} 10%, rgba(213,0,0, 0) 42%);
  position: fixed;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  &:before {
    width: 50%;
    height: 50%;
    background: ${primaryColor};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  &:after {
    background: #f5fffd;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;