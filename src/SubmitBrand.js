// @flow
import React, { Component } from 'react';
import update from 'immutability-helper';
import BrandDialog from './BrandDialog';
import Toast from './Toast';
import { registerBrandInCity } from './api/apiHelper'

const toastDuration = 4000;

type Props = {
  show: boolean,
  brand: string,
  closeDialog: () => void,
};

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
  closeDialog: Function;
  changeCity: Function;
  confirmBrand: Function;

  constructor(props: Props) {
    super(props);

    this.props = props;
    this.closeParentDialog = props.closeDialog;

    this.closeDialog = this.closeDialog.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.confirmBrand = this.confirmBrand.bind(this);
  }

  changeCity(event: Event & { currentTarget: HTMLInputElement }) {
    const city = event.currentTarget.value;

    this.setState((prevState) =>
      update(prevState, {
        dialog: { city: { $set: city } }
      })
    );
  }

  confirmBrand() {
    registerBrandInCity(this.props.brand, this.state.dialog.city)
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
    }), toastDuration + 10)
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
        <BrandDialog
          brand={ this.props.brand } city={ this.state.dialog.city }
          onChangeCity={ this.changeCity } open={ this.props.show }
          submit={ this.confirmBrand } closeDialog={ this.closeDialog }/>
        <Toast open={ this.state.toast.open } message={ this.state.toast.message } toastDuration={ toastDuration }/>
      </div>
    )
  }
}

export default SubmitBrand;