import React, { Component } from 'react';
import update from 'immutability-helper';
import BrandDialog from './BrandDialog';
import Toast from './Toast';
import { registerBrandInCity } from './api/apiHelper'

const toastDuration = 4000;

class SubmitBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: {
        city: '',
      },
      toast: {
        open: false,
        message: '',
      },
    };

    this.show = props.show;
    this.closeParentDialog = props.closeDialog;
    this.brand = props.brand;

    this.closeDialog = this.closeDialog.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.confirmBrand = this.confirmBrand.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.show = nextProps.show;
    this.brand = nextProps.brand;
  }

  changeCity(event) {
    const city = event.target.value;

    this.setState((prevState) =>
      update(prevState, {
        dialog: { city: { $set: city } }
      })
    );
  }

  confirmBrand() {
    registerBrandInCity(this.brand, this.state.dialog.city)
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
        <BrandDialog
          brand={ this.brand } city={ this.state.dialog.city }
          onChangeCity={ this.changeCity } show={ this.show }
          submit={ this.confirmBrand } closeDialog={ this.closeDialog }/>
        <Toast open={ this.state.toast.open } message={ this.state.toast.message } toastDuration={ toastDuration }/>
      </div>
    )
  }
}

export default SubmitBrand;