// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  show: boolean,
  brand: string,
  city: string,
  closeDialog: () => void,
  submit: () => void,
  onChangeCity: () => void,
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
              <Footer/>
            </Container>
        </Overlay>
        : null
    )
  }
}

const primaryColor = '#D50000';
const mobileDeviceWidth = '480px';

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
  height: 500px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
  &:after {
    content:""; 
    background: black; 
    position: absolute; 
    bottom: 0; 
    left: 0; 
    height: 50%; 
    width: 1px;
  }
  @media (min-device-width: ${mobileDeviceWidth}) {
    width: 50%;
    height: 300px;
  }
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
    width: 200px;
  }
`;
const Body = ({ onChange, children }) => (
  <BodyContainer>
    <Input placeholder="City" onChange={ onChange } value={ children } />
  </BodyContainer>
);

const FooterContainer = styled.div`
  display: flex;
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
  margin: 5px;
  padding: 10px;
  color: ${props => props.color};
  font-family: Roboto, sans-serif;
  font-size: 50px;
  &:hover{
    background-color: #EEEEEE;
    cursor: pointer;
  }
  @media (min-device-width: ${mobileDeviceWidth}) {
    font-size: initial;
  }
`;
const Footer = () => (
  <FooterContainer>
    <Button color="gray" id="cancel">CANCEL</Button>
    <Button color={ primaryColor } id="submit">SUBMIT</Button>
  </FooterContainer>
);

export default Modal;