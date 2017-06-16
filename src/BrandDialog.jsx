import React from 'react';
import { Dialog, RaisedButton, FlatButton, TextField } from 'material-ui';
import styled from 'styled-components';

import ResponsiveContainer from './ResponsiveContainer';

const BrandDialog = (props) => ResponsiveContainer({
  mobileComponent: <MobileBrandDialog { ...props } />,
  desktopComponent: <DesktopBrandDialog { ...props } />
});

// const DesktopBrandDialog = ({ brand, city, onChangeCity, open, submit, closeDialog }) => (
//   <Dialog open={ open } actions={ dialogButtons(FlatButton, submit, closeDialog, {}) } onRequestClose={ closeDialog } id="brandDialog" title={ brand }>
//       <TextField floatingLabelText="City" value={ city || '' } onChange={ onChangeCity } style={{ margin: 20 }}/>
//   </Dialog>
// );

const MobileBrandDialog = ({ brand, city, onChangeCity, open, submit, closeDialog }) => (
  <Dialog open={ open } actions={ dialogButtons(RaisedButton, submit, closeDialog, mobileStyles) }
    onRequestClose={ closeDialog } id="brandDialog" actionsContainerStyle={ mobileStyles.buttonContainer }
    title={ brand } titleStyle={ mobileStyles.title }>
      <TextField
        hintText="City" value={ city || '' } onChange={ onChangeCity }
        style={ mobileStyles.text } underlineShow={ false }
      />
  </Dialog>
);


const dialogButtons = (ButtonComponent, submit, close, style) => ([
  <ButtonComponent
    label="Cancel"
    onTouchTap={ close }
    style={ style.buttons }
    labelStyle={ style.label } />,
  <ButtonComponent
    label="Submit"
    primary={true}
    onTouchTap={ submit }
    style={ style.buttons }
    labelStyle={ style.label } />,
]);

const mobileStyles = {
  title: {
    fontSize: 50,
    lineHeight: 1,
  },
  buttonContainer:  {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  text: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 75,
    width: '100%',
    height: 80,
  },
  buttons: {
    height: 125,
  },
  label: {
    fontSize: 50
  }
};

const Overlay = styled.div`
  display: block;
  // display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

const Container = styled.div`
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 50%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
`;

const HeaderContainer = styled.div`
  padding: 2px 16px;
  font-family: sans-serif;
  border-bottom-color: lightslategrey;
  border-bottom-style: solid;
`;
const Header = () => (
  <HeaderContainer>
    <h2>Modal Header</h2>
  </HeaderContainer>
);

const BodyContainer = styled.div`
  padding: 20px 16px 0px 16px;
`;
const Input = styled.input`
  width: 50%;
  font-size: 20px;
  height: 40px;
  border-style: groove;
`;
const Body = () => (
  <BodyContainer>
    <Input />
  </BodyContainer>
);

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2px 16px;
  color: white;
`;
const Button = styled.div`
  margin: 5px;
  padding: 10px;
  color: ${props => props.color};
  font-family: Roboto, sans-serif;
`;

const Footer = () => (
  <FooterContainer>
    <Button color="gray">CANCEL</Button>
    <Button color="blue">SUBMIT</Button>
  </FooterContainer>
);

const ResponsiveDialog = () => (
  <Overlay>
    <Container>
      <Header/>
      <Body/>
      <Footer/>
    </Container>
  </Overlay>
);

export default BrandDialog;