import styled from 'styled-components';

import shared from './shared';

const Content = styled.div`
    color: #FFFFFF;
    background-color: ${props => props.color};
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
  animation: ${shared.fadeIn} 0.2s linear;
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 1;
  pointer-events: none;
`;

export default {
  Container,
  Content,
}