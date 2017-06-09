import React from 'react';
import { CircularProgress, RaisedButton } from 'material-ui';
import MediaQuery from 'react-responsive';

import { LOADING_RESULTS } from './App';
import styles from './styles';

const { centerFlex } = styles;

const ResultsContainer = ({ results }) => (
  <div name="results" style={ centerFlex }>
    {
      results === LOADING_RESULTS
        ? <CircularProgress />
        : <div id="searchResults">
        <MediaQuery minDeviceWidth={ mobileWidth }>
          <ResultList results={ results } style={ desktopStyle }/>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={ mobileWidth }>
          <ResultList results={ results } style={ mobileStyle }/>
        </MediaQuery>
      </div>
    }
  </div>
);

const ResultList = ({ results, style }) => (
  <div style={ centerFlex }>
    {
      Object.keys(results).map(key =>
        <Result key={ results[key] } brandName={ results[key] } style={ style } />
      )
    }
  </div>
);

const Result = ({ brandName, style }) => (
  <RaisedButton backgroundColor={ style.backgroundColor } style={ style.button }>
    <div style={ style.brandName }>
      { brandName }
    </div>
  </RaisedButton>
);

const backgroundColor = '#FA9100';
const fontColor = '#FFFFFF';
const mobileStyle = {
  backgroundColor,
  button: {
    margin: 10,
    height: 125,
    width: '100%',
  },
  brandName: {
    fontSize: 50,
    color: fontColor,
  }
};

const desktopStyle = {
  backgroundColor,
  button: {
    margin: 10,
    height: 250,
    width: 250,
  },
  brandName: {
    color: fontColor,
  }
};

const mobileWidth = 480;

export default ResultsContainer;
