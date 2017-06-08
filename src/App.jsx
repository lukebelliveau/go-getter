import React, { Component } from 'react';
import { getBrandsByName } from './api/pinataAPIClient';

class App extends Component {
  constructor() {
    super();
    this.state = {
      brandInput: '',
      results: '',
    };

    this.brandChanged = this.brandChanged.bind(this);
  }

  brandChanged(event) {
    const brandInput = event.target.value;
    this.setState(() => ({
      brandInput,
      results: 'Loading...',
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
    <div>
      <label htmlFor="brandInput">Enter a brand: </label>
      <input
        id="brandInput" name="brandInput"
        value={ this.state.brandInput }
        onChange={ this.brandChanged }
      />
      <div name="results" >
        <h1>BRANDS</h1>
        <ResultsComponent results={ this.state.results }/>
      </div>
    </div>
    );
  }
};

const ResultsComponent = ({ results }) => {
  return results === 'Loading...' ?
  <p>{ results }</p> :
  <p id="searchResults">{ results }</p>
};

export default App;
