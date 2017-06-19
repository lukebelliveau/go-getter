import styled from 'styled-components';

import shared from './shared';

const { mobileDeviceWidth } = shared;

const HeaderContainer = styled.div`
  padding: 2px 20px;
  font-family: sans-serif;
  font-size: 40px;
  &:after {
    content:''; 
    width: 90%; 
    padding-left: 20px;
    height:1px; 
    background: lightgray; 
    position:absolute; 
  }
  @media (min-device-width: ${mobileDeviceWidth}) {
    font-size: initial;
  }
`;
const Header = ({ children }) => (
  <HeaderContainer>
    <h2 id="modal-header">{ children }</h2>
  </HeaderContainer>
);

export default {
  ...shared,
};