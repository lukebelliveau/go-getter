import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

    this.brandChanged = this.brandChanged.bind(this);
    this.brandClicked = this.brandClicked.bind(this);
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
    ;
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <SearchBar value={ this.state.brandInput } onChange={ this.brandChanged } />
          <ResultsComponent results={ this.state.results } onClick={ this.brandClicked }/>
          <SubmitBrand show={ this.state.dialog.show } brand={ this.state.dialog.brand } />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
