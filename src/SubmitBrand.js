import React, { Component } from 'react';
import update from 'immutability-helper';
import { Snackbar } from 'material-ui';
import BrandDialog from './BrandDialog';
import { registerBrandInCity } from './api/apiHelper'

const toastDuration = 4000;

class SubmitBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: {
        show: props.show,
        brand: props.brand,
        city: '',
      },
      toast: {
        open: false,
        message: '',
      },
    };

    this.closeDialog = this.closeDialog.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.confirmBrand = this.confirmBrand.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dialog: {
        show: nextProps.show,
        brand: nextProps.brand,
      }
    })
  }

  closeDialog() {
    this.setState(() => ({
      dialog: {
        show: false,
      }
    }))
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
    const { city, brand } = this.state.dialog;
    registerBrandInCity(brand, city)
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

  render() {
    return (
      <div>
        <BrandDialog
          brand={ this.state.dialog.brand } city={ this.state.dialog.city }
          onChangeCity={ this.changeCity } open={ this.state.dialog.show }
          submit={ this.confirmBrand } closeDialog={ this.closeDialog }/>
        <Toast { ...this.state.toast }/>
      </div>
    )
  }
}

const Toast = ({ open, message }) => (
  <Snackbar
    open={ open }
    message={ message }
    autoHideDuration={ toastDuration }
  />
);

export default SubmitBrand;