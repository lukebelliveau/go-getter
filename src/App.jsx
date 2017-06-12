import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import update from 'immutability-helper';

import { Snackbar } from 'material-ui';

import ResultsComponent from './Results';
import SearchBar from './SearchBar';
import BrandDialog from './BrandDialog'
import { searchForBrands, registerBrandInCity } from './api/apiHelper';

export const LOADING_RESULTS = 'loading_brand_results';

const waitToStopTyping = 800;
const toastDuration = 4000;

class App extends Component {
  constructor() {
    super();
    this.state = {
      brandInput: '',
      results: {},
      dialog: {
        show: false,
        brand: '',
        city: '',
      },
      toast: {
        open: false,
        message: '',
      },
      userTyping: false,
      updateTimeout: 0,
    };

    this.brandChanged = this.brandChanged.bind(this);
    this.brandClicked = this.brandClicked.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.confirmBrand = this.confirmBrand.bind(this);
    this.changeCity = this.changeCity.bind(this);
  }

  brandChanged(event) {
    if (this.state.updateTimeout) clearTimeout(this.state.updateTimeout);

    const brandInput = event.target.value;
    this.setState(() => ({
      brandInput,
      results: (brandInput === "") ? {} : LOADING_RESULTS,
      userTyping: false,
      updateTimeout: setTimeout(() => {
        this.updateResults(brandInput)
      }, waitToStopTyping)
    }));
  }

  updateResults(brandInput) {
    searchForBrands(brandInput)
      .then((brandResults) => {
        this.setState(() => ({
          results: brandResults,
        }));
      });
  }

  brandClicked(brand) {
    this.setState(() => ({
      dialog: {
        show: true,
        brand,
      },
    }))
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
      <MuiThemeProvider>
        <div>
          <SearchBar
            value={ this.state.brandInput } onChange={ this.brandChanged }
          />
          <ResultsComponent results={ this.state.results } onClick={ this.brandClicked }/>
          <BrandDialog brand={ this.state.dialog.brand } city={ this.state.dialog.city } onChangeCity={ this.changeCity } open={ this.state.dialog.show } submit={ this.confirmBrand } closeDialog={ this.closeDialog }/>
          <Toast { ...this.state.toast }/>
        </div>
      </MuiThemeProvider>
    );
  }
}

const Toast = ({ open, message }) => (
  <Snackbar
    open={ open }
    message={ message }
    autoHideDuration={ toastDuration }
  />
);

export default App;
