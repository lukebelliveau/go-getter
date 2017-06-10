import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Dialog, FlatButton } from 'material-ui';

import ResultsComponent from './Results';
import SearchBar from './SearchBar';
import { getBrandsByName } from './api/pinataAPIClient';

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
    if (brandInput === "") return;
    this.setState(() => ({
      brandInput,
      results: (brandInput === "") ? {} : LOADING_RESULTS,
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
            value={ this.state.brandInput } onChange={ this.brandChanged }
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

export default App;
