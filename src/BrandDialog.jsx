// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

import styles from './styles';

const { Input, mobileDeviceWidth, primaryColor } = styles;

type Props = {
  show: boolean,
  brand: string,
  city: string,
  closeDialog: () => void,
  submit: () => void,
  onChangeCity: (Event) => void,
}

class Modal extends React.Component {
  state: { show: boolean };
  constructor(props: Props) {
    super(props);

    this.props = props;

    this.state = {
      show: this.props.show
    };
  }

  click = (event: MouseEvent & { target: HTMLDivElement }) => {
    switch(event.target.id) {
      case 'overlay':
        this.props.closeDialog();
        break;
      case 'submit':
        this.props.submit();
        this.props.closeDialog();
        break;
      case 'cancel':
        this.props.closeDialog();
        break;
    }
  }

  render() {
    return (
      this.props.show
        ?
        <Overlay onClick={ this.click } id="overlay">
            <Container>
              <Header>{ this.props.brand }</Header>
              <Body onChange={ this.props.onChangeCity }>{ this.props.city }</Body>
              <Footer clickable={ this.props.city.length > 0 }/>
            </Container>
        </Overlay>
        : null
    )
  }
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  animation: ${fadeIn} 0.2s linear;
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 25%; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  @media (min-device-width: ${mobileDeviceWidth}) {
    padding-top: 100px;
  }
`;

const Container = styled.div`
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 80%;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  @media (min-device-width: ${mobileDeviceWidth}) {
    width: 50%;
  }
  animation-name: animatetop;
  animation-duration: 0.4s;
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
`;

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
    <h2>{ children }</h2>
  </HeaderContainer>
);

const BodyContainer = styled.div`
  padding: 20px 16px 0px 16px;
  height: 40%;
  @media (min-device-width: ${mobileDeviceWidth}) {
    height: initial;
  }
`;
const Body = ({ onChange, children }) => (
  <BodyContainer>
    <Input placeholder="City" onChange={ onChange } value={ children } />
  </BodyContainer>
);

const FooterContainer = styled.div`
  display: flex;
  display: -ms-flexbox;
  justify-content: flex-end;
  padding: 2px 16px;
  color: white;
  width: 90%;
  top: 0px;
  @media (min-device-width: ${mobileDeviceWidth}) {
    width: initial;
  }
`;
const Button = styled.div`
  margin: 50px 0px 5% 5px;
  padding: 10px;
  color: ${props => props.color};
  font-family: Roboto, sans-serif;
  font-size: 50px;
  &:hover{
    background-color: ${props => props.clickable ? '#EEEEEE' : 'initial'};
    cursor: ${props => props.clickable ? 'pointer' : 'default'};
  }
  @media (min-device-width: ${mobileDeviceWidth}) {
    font-size: initial;
  }
`;
const Footer = ({ clickable }) => (
  <FooterContainer>
    <Button color="gray" id="cancel" clickable={ true }>CANCEL</Button>
    <Button color={ clickable ? primaryColor : 'lightgray' } id={ clickable ? 'submit' : '' } clickable={ clickable }>SUBMIT</Button>
  </FooterContainer>
);

export default Modal;