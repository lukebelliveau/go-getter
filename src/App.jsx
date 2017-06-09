import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField } from 'material-ui';

import ResultsComponent from './Results';
import { getBrandsByName } from './api/pinataAPIClient';
import styles from './styles';

const { centerFlex } = styles;

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
          <SearchBar
            brand={{ value: this.state.brandInput, onChange: this.brandChanged }}
          />
          <ResultsComponent results={ this.state.results } />
        </div>
      </MuiThemeProvider>
    );
  }
}

const SearchBar = ({ brand }) => (
  <div style={ centerFlex }>
    <TextField
      id="brandInput" name="brandInput"
      value={ brand.value }
      onChange={ brand.onChange }
      floatingLabelText="Search by brand"
      floatingLabelStyle={{ color: '#9A9998' }}
      underlineFocusStyle={{ color: '#9A9998' }}
      floatingLabelFocusStyle={{ color: '#9A9998' }}
    />
  </div>
);

export default App;
