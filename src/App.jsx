import React, { Component } from 'react';

import ResultsComponent from './Results';
import SearchBar from './SearchBar';
import SubmitBrand from './SubmitBrand';
import { searchForBrands } from './api/apiHelper';

export const LOADING_RESULTS = 'loading_brand_results';

const waitToStopTyping = 800;

const initialState = {
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

class App extends Component {
  constructor() {
    super();
    this.state = initialState;

    this.changeBrandEntry = this.changeBrandEntry.bind(this);
    this.brandSelected = this.brandSelected.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  changeBrandEntry(event) {
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

  brandSelected(brand) {
    this.setState(() => ({
      dialog: {
        show: true,
        brand,
      },
    }))
    ;
  }

  closeDialog() {
    this.setState(() => ({
      dialog: {
        show: false,
      }
    }))
  }

  render() {
    return (
      <div>
        <SearchBar value={ this.state.brandInput } onChange={ this.changeBrandEntry } />
        <ResultsComponent results={ this.state.results } onClick={ this.brandSelected }/>
        <SubmitBrand show={ this.state.dialog.show } brand={ this.state.dialog.brand } closeDialog={ this.closeDialog }/>
      </div>
    );
  }
}

export default App;
