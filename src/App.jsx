import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ResultsComponent from './Results';
import { getBrandsByName } from './api/pinataAPIClient';

export const LOADING_RESULTS = 'loading_brand_results';

class App extends Component {
  constructor() {
    super();
    this.state = {
      brandInput: '',
      results: {},
    };

    this.brandChanged = this.brandChanged.bind(this);
  }

  brandChanged(event) {
    const brandInput = event.target.value;
    this.setState(() => ({
      brandInput,
      results: LOADING_RESULTS,
    }));

    getBrandsByName(brandInput)
      .then((brandResults) => {
        this.setState(() => ({
          results: brandResults,
        }));
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <label htmlFor="brandInput">Enter a brand: </label>
          <input
            id="brandInput" name="brandInput"
            value={ this.state.brandInput }
            onChange={ this.brandChanged }
          />
          <ResultsComponent results={ this.state.results } />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
