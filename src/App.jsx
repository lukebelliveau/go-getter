import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, Dialog, FlatButton } from 'material-ui';

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
      showBrandDialog: false,
    };

    this.brandChanged = this.brandChanged.bind(this);
    this.brandClicked = this.brandClicked.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.confirmBrand = this.confirmBrand.bind(this);
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

  brandClicked(brand) {
    this.setState(() => ({
      showBrandDialog: true,
    }))
  }

  closeDialog() {
    this.setState(() => ({
      showBrandDialog: false,
    }))
  }

  confirmBrand() {
    console.log('confirming brand!');
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <SearchBar
            brand={{ value: this.state.brandInput, onChange: this.brandChanged }}
          />
          <ResultsComponent results={ this.state.results } onClick={ this.brandClicked }/>
          <BrandDialog open={ this.state.showBrandDialog } submit={ this.confirmBrand } closeDialog={ this.closeDialog }/>
        </div>
      </MuiThemeProvider>
    );
  }
}

const BrandDialog = ({ open, submit, closeDialog }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={ closeDialog }
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={ submit }
    />,
  ];

  return (
    <Dialog open={ open } actions={ actions } onRequestClose={ closeDialog } id="brandDialog" />
  )
};

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
