import styled from 'styled-components';

import shared from './shared';

const Selection = styled.div`
  background-color: ${shared.primaryColor};
  margin: 10px;
  height: 125px;
  width: 100%;
  font-size: 50px;
  color: #FFFFFF;
  font-family: Roboto, sans-serif;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover{
    background-color: ${shared.hoverColor};
    cursor: pointer;
  }
  
  @media (min-device-width: ${shared.mobileDeviceWidth}){
    height: 250px;
    width: 250px;
    font-size: 25px;
    line-height: initial;
  }
`

const CenteredText = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 50px;
  text-align: center;
  @media (min-device-width: ${shared.mobileDeviceWidth}){
    font-size: initial;
    text-align: initial;
  }
`

export default {
  ...shared,
  Selection,
  CenteredText,
};