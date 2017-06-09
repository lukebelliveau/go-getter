import React from 'react';
import { CircularProgress, RaisedButton } from 'material-ui';
import MediaQuery from 'react-responsive';

import { LOADING_RESULTS } from './App';
import styles from './styles';

const { centerFlex } = styles;

const ResultsContainer = ({ results, onClick }) => (
  <div name="results" style={ centerFlex }>
    {
      results === LOADING_RESULTS
        ? <CircularProgress />
        : <div id="searchResults">
        <MediaQuery minDeviceWidth={ mobileWidth }>
          <ResultList results={ results } onClick={ onClick } style={ desktopStyle }/>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={ mobileWidth }>
          <ResultList results={ results } onClick={ onClick } style={ mobileStyle }/>
        </MediaQuery>
      </div>
    }
  </div>
);

export const ResultList = ({ results, onClick, style }) => (
  <div style={ centerFlex }>
    {
      Object.keys(results).map(key => {
        return(
          <RaisedButton
            name={ results[key] } onClick={ () => onClick(results[key]) }
            backgroundColor={ style.backgroundColor } style={ style.button }
            key={ results[key] } >
              <div style={ style.brandName }>
                { results[key] }
              </div>
          </RaisedButton>
        )
      }

      )
    }
  </div>
);

const Result = ({ brandName, onClick, style }) => (
  <RaisedButton onClick={ () => onClick(brandName) } backgroundColor={ style.backgroundColor } style={ style.button }>
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
