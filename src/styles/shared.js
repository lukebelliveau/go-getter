// @flow
import styled, { keyframes } from 'styled-components';

const mobileDeviceWidth = '480px';
const primaryColor = '#D50000';
const hoverColor = '#A80A00';

const CenterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`

const Input = styled.input`
  font-size: 40px;
  margin: 40px 25px;
  margin-bottom: 0px;
  width: 90%;
  display: block;
  border: none;
  padding: 10px 0;
  border-bottom: solid 1px ${primaryColor};
  -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 96%, ${primaryColor} 4%);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, ${primaryColor} 4%);
  background-position: -200px 0;
  background-size: 200px 100%;
  background-repeat: no-repeat;
  color: #0e6252;
  font-family: 'roboto', sans-serif;
  -webkit-transition: all 0.3s ease-in-out;
          transition: all 0.3s ease-in-out;
  &:focus{
    box-shadow: none;
    outline: none;
    font-size: 40px;
    @media (min-device-width: ${mobileDeviceWidth}) {
      background-position: 0 0;
      font-size: 20px;
    }
  }
  @media (min-device-width: ${mobileDeviceWidth}) {
    font-size: initial;
    width: 50%;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export default {
  CenterContainer,
  Input,
  fadeIn,
  mobileDeviceWidth,
  primaryColor,
  hoverColor,
};