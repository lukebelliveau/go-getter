// @flow
import React from 'react';

import styles from './styles/Modal.style';

const {
  Overlay,
  Dialog,
  Input,
  HeaderContainer,
  BodyContainer,
  primaryColor,
  FooterContainer,
  Button,
} = styles;

type Props = {
  show: boolean,
  brand: string,
  city: string,
  closeDialog: () => void,
  submit: () => void,
  onChangeCity: (Event) => void,
}

export const ids = {
  modal: 'overlay',
  submit: 'submit',
  cancel: 'cancel',
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
      case ids.modal:
        this.props.closeDialog();
        break;
      case ids.submit:
        this.props.submit();
        this.props.closeDialog();
        break;
      case ids.cancel:
        this.props.closeDialog();
        break;
    }
  }

  render() {
    return (
      this.props.show
        ? <Overlay onClick={ this.click } id={ ids.modal }>
              <Dialog>
                <Header>{ this.props.brand }</Header>
                <Body id="modal-body" onChange={ this.props.onChangeCity }>{ this.props.city }</Body>
                <Footer clickable={ this.props.city.length > 0 }/>
              </Dialog>
          </Overlay>
        : null
    )
  }
}

const Header = ({ children }) => (
  <HeaderContainer>
    <h2 id="modal-header">{ children }</h2>
  </HeaderContainer>
);

const Body = ({ onChange, children }) => (
  <BodyContainer>
    <Input id="input-city" placeholder="City" onChange={ onChange } value={ children } />
  </BodyContainer>
);

const Footer = ({ clickable }) => (
  <FooterContainer>
    <Button color="gray" id={ ids.cancel } clickable={ true }>CANCEL</Button>
    <Button color={ clickable ? primaryColor : 'lightgray' } id={ clickable ? ids.submit : '' } clickable={ clickable }>SUBMIT</Button>
  </FooterContainer>
);

export default Modal;