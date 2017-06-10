import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Dialog, FlatButton, Card, CardHeader, TextField } from 'material-ui';
import update from 'immutability-helper';

import ResultsComponent from './Results';
import SearchBar from './SearchBar';
import { getBrandsByName, postBrandAndCity } from './api/pinataAPIClient';

export const LOADING_RESULTS = 'loading_brand_results';

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
    };

    this.brandChanged = this.brandChanged.bind(this);
    this.brandClicked = this.brandClicked.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.confirmBrand = this.confirmBrand.bind(this);
    this.changeCity = this.changeCity.bind(this);
  }

  brandChanged(event) {
    const brandInput = event.target.value;
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

    this.setState((prevState) => {
      return update(prevState, {
        dialog: { city: { $set: city } }
      })
    });
  }

  confirmBrand() {
    postBrandAndCity()
      .then(response => console.log(response));
    this.closeDialog();
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
        </div>
      </MuiThemeProvider>
    );
  }
}

const BrandDialog = ({ brand, city, onChangeCity, open, submit, closeDialog }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      onTouchTap={ closeDialog }
    />,
    <FlatButton
      label="Submit"
      primary={true}
      onTouchTap={ submit }
    />,
  ];

  return (
    <Dialog open={ open } actions={ actions } onRequestClose={ closeDialog } id="brandDialog">
      <Card>
        <CardHeader title={ brand } />
        <TextField floatingLabelText="City" value={ (city === undefined) ? '' : city } onChange={ onChangeCity } style={{ margin: 20 }}/>
      </Card>
    </Dialog>
  )
};

export default App;
