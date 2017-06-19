// @flow
import React, { Component } from 'react';
import update from 'immutability-helper';
import Modal from './Modal';
import Toast from './Toast';
import apiHelper from './api/apiHelper'


const toastDuration = 4000;

type Props = {
  brand: string,
  show: boolean,
  closeDialog: () => void,
}

const initialState = {
  dialog: {
    city: '',
  },
  toast: {
    open: false,
    message: '',
  },
};
class SubmitBrand extends Component {
  state = initialState;
  closeParentDialog: () => void;
  closeDialog: () => void;
  confirmBrand: () => void;
  changeCity: (Event) => void;

  constructor(props: Props) {
    super(props);

    this.closeParentDialog = props.closeDialog;

    this.closeDialog = this.closeDialog.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.confirmBrand = this.confirmBrand.bind(this);
  }

  changeCity(event: Event & { target: HTMLInputElement }) {
    const city = event.target.value;

    this.setState((prevState) =>
      update(prevState, {
        dialog: { city: { $set: city } }
      })
    );
  }

  confirmBrand() {
    apiHelper.registerBrandInCity(this.props.brand, this.state.dialog.city)
      .then(message => {
        this.setState({
          toast: {
            open: true,
            message: message,
          }
        })
      });
    this.closeDialog();

    setTimeout(() => this.setState({
      toast: {
        open: false,
        message: '',
      }
    }), toastDuration)
  }

  closeDialog() {
    this.setState({
      dialog: {
        city: '',
      },
    });
    this.closeParentDialog()
  }

  render() {
    return (
      <div>
        <Modal id="modal"
          brand={ this.props.brand } city={ this.state.dialog.city }
          onChangeCity={ this.changeCity } show={ this.props.show }
          submit={ this.confirmBrand } closeDialog={ this.closeDialog }/>
        <Toast id="toast" show={ this.state.toast.open } message={ this.state.toast.message } />
      </div>
    )
  }
}

export default SubmitBrand;